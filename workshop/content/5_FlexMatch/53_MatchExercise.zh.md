---
title: "动手：在你的 fleet 上匹配"
weight: 53
---

## 1. 把匹配指向 EC2 fleet

后端 Lambda 通过环境变量选择匹配配置。从 Anywhere 切到 EC2 并重新部署
（一条命令）：

```bash
cd infra
npx cdk deploy PixelRushBackendStack -c matchmakingConfig=PixelRushMatchEc2 -c stage=ec2 --require-approval never
```

约 2 分钟（只改 Lambda 配置）。

{{% notice note %}}
Anywhere 服务器的终端现在可以停掉了（Ctrl-C）——比赛不会再放到那里。
{{% /notice %}}

## 2. 开赛——顺便观察机器运转

2P 比赛需要第二名玩家：同事用他自己部署的站点是不行的（不同账号！）——
请开**第二个浏览器标签页**换个车手名，或与邻座结对、**两人都用你的站点 URL**。

1. 两名玩家：**RACE → 同一条赛道 → 2P**
2. 转圈等待时打开控制台：
   **GameLift → Matchmaking → PixelRushMatchEc22**——在 **Matchmaking
   activity** 下能看到票据计数跳动
3. 几秒内两个浏览器同时进入倒计时——这次会话放置在**你的 EC2 fleet** 上

## 3. 回溯完整链路

控制台 → **GameLift → Fleets → PixelRushFleet → Game sessions**：你的会话
在列，状态 `ACTIVE`，挂着两个 player session。点进去——能看到浏览器实际连接
的 IP:端口，以及每个 PlayerSessionId。

## 检查点 ★

游戏会话出现在 **PixelRushFleet**（而非 Anywhere fleet）上，浏览器里完成了
比赛。模块 1 那张图里的每一格现在都亮了：

```
Build ✓ → Fleet ✓ → Queue ✓ → FlexMatch ✓ → Game Session ✓ → Players ✓
```
