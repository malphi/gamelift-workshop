---
title: "Hands-on: Build & Deploy"
weight: 41
---

## 1. Cross-compile the server for the fleet

Fleet instances run Amazon Linux 2023 on x86_64. Go cross-compiles in one command:

```bash
./scripts/build-server-linux.sh
```

The script produces `server/dist/linux/` containing:

- `pixelrush-server` — the Linux binary (statically linked, ~8 MB)
- `install.sh` — runs once per instance at deploy time (permissions, log dir)

## 2. Deploy the fleet

```bash
cd infra
npx cdk deploy PixelRushGameLiftStack -c stage=ec2 --require-approval never
```

The `-c stage=ec2` flag extends the stack you already have with three resources:

| Resource | What happens |
|---|---|
| **Build** | `server/dist/linux/` is zipped, uploaded to S3, registered with GameLift |
| **Fleet** | GameLift provisions a c5.large, downloads the build, runs `install.sh`, launches your server processes |
| **Queue** | `PixelRushQueue` — the placement target FlexMatch will use |

:::alert{type=info}
This takes **~15 minutes** (instance provisioning + build install + process
health checks). Don't wait idle — move to the next page and read how the fleet
is configured. Come back when the deploy command returns.
:::
