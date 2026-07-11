---
title: "Deploy the Game Backend"
weight: 24
---

## What you're deploying

Two CDK stacks — the *web* half of the game, no GameLift yet:

- **PixelRushBackendStack** — API Gateway + Lambda + DynamoDB (login, garage,
  shop, leaderboard, matchmaking API) and a WebSocket API for notifications
- **PixelRushFrontendStack** — the Phaser web client on CloudFront + private S3

## 1. Deploy

From the `infra/` directory:

```bash
npx cdk deploy PixelRushBackendStack PixelRushFrontendStack --require-approval never
```

Takes ~6 minutes. Note two outputs at the end:

```
PixelRushBackendStack.ApiUrl      = https://xxxx.execute-api.us-east-1.amazonaws.com
PixelRushBackendStack.WsNotifyUrl = wss://yyyy.execute-api.us-east-1.amazonaws.com/prod
PixelRushFrontendStack.SiteUrl    = https://zzzz.cloudfront.net
```

:::alert{type=success}
Save **ApiUrl** somewhere — you'll paste it into the game in Module 6 to prove
your deployment works end to end.
:::

## 2. Wire the frontend config

Write the WebSocket URL into the frontend config, rebuild, and redeploy the site:

```bash
echo "{ \"wsNotifyUrl\": \"<PASTE-WsNotifyUrl-HERE>\" }" > ../frontend/public/config.json
(cd ../frontend && npm run build)
npx cdk deploy PixelRushFrontendStack --require-approval never
```

## 3. Checkpoint ★

Open **SiteUrl** in your browser:

1. Enter any racer name + the workshop password `gamelift` → **START ENGINE**
2. You land in the lobby with a random starter persona (level, coins, a car)
3. Browse **GARAGE** and **SHOP** — buy a car if you have the coins!

:::alert{type=info}
Try clicking **RACE → a track → 2P**: matchmaking will spin forever. That's
expected — there is no game server anywhere yet. Fixing that is the rest of
this workshop.
:::
