---
title: "Hands-on: Match on Your Fleet"
weight: 53
---

## 1. Point matchmaking at the EC2 fleet

The backend Lambda picks the matchmaking configuration via an environment
variable. Switch it from Anywhere to EC2 and redeploy (one command):

```bash
cd infra
npx cdk deploy PixelRushBackendStack -c matchmakingConfig=PixelRushMatchEc2 -c stage=ec2 --require-approval never
```

~2 minutes (only the Lambda configuration changes).

:::alert{type=info}
Your Anywhere server terminal can be stopped now (Ctrl-C) — matches will no
longer be placed there.
:::

## 2. Race — and watch the machinery

You'll need a second player for a 2P match: a colleague on their own deployment
won't work (different account!) — use **a second browser tab** with a different
racer name, or pair up with your neighbor **both using your site URL**.

1. Both players: **RACE → same track → 2P**
2. While the spinner runs, open the console:
   **GameLift → Matchmaking → PixelRushMatchEc22** — you can see ticket counts
   tick up under **Matchmaking activity**
3. Within seconds both browsers jump into the countdown — the session was
   placed on **your EC2 fleet** this time

## 3. Trace the completed flow

Console → **GameLift → Fleets → PixelRushFleet → Game sessions**: your session
is there, `ACTIVE`, with two player sessions attached. Click into it — you can
see the exact IP:port your browsers connected to and each PlayerSessionId.

## Checkpoint ★

A game session appears on **PixelRushFleet** (not the Anywhere fleet) and your
race completed in the browser. Every box from the Module 1 diagram is now live:

```
Build ✓ → Fleet ✓ → Queue ✓ → FlexMatch ✓ → Game Session ✓ → Players ✓
```
