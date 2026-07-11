import type { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { json, withOriginVerify } from './lib/db.js';

/**
 * GET /api/info — arena self-description. The unified workshop frontend
 * points at any deployment (official or a student's own stack) with just
 * the API URL; everything else is discovered here.
 */
export const handler = withOriginVerify(async (_event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> => {
  return json(200, {
    game: 'pixelrush',
    arena: process.env.ARENA_NAME ?? 'custom-arena',
    wsNotifyUrl: process.env.WS_NOTIFY_URL ?? '',
    version: 1,
  });
});
