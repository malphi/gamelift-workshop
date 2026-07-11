import { GameLiftClient, StartMatchmakingCommand, DescribeMatchmakingCommand } from '@aws-sdk/client-gamelift';
import { GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { ddb, MAIN_TABLE, json, bad, withOriginVerify } from './lib/db.js';
import { broadcastChat } from './lib/broadcast.js';

const gamelift = new GameLiftClient({});

/**
 * POST /api/matchmaking/request {playerId, trackId}
 *   -> StartMatchmaking with level + trackId player attributes; returns ticketId.
 * GET  /api/matchmaking/status?ticketId=
 *   -> polling fallback / debugging aid (the primary path is the WS push).
 */
export const handler = withOriginVerify(async (event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  if (event.requestContext.http.method === 'GET') return status(event);

  const { playerId, trackId, matchSize, latencies } = JSON.parse(event.body ?? '{}');
  if (!playerId || !trackId) return bad('playerId and trackId required');
  // 1 = Quick Start (instant match, NPC-filled grid); 2/4/8 = multiplayer.
  const size = [1, 2, 3, 4].includes(matchSize) ? matchSize : 1;
  // client-measured region latencies {region: ms} — the queue uses these to
  // place the game session in the best location for all matched players
  const latencyInMs: Record<string, number> = {};
  if (latencies && typeof latencies === 'object') {
    for (const [region, ms] of Object.entries(latencies)) {
      if (/^[a-z]{2}-[a-z]+-\d$/.test(region) && Number.isFinite(ms as number)) {
        latencyInMs[region] = Math.min(9999, Math.max(1, Math.round(ms as number)));
      }
    }
  }

  const player = await ddb.send(new GetCommand({
    TableName: MAIN_TABLE, Key: { pk: `PLAYER#${playerId}`, sk: 'PROFILE' },
  }));
  if (!player.Item) return bad('player not found', 404);

  // Server-side unlock check: N unlocked iff no prereq or prereq completed.
  const track = await ddb.send(new GetCommand({
    TableName: MAIN_TABLE, Key: { pk: 'CATALOG#TRACKS', sk: `TRACK#${trackId}` },
  }));
  if (!track.Item) return bad('unknown track', 404);
  const completed: string[] = player.Item.completedTracks ?? [];
  if (track.Item.requiresTrackId && !completed.includes(track.Item.requiresTrackId)) {
    return bad('track locked', 403);
  }

  // MATCHMAKING_CONFIG_PREFIX is e.g. "PixelRushMatchAnywhere" or
  // "PixelRushMatchEc2"; the match size picks the concrete config.
  const res = await gamelift.send(new StartMatchmakingCommand({
    ConfigurationName: `${process.env.MATCHMAKING_CONFIG_PREFIX!}${size}`,
    Players: [{
      PlayerId: playerId,
      PlayerAttributes: {
        level: { N: player.Item.level },
        trackId: { S: trackId },
      },
      ...(Object.keys(latencyInMs).length > 0 ? { LatencyInMs: latencyInMs } : {}),
    }],
  }));
  const ticketId = res.MatchmakingTicket!.TicketId!;

  // debug trace to the world channel: who asked for what, with latencies
  const latStr = Object.keys(latencyInMs).length
    ? Object.entries(latencyInMs).map(([r, ms]) => `${r.replace(/^(..)-([a-z])[a-z]*-(\d)$/, '$1$2$3')}:${ms}ms`).join(' ')
    : 'no latency data';
  await broadcastChat({
    type: 'chat', kind: 'debug',
    text: `FlexMatch ⇢ ${player.Item.name} 申请 ${size === 1 ? 'QuickStart' : size + 'P'} @${trackId}｜规则: 同赛道+等级差≤3｜延迟 ${latStr}`,
    at: Date.now(),
  }).catch(() => { /* best-effort */ });

  await ddb.send(new PutCommand({
    TableName: MAIN_TABLE,
    Item: {
      pk: `TICKET#${ticketId}`, sk: 'STATUS',
      playerId, trackId, status: 'SEARCHING',
      ttl: Math.floor(Date.now() / 1000) + 3600,
    },
  }));
  return json(200, { ticketId });
});

async function status(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  const ticketId = event.queryStringParameters?.ticketId;
  if (!ticketId) return bad('ticketId required');
  // Prefer the event-updated item; fall back to DescribeMatchmaking.
  const item = await ddb.send(new GetCommand({
    TableName: MAIN_TABLE, Key: { pk: `TICKET#${ticketId}`, sk: 'STATUS' },
  }));
  if (item.Item?.status === 'MatchmakingSucceeded' || item.Item?.connection) {
    return json(200, { status: item.Item.status, connection: item.Item.connection ?? null });
  }
  const res = await gamelift.send(new DescribeMatchmakingCommand({ TicketIds: [ticketId] }));
  const t = res.TicketList?.[0];
  return json(200, { status: t?.Status ?? 'UNKNOWN', connection: null });
}
