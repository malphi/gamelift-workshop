---
title: "部署游戏后端"
weight: 24
---

## 你要部署什么

两个 CDK stack——游戏的 *Web* 半边，暂不涉及 GameLift：

- **PixelRushBackendStack** — API Gateway + Lambda + DynamoDB（登录、车库、商店、
  排行榜、匹配 API）以及用于通知的 WebSocket API
- **PixelRushFrontendStack** — CloudFront + 私有 S3 上的 Phaser 网页客户端

## 1. 部署

在 `infra/` 目录下：

```bash
npx cdk deploy PixelRushBackendStack PixelRushFrontendStack --require-approval never
```

约 6 分钟。记下结尾的输出：

```
PixelRushBackendStack.ApiUrl      = https://xxxx.execute-api.us-east-1.amazonaws.com
PixelRushBackendStack.WsNotifyUrl = wss://yyyy.execute-api.us-east-1.amazonaws.com/prod
PixelRushFrontendStack.SiteUrl    = https://zzzz.cloudfront.net
```

:::alert{type=success}
把 **ApiUrl** 保存好——模块 6 中你会把它粘贴进游戏，验证自己部署的全链路。
:::

## 2. 写入前端配置

把 WebSocket 地址写入前端配置，重新构建并发布站点：

```bash
echo "{ \"wsNotifyUrl\": \"<粘贴-WsNotifyUrl>\" }" > ../frontend/public/config.json
(cd ../frontend && npm run build)
npx cdk deploy PixelRushFrontendStack --require-approval never
```

## 3. 检查点 ★

在浏览器打开 **SiteUrl**：

1. 输入任意车手名 + workshop 密码 `gamelift` → **START ENGINE**
2. 进入大厅，获得随机初始角色（等级、金币、一辆车）
3. 逛逛**车库**和**商店**——金币够的话买辆车！

:::alert{type=info}
试试点 **RACE → 任选赛道 → 2P**：匹配会永远转圈。这是预期的——现在还没有任何
游戏服务器存在。接下来的整个 workshop 就是解决这件事。
:::
