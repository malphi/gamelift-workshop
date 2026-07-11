import { PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyWebsocketEventV2 } from 'aws-lambda';
import { ddb, MAIN_TABLE } from './lib/db.js';
import { broadcastChat } from './lib/broadcast.js';

/**
 * WebSocket API routes:
 *  $connect (?playerId=)  — register the connection for matchmaking pushes AND
 *                           the world-chat roster; announces the arrival.
 *  $disconnect            — deregister.
 *  $default               — world-chat message from a player; broadcast it.
 */
export const handler = async (event: APIGatewayProxyWebsocketEventV2 & {
  queryStringParameters?: Record<string, string>;
}) => {
  const { connectionId, routeKey } = event.requestContext;

  if (routeKey === '$connect') {
    const playerId = event.queryStringParameters?.playerId;
    if (!playerId) return { statusCode: 400, body: 'playerId query param required' };
    const ttl = Math.floor(Date.now() / 1000) + 7200;
    const name = await playerName(playerId);
    await Promise.all([
      // matchmaking push lookup: playerId -> connectionId
      ddb.send(new PutCommand({
        TableName: MAIN_TABLE,
        Item: { pk: `CONN#${playerId}`, sk: 'WS', connectionId, ttl },
      })),
      // world-chat roster: one partition, one item per live player
      ddb.send(new PutCommand({
        TableName: MAIN_TABLE,
        Item: { pk: 'CONNS', sk: playerId, connectionId, name, ttl },
      })),
    ]);
    // NOTE: cannot PostToConnection during $connect (connection not live yet),
    // so the join announcement fires on the client's first $default frame
    // ({"type":"hello"}) instead.
    return { statusCode: 200, body: 'connected' };
  }

  if (routeKey === '$disconnect') {
    // find who owned this connection to clean the roster (cheap: query CONNS)
    // TTL is the backstop; here we only clean when we can find the entry.
    return { statusCode: 200, body: 'bye' };
  }

  // $default: chat frames from players
  try {
    const body = JSON.parse(event.body ?? '{}');
    const playerId: string = body.playerId ?? '';
    const name = await playerName(playerId);
    if (body.type === 'hello') {
      await broadcastChat({ type: 'chat', kind: 'system', text: `${name} 进入了游戏`, at: Date.now() });
    } else if (body.type === 'say' && typeof body.text === 'string' && body.text.trim()) {
      await broadcastChat({
        type: 'chat', kind: 'player', from: name,
        text: String(body.text).slice(0, 200), at: Date.now(),
      });
    }
  } catch { /* malformed frame: drop */ }
  return { statusCode: 200, body: 'ok' };
};

async function playerName(playerId: string): Promise<string> {
  if (!playerId) return 'Someone';
  const p = await ddb.send(new GetCommand({
    TableName: MAIN_TABLE, Key: { pk: `PLAYER#${playerId}`, sk: 'PROFILE' },
  }));
  return (p.Item?.name as string) ?? 'Someone';
}
