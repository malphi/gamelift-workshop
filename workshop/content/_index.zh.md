---
title: "Amazon GameLift 实战"
chapter: true
weight: 1
---

# Amazon GameLift 实战
### 部署你的第一个多人在线游戏

<br>

欢迎！在大约 **2 小时**内，你将在 AWS 上部署并运营一个完整的多人在线游戏——
复古像素风赛车游戏 **Pixel Rush**——并借助它学习 **Amazon GameLift Servers**
的核心能力：

- 什么是专用**游戏服务器**，实时多人游戏为什么需要它
- 每个托管游戏都要实现的 GameLift **Server SDK 生命周期**
- **GameLift Anywhere**——把自己的机器注册为 fleet 算力，快速迭代
- **托管 EC2 fleet**——生产级托管：build、运行时配置、会话队列
- **FlexMatch**——基于规则的匹配、票据与事件通知

最后，你会和其他学员在共享竞技场同场对战——而匹配、会话放置、实时状态同步的
每一环，都跑在**你亲手部署**的基础设施上。

```
浏览器 (Phaser 3 网页客户端)
 ├── REST ──► API Gateway + Lambda + DynamoDB     登录 / 车库 / 排行榜
 ├── WebSocket ──► API Gateway WebSocket API      匹配结果通知
 └── WebSocket ──► GameLift 上的 Go 游戏服务器     实时对战 @ 20Hz

FlexMatch ──► SNS ──► Lambda ──► 推送给等待中的玩家
```

{{% notice info %}}
游戏代码（Go 服务器、TypeScript 后端、Phaser 前端）已备好、开箱即部署——
你会**带读关键代码，但全程无需修改任何代码**。每一步要么是可复制粘贴的命令，
要么是 AWS 控制台上的观察。
{{% /notice %}}

## 日程

| 模块 | 时长 |
|---|---|
| 1. 引言——为什么需要游戏服务器、GameLift 概念 | 10 分钟 |
| 2. 环境准备——部署游戏后端 | 20 分钟 |
| 3. GameLift Anywhere——你的机器变成 fleet | 25 分钟 |
| 4. 托管 Fleet——EC2 上的生产托管 | 25 分钟 |
| 5. FlexMatch——基于规则的匹配 | 20 分钟 |
| 6. 决赛日——验证自己的服务器，然后全员对战 | 15 分钟 |
| 7. 资源清理 | 5 分钟 |
| 8. 总结与进阶 | 5 分钟 |
| 附录：多区域 fleet（可选挑战） | 20 分钟 |

{{% notice warning %}}
本 workshop 的示例代码是教学内容，并非生产级软件。它演示 GameLift 集成模式，
并做了刻意简化（无玩家身份系统、共享的 workshop 密码、宽松的 IAM 权限）。
{{% /notice %}}
