---
title: "Why Game Servers"
weight: 11
---

## Why can't we just use an API?

A typical web backend is **stateless request/response**: the client asks, Lambda
answers, nobody remembers anything between calls. That model powers most of Pixel
Rush — login, the car shop, leaderboards are all API Gateway + Lambda + DynamoDB.

A **race in progress** is different in three fundamental ways:

| Requirement | Web API model | Game server model |
|---|---|---|
| State | stateless per request | 8 cars' positions, items, collisions held **in memory** |
| Cadence | client-initiated | server-driven **tick loop** (20 updates/sec, every ~50 ms) |
| Authority | validation per call | one process is the **referee** — it simulates physics and decides who wins, so nobody can cheat |

So a multiplayer game session needs a **long-lived, stateful, authoritative process**
that all players connect to simultaneously. That process is the *dedicated game server*.

## The operational problem

Running one game server process is easy. Running a game is not:

- A game session lives minutes, then the process should be recycled — **who starts
  and stops thousands of processes?**
- Players arrive in waves — **who scales the machines?**
- Players are worldwide — **who places each match on the right machine, in the right
  region?**
- Matchmaking needs to find opponents *and* reserve server capacity **atomically**.

This orchestration layer is exactly what **Amazon GameLift Servers** provides. You
bring the game server binary; GameLift runs the machinery around it.

{{% notice tip %}}
Analogy: GameLift is to game servers what a container orchestrator is to
containers — but purpose-built for the session-based, latency-sensitive,
bursty lifecycle of multiplayer games.
{{% /notice %}}
