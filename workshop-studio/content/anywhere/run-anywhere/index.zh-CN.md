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

## 2. 把你的机器注册为 fleet 算力

一个脚本完成全部注册流程：

```bash
cd ..
./scripts/run-anywhere.sh
```

观察输出——每一行都对应前面讲过的概念：

```
fleet: fleet-xxxx  compute: your-host-dev  ip: 50.x.x.x  port: 1935
                         └─ RegisterCompute：这台机器加入 fleet
starting server (auth token valid ~15 min)...
InitSDK (Anywhere): fleet=fleet-xxxx host=your-host-dev
Connected to GameLift API Gateway.        ◄─ 主动连出到 GameLift 的 WebSocket
ProcessReady on port 1935; waiting for game sessions
                         └─ 空闲且健康——等待被选中
```

让这个终端保持运行。

:::alert{type=info}
AWS 活动路径：脚本会通过预设的 `COMPUTE_IP` 环境变量自动使用开发机的公网 IP 注册。
:::

## 3. 检查点 ★

打开 AWS 控制台 → **Amazon GameLift Servers → Fleets →
PixelRushAnywhereFleet → Computes** 页签：

- 你的机器以 compute 名称在列，状态 **Active**
- 显示它的 IP 和 GameLift SDK endpoint

你已经把自己的硬件注册成了 GameLift fleet 算力：GameLift 现在知道这台机器
存在、健康（`ProcessReady` + 心跳），可以向它派发游戏会话。

:::alert{type=info}
**为什么停在注册这一步。** GameLift 编排在 Anywhere 上是真的能工作的——你甚至
可以亲眼看到：用两个浏览器标签发起 **2P** 比赛，服务器终端会打印
`OnStartGameSession` → `game session active`。但 Anywhere 机器没有受信任的 TLS
证书，浏览器拒绝对不受信任的主机建立安全的 `wss://` 连接，所以玩家其实无法真正
完成加入。这是**刻意的设计**：Anywhere 用于**快速本地迭代、验证 SDK 集成**，而非
生产对战。真正的多人比赛在模块 4——托管 fleet + GameLift 签发的证书。
:::

:::alert{type=warning}
auth token 空闲约 15 分钟后过期。如果后面服务器退出了，重新运行
`./scripts/run-anywhere.sh` 即可。
:::
