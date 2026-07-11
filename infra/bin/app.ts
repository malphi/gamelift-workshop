#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { BackendStack } from '../lib/backend-stack';
import { FrontendStack } from '../lib/frontend-stack';
import { GameLiftStack } from '../lib/gamelift-stack';

const app = new cdk.App();

// Shared secrets. Override with -c resultsSecret=... -c originVerifySecret=...
// Static defaults keep the workshop simple; both are workshop-scoped, not prod-grade.
const resultsSecret = app.node.tryGetContext('resultsSecret') ?? 'pixelrush-workshop-secret';
const originVerifySecret = app.node.tryGetContext('originVerifySecret') ?? 'pixelrush-origin-verify';

const backend = new BackendStack(app, 'PixelRushBackendStack', {
  resultsSecret,
  originVerifySecret,
  description: 'Pixel Rush workshop: player data, shop, leaderboard, matchmaking APIs',
});

new FrontendStack(app, 'PixelRushFrontendStack', {
  apiEndpoint: backend.httpApi.apiEndpoint,
  originVerifySecret,
  description: 'Pixel Rush workshop: CloudFront (sole public entry) + private S3 + API proxy',
});

new GameLiftStack(app, 'PixelRushGameLiftStack', {
  flexMatchTopic: backend.flexMatchTopic,
  deployEc2Fleet: app.node.tryGetContext('stage') === 'ec2',
  apiEndpoint: backend.httpApi.apiEndpoint,
  resultsSecret,
  description: 'Pixel Rush workshop: GameLift fleets, queues, FlexMatch',
});
