---
title: "Hands-on Amazon GameLift"
chapter: true
weight: 1
---

# Hands-on Amazon GameLift
### Deploy Your First Multiplayer Game

<br>

Welcome! In roughly **2 hours** you will deploy and operate a complete multiplayer
online game on AWS — a retro pixel-art racing game called **Pixel Rush** — and use it
to learn the core capabilities of **Amazon GameLift Servers**:

- What a dedicated **game server** is and why real-time multiplayer needs one
- The GameLift **Server SDK lifecycle** that every hosted game implements
- **GameLift Anywhere** — register your own machine as fleet compute for fast iteration
- **Managed EC2 fleets** — production hosting with builds, runtime configs and queues
- **FlexMatch** — rule-based matchmaking, tickets and event notifications

At the end you will race against other participants on a shared arena, with every
piece of the pipeline — matchmaking, session placement, realtime state — running on
infrastructure **you deployed yourself**.

```
Browser (Phaser 3 web client)
 ├── REST ──► API Gateway + Lambda + DynamoDB     login / garage / leaderboard
 ├── WebSocket ──► API Gateway WebSocket API      match notifications
 └── WebSocket ──► Go game server on GameLift     realtime racing @ 20Hz

FlexMatch ──► SNS ──► Lambda ──► push to waiting players
```

{{% notice info %}}
The game code (Go server, TypeScript backend, Phaser frontend) is provided and ready
to deploy — **you will read key parts of it, but you never need to modify code**.
Every step is a copy-paste command or an AWS console observation.
{{% /notice %}}

## Agenda

| Module | Duration |
|---|---|
| 1. Introduction — why game servers, GameLift concepts | 10 min |
| 2. Setup — environment + deploy the game backend | 20 min |
| 3. GameLift Anywhere — your machine becomes a fleet | 25 min |
| 4. Managed Fleet — production hosting on EC2 | 25 min |
| 5. FlexMatch — rule-based matchmaking | 20 min |
| 6. Race Day — verify your server, then race everyone | 15 min |
| 7. Cleanup | 5 min |
| 8. Conclusion & next steps | 5 min |
| Appendix. Multi-region fleets (optional challenge) | 20 min |

{{% notice warning %}}
The sample code in this workshop is instructional content, not production-ready
software. It demonstrates GameLift integration patterns with deliberate
simplifications (no player identity system, shared workshop passwords, permissive IAM).
{{% /notice %}}
