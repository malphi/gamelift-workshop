---
title: "Hands-on: Run It"
weight: 33
---

## 1. Deploy the GameLift stack

This creates the Anywhere fleet + custom location + FlexMatch configurations
(no EC2 — it's fast):

```bash
cd infra
npx cdk deploy PixelRushGameLiftStack --require-approval never
```

~2 minutes. Output includes `AnywhereFleetId` and `AnywhereMatchmakingConfig`.

## 2. Start your machine as fleet compute

One script does the whole registration dance:

```bash
cd ..
./scripts/run-anywhere.sh
```

Watch the output — each line maps to a concept from the previous pages:

```
fleet: fleet-xxxx  compute: your-host-dev  ip: 127.0.0.1  port: 1935
                         └─ RegisterCompute: this machine joins the fleet
starting server (auth token valid ~15 min)...
                         └─ GetComputeAuthToken: short-lived InitSDK credential
InitSDK (Anywhere): fleet=fleet-xxxx host=your-host-dev
Connected to GameLift API Gateway.        ◄─ outbound WebSocket to GameLift
ProcessReady on port 1935; waiting for game sessions
                         └─ idle & healthy — waiting to be chosen
```

Leave this terminal running.

{{% notice note %}}
AWS-event path: the script auto-detects the dev machine's public IP via the
`COMPUTE_IP` environment variable (pre-set on the machine), so your browser
can reach it.
{{% /notice %}}

## 3. Race on your own hardware

1. Open your game site (SiteUrl) and log in
2. **RACE** → pick *Sunny Boulevard* → **⚡ QUICK START**... wait, that runs
   locally in the browser! For a *server* race pick **2P** instead and open a
   second browser tab (different racer name) that also picks 2P
3. FlexMatch pairs the two tickets → the queue places the session **on your
   machine** → both tabs connect and the countdown starts

Meanwhile your server terminal shows the lifecycle happening live:

```
OnStartGameSession: arn:aws:gamelift:...:gamesession/...
game session active: track=track-1 expected players=2
player Alice (…) joined slot 0 [1/2 expected]
player Bob (…) joined slot 1 [2/2 expected]
race started with 2 players
```

## 4. Checkpoint ★

Open the AWS console → **Amazon GameLift Servers → Fleets → PixelRushAnywhereFleet**:

- **Computes** tab: your machine is listed, status *Active*
- **Game sessions** tab: one session, status *Active*, with 2 player sessions

You just hosted a GameLift-orchestrated multiplayer match on your own computer.

{{% notice warning %}}
The auth token expires after ~15 minutes of idling. If the server exits later in
the workshop, just re-run `./scripts/run-anywhere.sh`.
{{% /notice %}}
