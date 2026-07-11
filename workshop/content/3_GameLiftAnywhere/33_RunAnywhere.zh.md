---
title: "动手：跑起来"
weight: 33
---

## 1. 部署 GameLift stack

创建 Anywhere fleet + 自定义 location + FlexMatch 匹配配置（不含 EC2，很快）：

```bash
cd infra
npx cdk deploy PixelRushGameLiftStack --require-approval never
```

约 2 分钟。输出包含 `AnywhereFleetId` 和 `AnywhereMatchmakingConfig`。

## 2. 把你的机器启动为 fleet 算力

一个脚本完成全部注册流程：

```bash
cd ..
./scripts/run-anywhere.sh
```

观察输出——每一行都对应前面讲过的概念：

```
fleet: fleet-xxxx  compute: your-host-dev  ip: 127.0.0.1  port: 1935
                         └─ RegisterCompute：这台机器加入 fleet
starting server (auth token valid ~15 min)...
                         └─ GetComputeAuthToken：InitSDK 用的短时效凭证
InitSDK (Anywhere): fleet=fleet-xxxx host=your-host-dev
Connected to GameLift API Gateway.        ◄─ 主动连出到 GameLift 的 WebSocket
ProcessReady on port 1935; waiting for game sessions
                         └─ 空闲且健康——等待被选中
```

让这个终端保持运行。

{{% notice note %}}
AWS 活动路径：脚本会通过预设的 `COMPUTE_IP` 环境变量自动使用开发机的公网 IP
注册，确保你的浏览器能连到它。
{{% /notice %}}

## 3. 在自己的硬件上比赛

1. 打开你的游戏站点（SiteUrl）并登录
2. **RACE** → 选 *Sunny Boulevard* → 注意 **⚡ QUICK START** 是纯浏览器本地
   模拟！要跑*服务器*比赛请选 **2P**，并再开一个浏览器标签页
   （换个车手名）同样发起 2P
3. FlexMatch 撮合两张票据 → Queue 把会话放到**你的机器**上 →
   两个标签页连入，倒计时开始

与此同时，服务器终端实时展示生命周期：

```
OnStartGameSession: arn:aws:gamelift:...:gamesession/...
game session active: track=track-1 expected players=2
player Alice (…) joined slot 0 [1/2 expected]
player Bob (…) joined slot 1 [2/2 expected]
race started with 2 players
```

## 4. 检查点 ★

打开 AWS 控制台 → **Amazon GameLift Servers → Fleets → PixelRushAnywhereFleet**：

- **Computes** 页签：你的机器在列，状态 *Active*
- **Game sessions** 页签：一条会话，状态 *Active*，含 2 个 player session

你刚刚在自己的电脑上托管了一场由 GameLift 编排的多人比赛。

{{% notice warning %}}
auth token 空闲约 15 分钟后过期。如果 workshop 后面服务器退出了，
重新运行 `./scripts/run-anywhere.sh` 即可。
{{% /notice %}}
