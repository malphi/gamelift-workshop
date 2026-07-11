---
title: "Verify the Fleet"
weight: 43
---

## Read the fleet's own story

Console → **Amazon GameLift Servers → Fleets → PixelRushFleet** → **Events** tab.
You can replay the whole activation as a timeline:

```
FLEET_CREATED
FLEET_STATE_DOWNLOADING          ← pulling your build from S3
FLEET_CREATION_RUNNING_INSTALLER ← install.sh executed
FLEET_STATE_VALIDATING
FLEET_CREATION_VALIDATING_RUNTIME_CONFIG
FLEET_STATE_BUILDING
FLEET_STATE_ACTIVATING           ← processes launched, health checks passing
FLEET_STATE_ACTIVE               ← ready to host
```

{{% notice tip %}}
This Events tab is your first stop whenever a fleet misbehaves — a crashing
server binary shows up here as `SERVER_PROCESS_CRASHED` or
`SERVER_PROCESS_SDK_INITIALIZATION_TIMEOUT` with a per-event explanation.
{{% /notice %}}

## Explore the other tabs

- **Compute**: one c5.large instance, its public IP and location
- **Metrics**: available/active game sessions, healthy processes — the numbers
  autoscaling policies act on
- **Game sessions**: empty right now. Matchmaking still points at your Anywhere
  fleet — switching it over is the next module.

## Checkpoint ★

Fleet status shows **ACTIVE** and the Compute tab lists one active instance.
