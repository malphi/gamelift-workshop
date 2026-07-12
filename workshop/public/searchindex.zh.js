var relearn_searchindex = [
  {
    "breadcrumb": "",
    "content": "部署你的第一个多人在线游戏 欢迎！在大约 2 小时内，你将在 AWS 上部署并运营一个完整的多人在线游戏—— 复古像素风赛车游戏 Pixel Rush——并借助它学习 Amazon GameLift Servers 的核心能力：\n什么是专用游戏服务器，实时多人游戏为什么需要它 每个托管游戏都要实现的 GameLift Server SDK 生命周期 GameLift Anywhere——把自己的机器注册为 fleet 算力，快速迭代 托管 EC2 fleet——生产级托管：build、运行时配置、会话队列 FlexMatch——基于规则的匹配、票据与事件通知 最后，你会和其他学员在共享竞技场同场对战——而匹配、会话放置、实时状态同步的 每一环，都跑在你亲手部署的基础设施上。\n┌─────────────────┐ │ API Gateway + │ ┌─ REST ──► Lambda + │ Login / Garage / │ │ DynamoDB │ Leaderboard │ └─────────────────┘ │ │ ┌─────────────────┐ ┌─────────┴───┐ │ API Gateway │ │ Browser │ │ WebSocket API │ Match Result │ (Phaser 3) ├─ WS ┼─────────────────┤ Notifications │ │ │ │Lambda │ │Web Client │ └──────┼──────────┘ │ │ ▲ └─────────┬───┘ │ │ ┌──────┼──────────┐ │ │ │ │ └─ WS ────► GameLift Go Server Real-time Combat │ │ @ 20Hz └─────────────────┘ ┌────────────┐ ┌───────┐ ┌──────────┐ │ FlexMatch │ ───► │ SNS │ ───► │ Lambda │ ───► Push to waiting players └────────────┘ └───────┘ └──────────┘ 信息 游戏代码（Go 服务器、TypeScript 后端、Phaser 前端）已备好、开箱即部署—— 你会带读关键代码，但全程无需修改任何代码。每一步要么是可复制粘贴的命令， 要么是 AWS 控制台上的观察。\n日程 模块 时长 1. 引言——为什么需要游戏服务器、GameLift 概念 10 分钟 2. 环境准备——部署游戏后端 20 分钟 3. GameLift Anywhere——你的机器变成 fleet 25 分钟 4. 托管 Fleet——EC2 上的生产托管 25 分钟 5. FlexMatch——基于规则的匹配 20 分钟 6. 决赛日——验证自己的服务器，然后全员对战 15 分钟 7. 资源清理 5 分钟 8. 总结与进阶 5 分钟 附录：多区域 fleet（可选挑战） 20 分钟 警告 本 workshop 的示例代码是教学内容，并非生产级软件。它演示 GameLift 集成模式， 并做了刻意简化（无玩家身份系统、共享的 workshop 密码、宽松的 IAM 权限）。",
    "description": "部署你的第一个多人在线游戏 欢迎！在大约 2 小时内，你将在 AWS 上部署并运营一个完整的多人在线游戏—— 复古像素风赛车游戏 Pixel Rush——并借助它学习 Amazon GameLift Servers 的核心能力：\n什么是专用游戏服务器，实时多人游戏为什么需要它 每个托管游戏都要实现的 GameLift Server SDK 生命周期 GameLift Anywhere——把自己的机器注册为 fleet 算力，快速迭代 托管 EC2 fleet——生产级托管：build、运行时配置、会话队列 FlexMatch——基于规则的匹配、票据与事件通知 最后，你会和其他学员在共享竞技场同场对战——而匹配、会话放置、实时状态同步的 每一环，都跑在你亲手部署的基础设施上。\n┌─────────────────┐ │ API Gateway + │ ┌─ REST ──► Lambda + │ Login / Garage / │ │ DynamoDB │ Leaderboard │ └─────────────────┘ │ │ ┌─────────────────┐ ┌─────────┴───┐ │ API Gateway │ │ Browser │ │ WebSocket API │ Match Result │ (Phaser 3) ├─ WS ┼─────────────────┤ Notifications │ │ │ │Lambda │ │Web Client │ └──────┼──────────┘ │ │ ▲ └─────────┬───┘ │ │ ┌──────┼──────────┐ │ │ │ │ └─ WS ────► GameLift Go Server Real-time Combat │ │ @ 20Hz └─────────────────┘ ┌────────────┐ ┌───────┐ ┌──────────┐ │ FlexMatch │ ───► │ SNS │ ───► │ Lambda │ ───► Push to waiting players └────────────┘ └───────┘ └──────────┘ 信息 游戏代码（Go 服务器、TypeScript 后端、Phaser 前端）已备好、开箱即部署—— 你会带读关键代码，但全程无需修改任何代码。每一步要么是可复制粘贴的命令， 要么是 AWS 控制台上的观察。",
    "tags": [],
    "title": "Amazon GameLift 实战",
    "uri": "/zh/index.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战",
    "content": "时长：约 10 分钟（纯阅读）\n在动手之前，先建立心智模型：多人游戏为什么需要专用服务器， 以及 GameLift 的每个组件分别解决什么问题。",
    "description": "时长：约 10 分钟（纯阅读）\n在动手之前，先建立心智模型：多人游戏为什么需要专用服务器， 以及 GameLift 的每个组件分别解决什么问题。",
    "tags": [],
    "title": "1. 引言",
    "uri": "/zh/1_introduction/index.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 1. 引言",
    "content": "为什么不能只用 API？ 典型的 Web 后端是无状态的请求/响应：客户端问、Lambda 答，两次调用之间什么都 不记得。Pixel Rush 的大部分功能正是这样实现的——登录、商店、排行榜都是 API Gateway + Lambda + DynamoDB。\n但进行中的一场比赛有三个本质区别：\n需求 Web API 模型 游戏服务器模型 状态 每次请求无状态 8 辆车的位置/道具/碰撞全部保存在内存里 节奏 客户端发起 服务器驱动的 tick 循环（每秒 20 次，约 50ms 一拍） 权威 逐调用校验 一个进程担任裁判——它模拟物理、判定胜负，任何人都无法作弊 所以一局多人游戏需要一个长驻、有状态、有权威的进程，所有玩家同时连着它。 这个进程就是专用游戏服务器（dedicated game server）。\n运维难题 跑一个游戏服务器进程很容易，运营一款游戏则不然：\n一局游戏只存活几分钟，之后进程应被回收——谁来启停成千上万个进程？ 玩家潮汐式涌入——谁来伸缩机器？ 玩家遍布全球——谁决定每一局放在哪台机器、哪个区域？ 匹配系统要找到对手，并且要原子性地同时预留服务器容量。 这套编排层正是 Amazon GameLift Servers 提供的。你带上游戏服务器二进制， GameLift 负责它周围的一切机器。\n提示 类比：GameLift 之于游戏服务器，就像容器编排器之于容器——但它是为多人游戏 “按局生灭、延迟敏感、潮汐突发\"的生命周期专门设计的。",
    "description": "为什么不能只用 API？ 典型的 Web 后端是无状态的请求/响应：客户端问、Lambda 答，两次调用之间什么都 不记得。Pixel Rush 的大部分功能正是这样实现的——登录、商店、排行榜都是 API Gateway + Lambda + DynamoDB。\n但进行中的一场比赛有三个本质区别：\n需求 Web API 模型 游戏服务器模型 状态 每次请求无状态 8 辆车的位置/道具/碰撞全部保存在内存里 节奏 客户端发起 服务器驱动的 tick 循环（每秒 20 次，约 50ms 一拍） 权威 逐调用校验 一个进程担任裁判——它模拟物理、判定胜负，任何人都无法作弊 所以一局多人游戏需要一个长驻、有状态、有权威的进程，所有玩家同时连着它。 这个进程就是专用游戏服务器（dedicated game server）。\n运维难题 跑一个游戏服务器进程很容易，运营一款游戏则不然：\n一局游戏只存活几分钟，之后进程应被回收——谁来启停成千上万个进程？ 玩家潮汐式涌入——谁来伸缩机器？ 玩家遍布全球——谁决定每一局放在哪台机器、哪个区域？ 匹配系统要找到对手，并且要原子性地同时预留服务器容量。 这套编排层正是 Amazon GameLift Servers 提供的。你带上游戏服务器二进制， GameLift 负责它周围的一切机器。",
    "tags": [],
    "title": "为什么需要游戏服务器",
    "uri": "/zh/1_introduction/11_whygamelift.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 1. 引言",
    "content": "组件全景图 今天要部署的一切都在这一张图上。请记住它——workshop 的每个模块会点亮其中一块。\n组件 一句话 在哪个模块动手 Build 你上传的服务器二进制 + 安装脚本 模块 4 Fleet（托管 EC2） AWS 托管的实例，运行你的服务器进程 模块 4 Fleet（Anywhere） 你自己的硬件注册为 fleet 算力 模块 3 Game Session 某个服务器进程上正在运行的一局比赛 模块 3–6 Game Session Queue 决定每一局新会话放到哪个 fleet/位置 模块 4 FlexMatch 按规则把玩家分组，然后请 Queue 开局 模块 5 Server SDK 生命周期 要让 GameLift 管理你的服务器进程，进程必须实现 Server SDK 协议。 四个回调就是全部：\n进程启动 │ ▼ InitSDK() “GameLift 你好，我存在了” （连接到服务） │ ▼ ProcessReady(port) “我健康，可以在这个端口开局” │ ▼ ……等待，可能长达数小时…… │ OnStartGameSession “一局比赛放到你身上了——激活！” │ └── 服务器调用 ActivateGameSession() ▼ 玩家连入 ──► AcceptPlayerSession(id) 逐个校验连入的玩家 │ ▼ ……比赛进行中…… │ ProcessEnding() “这局结束了，回收我” └── 进程退出；GameLift 拉起新进程 模块 3 中你会在 Go 代码里看到这些调用的原样实现——同一契约适用于任何引擎 （Unreal、Unity、自研 C++/C#/Go）。\n信息 关键认知：GameLift 从不\"启动一个游戏\"——它启动的是你的进程，并通过这些回调 与之通信。游戏逻辑（赛车、物理、道具）100% 是你的；生命周期 100% 是 GameLift 的。",
    "description": "组件全景图 今天要部署的一切都在这一张图上。请记住它——workshop 的每个模块会点亮其中一块。\n组件 一句话 在哪个模块动手 Build 你上传的服务器二进制 + 安装脚本 模块 4 Fleet（托管 EC2） AWS 托管的实例，运行你的服务器进程 模块 4 Fleet（Anywhere） 你自己的硬件注册为 fleet 算力 模块 3 Game Session 某个服务器进程上正在运行的一局比赛 模块 3–6 Game Session Queue 决定每一局新会话放到哪个 fleet/位置 模块 4 FlexMatch 按规则把玩家分组，然后请 Queue 开局 模块 5 Server SDK 生命周期 要让 GameLift 管理你的服务器进程，进程必须实现 Server SDK 协议。 四个回调就是全部：",
    "tags": [],
    "title": "GameLift 核心概念",
    "uri": "/zh/1_introduction/12_coreconcepts.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战",
    "content": "时长：约 20 分钟\n两条路径——按你的参与方式选择：\nAWS 主办活动 → 提供临时账号和浏览器 IDE（2.1） 自己的账号 → 在本机安装少量工具（2.2） 之后所有人统一：克隆仓库、初始化 CDK、部署游戏后端。",
    "description": "时长：约 20 分钟\n两条路径——按你的参与方式选择：\nAWS 主办活动 → 提供临时账号和浏览器 IDE（2.1） 自己的账号 → 在本机安装少量工具（2.2） 之后所有人统一：克隆仓库、初始化 CDK、部署游戏后端。",
    "tags": [],
    "title": "2. 环境准备",
    "uri": "/zh/2_setup/index.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 2. 环境准备",
    "content": "信息 仅当你在 AWS 主办活动现场、持有 Workshop Studio 接入码时走本页。 否则请跳到路径 B：自己的账号。\n1. 加入活动 打开 Workshop Studio，输入讲师提供的 接入码（access code）。 接受条款，点击 Join event。你获得一个临时 AWS 账号——今天的所有操作 都不产生个人费用。 2. 打开开发环境 活动账号预置了一台云上开发机（浏览器里的 VS Code），所有工具已装好：\n在活动页面找到 Event Outputs 区域。 打开 CodeServerURL 链接，输入 CodeServerPassword。 浏览器中的 VS Code 已把 workshop 仓库克隆在 ~/gamelift-workshop。 在其中打开终端（菜单 → Terminal → New Terminal）并验证：\nnode --version \u0026\u0026 go version \u0026\u0026 cdk --version \u0026\u0026 aws sts get-caller-identity 四条命令应分别输出版本号 / 你的临时账号 ID。\n提示 在本路径中，模块 3（GameLift Anywhere）里的\"你的机器\"指的就是这台云上开发机—— 其安全组已放行游戏端口，你的浏览器可以直连跑在它上面的游戏会话。\n继续前往 2.3 初始化（跳过路径 B）。",
    "description": "信息 仅当你在 AWS 主办活动现场、持有 Workshop Studio 接入码时走本页。 否则请跳到路径 B：自己的账号。\n1. 加入活动 打开 Workshop Studio，输入讲师提供的 接入码（access code）。 接受条款，点击 Join event。你获得一个临时 AWS 账号——今天的所有操作 都不产生个人费用。 2. 打开开发环境 活动账号预置了一台云上开发机（浏览器里的 VS Code），所有工具已装好：\n在活动页面找到 Event Outputs 区域。 打开 CodeServerURL 链接，输入 CodeServerPassword。 浏览器中的 VS Code 已把 workshop 仓库克隆在 ~/gamelift-workshop。 在其中打开终端（菜单 → Terminal → New Terminal）并验证：",
    "tags": [],
    "title": "路径 A：AWS 主办活动",
    "uri": "/zh/2_setup/21_awsevent.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 2. 环境准备",
    "content": "警告 费用估算：今天部署的资源在运行期间约 $0.20/小时（一台 c5.large GameLift 实例 + Serverless 组件）。清理模块会删除全部资源；完整跑完 2 小时通常花费不到 $1。\n1. AWS 账号与凭证 需要一个具备管理员级权限的账号（CDK 要创建 IAM 角色、GameLift fleet、 CloudFront 分发）。在本机配置凭证：\naws configure # 或 aws sso login / 环境变量 aws sts get-caller-identity # 验证——应输出你的账号 ID 选择一个支持 GameLift 的区域；本 workshop 以 us-east-1 为准。\n2. 安装工具 工具 版本 验证 Node.js 20+ node --version Go 1.22+ go version AWS CLI v2 aws --version AWS CDK v2 npx cdk --version（无需安装——npx 自动获取） macOS 一条命令（Homebrew）：brew install node go awscli Windows：从各工具官网安装，或使用 WSL2。\n提示 在本路径中，模块 3（GameLift Anywhere）里的\"你的机器\"就是你的笔记本—— Mac 和 Windows 都可以。游戏服务器在本机运行，浏览器连接 127.0.0.1， 不需要任何防火墙改动。\n继续前往 2.3 初始化。",
    "description": "警告 费用估算：今天部署的资源在运行期间约 $0.20/小时（一台 c5.large GameLift 实例 + Serverless 组件）。清理模块会删除全部资源；完整跑完 2 小时通常花费不到 $1。\n1. AWS 账号与凭证 需要一个具备管理员级权限的账号（CDK 要创建 IAM 角色、GameLift fleet、 CloudFront 分发）。在本机配置凭证：\naws configure # 或 aws sso login / 环境变量 aws sts get-caller-identity # 验证——应输出你的账号 ID 选择一个支持 GameLift 的区域；本 workshop 以 us-east-1 为准。\n2. 安装工具 工具 版本 验证 Node.js 20+ node --version Go 1.22+ go version AWS CLI v2 aws --version AWS CDK v2 npx cdk --version（无需安装——npx 自动获取） macOS 一条命令（Homebrew）：brew install node go awscli Windows：从各工具官网安装，或使用 WSL2。",
    "tags": [],
    "title": "路径 B：自己的账号",
    "uri": "/zh/2_setup/22_ownaccount.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 2. 环境准备",
    "content": "1. 克隆仓库 （AWS 活动路径：仓库已克隆在 ~/gamelift-workshop——直接 cd 进去即可。）\ngit clone https://github.com/malphi/gamelift-workshop.git cd gamelift-workshop 2. 安装依赖 (cd infra \u0026\u0026 npm install) (cd backend \u0026\u0026 npm install) (cd frontend \u0026\u0026 npm install) 3. 初始化 CDK CDK 需要对每个账号/区域做一次性 bootstrap（创建部署所需的 S3 桶和角色）：\ncd infra npx cdk bootstrap 预期输出结尾为：\n✅ Environment aws://123456789012/us-east-1 bootstrapped. 注释 这个账号/区域以前 bootstrap 过？命令是幂等的——输出 (no changes) 后直接结束。",
    "description": "1. 克隆仓库 （AWS 活动路径：仓库已克隆在 ~/gamelift-workshop——直接 cd 进去即可。）\ngit clone https://github.com/malphi/gamelift-workshop.git cd gamelift-workshop 2. 安装依赖 (cd infra \u0026\u0026 npm install) (cd backend \u0026\u0026 npm install) (cd frontend \u0026\u0026 npm install) 3. 初始化 CDK CDK 需要对每个账号/区域做一次性 bootstrap（创建部署所需的 S3 桶和角色）：",
    "tags": [],
    "title": "克隆与初始化",
    "uri": "/zh/2_setup/23_bootstrap.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 2. 环境准备",
    "content": "你要部署什么 两个 CDK stack——游戏的 Web 半边，暂不涉及 GameLift：\nPixelRushBackendStack — API Gateway + Lambda + DynamoDB（登录、车库、商店、 排行榜、匹配 API）以及用于通知的 WebSocket API PixelRushFrontendStack — CloudFront + 私有 S3 上的 Phaser 网页客户端 1. 部署 在 infra/ 目录下：\nnpx cdk deploy PixelRushBackendStack PixelRushFrontendStack --require-approval never 约 6 分钟。记下结尾的输出：\nPixelRushBackendStack.ApiUrl = https://xxxx.execute-api.us-east-1.amazonaws.com PixelRushBackendStack.WsNotifyUrl = wss://yyyy.execute-api.us-east-1.amazonaws.com/prod PixelRushFrontendStack.SiteUrl = https://zzzz.cloudfront.net 提示 把 ApiUrl 保存好——模块 6 中你会把它粘贴进游戏，验证自己部署的全链路。\n2. 写入前端配置 把 WebSocket 地址写入前端配置，重新构建并发布站点：\necho \"{ \\\"wsNotifyUrl\\\": \\\"\u003c粘贴-WsNotifyUrl\u003e\\\" }\" \u003e ../frontend/public/config.json (cd ../frontend \u0026\u0026 npm run build) npx cdk deploy PixelRushFrontendStack --require-approval never 3. 检查点 ★ 在浏览器打开 SiteUrl：\n输入任意车手名 + workshop 密码 gamelift → START ENGINE 进入大厅，获得随机初始角色（等级、金币、一辆车） 逛逛车库和商店——金币够的话买辆车！ 信息 试试点 RACE → 任选赛道 → 2P：匹配会永远转圈。这是预期的——现在还没有任何 游戏服务器存在。接下来的整个 workshop 就是解决这件事。",
    "description": "你要部署什么 两个 CDK stack——游戏的 Web 半边，暂不涉及 GameLift：\nPixelRushBackendStack — API Gateway + Lambda + DynamoDB（登录、车库、商店、 排行榜、匹配 API）以及用于通知的 WebSocket API PixelRushFrontendStack — CloudFront + 私有 S3 上的 Phaser 网页客户端 1. 部署 在 infra/ 目录下：\nnpx cdk deploy PixelRushBackendStack PixelRushFrontendStack --require-approval never 约 6 分钟。记下结尾的输出：\nPixelRushBackendStack.ApiUrl = https://xxxx.execute-api.us-east-1.amazonaws.com PixelRushBackendStack.WsNotifyUrl = wss://yyyy.execute-api.us-east-1.amazonaws.com/prod PixelRushFrontendStack.SiteUrl = https://zzzz.cloudfront.net 提示 把 ApiUrl 保存好——模块 6 中你会把它粘贴进游戏，验证自己部署的全链路。",
    "tags": [],
    "title": "部署游戏后端",
    "uri": "/zh/2_setup/24_deploygame.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战",
    "content": "时长：约 25 分钟\n你的第一局游戏会话——托管在你自己的机器上，由 GameLift 编排。 先理解 Anywhere 概念，带读 Server SDK 代码，然后跑起来。",
    "description": "时长：约 25 分钟\n你的第一局游戏会话——托管在你自己的机器上，由 GameLift 编排。 先理解 Anywhere 概念，带读 Server SDK 代码，然后跑起来。",
    "tags": [],
    "title": "3. GameLift Anywhere",
    "uri": "/zh/3_gameliftanywhere/index.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 3. GameLift Anywhere",
    "content": "自带算力 GameLift fleet 通常指 AWS 托管的 EC2 实例。GameLift Anywhere 反转了这一点： 你提供机器（笔记本、本地服务器、任意虚拟机），把它们注册为 fleet 的 compute，GameLift 提供其余一切——会话放置、匹配集成、玩家会话校验。\n托管 fleet: GameLift 拥有机器 + 编排 Anywhere fleet: 你拥有机器，GameLift 负责编排 为什么重要 场景 Anywhere 的价值 开发迭代 改服务器代码 → 重启本地进程 → 秒级验证。无需上传 build，无需等 15 分钟 fleet 激活。（今天我们就这么干。） 混合托管 保留现有本地/裸金属算力，同时用 GameLift 统一做匹配和放置。 特殊硬件 在 GameLift 不提供的机型上托管。 注册握手 三个 API 调用把一台机器变成 fleet 算力：\nCreateLocation — 自定义位置标签（如 custom-pixelrush-dev）， 我们的 CDK stack 已建好 RegisterCompute — “这个 IP 是 fleet 里的一台 compute” GetComputeAuthToken — 短时效（约 15 分钟）凭证，服务器进程调用 InitSDK 时使用 此后，这个进程的行为与托管 fleet 上的进程完全一致：同样的 ProcessReady、 同样的 OnStartGameSession、一切相同。这种对称性正是意义所在——今天在 Anywhere 上验证过的代码，模块 4 中原封不动地部署到托管 EC2。\n提示 今天\"你的机器\"是哪台？自己账号路径：你的笔记本（游戏客户端连 127.0.0.1）。AWS 活动路径：你的云上开发机（安全组已放行游戏端口）。",
    "description": "自带算力 GameLift fleet 通常指 AWS 托管的 EC2 实例。GameLift Anywhere 反转了这一点： 你提供机器（笔记本、本地服务器、任意虚拟机），把它们注册为 fleet 的 compute，GameLift 提供其余一切——会话放置、匹配集成、玩家会话校验。\n托管 fleet: GameLift 拥有机器 + 编排 Anywhere fleet: 你拥有机器，GameLift 负责编排 为什么重要 场景 Anywhere 的价值 开发迭代 改服务器代码 → 重启本地进程 → 秒级验证。无需上传 build，无需等 15 分钟 fleet 激活。（今天我们就这么干。） 混合托管 保留现有本地/裸金属算力，同时用 GameLift 统一做匹配和放置。 特殊硬件 在 GameLift 不提供的机型上托管。 注册握手 三个 API 调用把一台机器变成 fleet 算力：",
    "tags": [],
    "title": "什么是 Anywhere？",
    "uri": "/zh/3_gameliftanywhere/31_concept.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 3. GameLift Anywhere",
    "content": "只读——打开文件对照阅读，不需要修改。\n在编辑器中打开 server/gamelift/manager.go。这一个文件包含了我们 Go 游戏服务器的全部 GameLift 集成。对照模块 1 的生命周期图，逐一看真实代码。\n1. InitSDK——自我介绍 // Anywhere fleet 显式传连接参数； // 托管 EC2 上同一调用会从环境变量读取。 params = server.ServerParameters{ WebSocketURL: m.Anywhere.WebSocketURL, FleetID: m.Anywhere.FleetID, HostID: m.Anywhere.HostID, // = 你注册的 compute 名 AuthToken: m.Anywhere.AuthToken, // = GetComputeAuthToken 的结果 ProcessID: pid, } server.InitSDK(params) 信息 注意方向：服务器进程通过 WebSocket 主动连出到 GameLift。GameLift 从不 连入来管理它——这正是 NAT 后面的笔记本也能当 Anywhere compute 的原因。\n2. ProcessReady——宣告可开局 server.ProcessReady(server.ProcessParameters{ OnStartGameSession: m.onStartGameSession, // 回调 ↓ OnProcessTerminate: m.onProcessTerminate, OnHealthCheck: func() bool { return true }, // 每 60 秒轮询 Port: m.Port, // 玩家将连接的端口 }) 从这一刻起，进程空闲、健康、等待被选中。\n3. OnStartGameSession——比赛来了 func (m *Manager) onStartGameSession(gs model.GameSession) { trackID, expected := parseMatchmakerData(gs.MatchmakerData) // 谁要来 room, _ := game.NewRoom(trackID, expected, false, cb) // 构建游戏状态 go room.Run() // 启动 20Hz tick 循环 server.ActivateGameSession() // “可以放玩家进来了” } MatchmakerData 是 FlexMatch 的档案：匹配到的玩家及其属性。 服务器据此知道谁有资格进来。\n4. 玩家连入——AcceptPlayerSession cb.AcceptPlayer = func(psid string) error { return server.AcceptPlayerSession(psid) // 交给 GameLift 验票 } 每个连入的客户端都要出示匹配系统签发的 PlayerSessionId。服务器把它交给 GameLift 校验——未经匹配的玩家无法混入会话。\n5. ProcessEnding——干净退出 server.ProcessEnding() // “这局结束了” os.Exit(0) // GameLift 立即拉起新进程 一进程一局——简单、崩溃隔离，回收交给 GameLift。\n提示 这就是完整契约。Unreal、Unity、C++ 服务器实现的是一模一样的五个时刻、 同一套 SDK 调用。",
    "description": "只读——打开文件对照阅读，不需要修改。\n在编辑器中打开 server/gamelift/manager.go。这一个文件包含了我们 Go 游戏服务器的全部 GameLift 集成。对照模块 1 的生命周期图，逐一看真实代码。\n1. InitSDK——自我介绍 // Anywhere fleet 显式传连接参数； // 托管 EC2 上同一调用会从环境变量读取。 params = server.ServerParameters{ WebSocketURL: m.Anywhere.WebSocketURL, FleetID: m.Anywhere.FleetID, HostID: m.Anywhere.HostID, // = 你注册的 compute 名 AuthToken: m.Anywhere.AuthToken, // = GetComputeAuthToken 的结果 ProcessID: pid, } server.InitSDK(params) 信息 注意方向：服务器进程通过 WebSocket 主动连出到 GameLift。GameLift 从不 连入来管理它——这正是 NAT 后面的笔记本也能当 Anywhere compute 的原因。\n2. ProcessReady——宣告可开局 server.ProcessReady(server.ProcessParameters{ OnStartGameSession: m.onStartGameSession, // 回调 ↓ OnProcessTerminate: m.onProcessTerminate, OnHealthCheck: func() bool { return true }, // 每 60 秒轮询 Port: m.Port, // 玩家将连接的端口 }) 从这一刻起，进程空闲、健康、等待被选中。",
    "tags": [],
    "title": "带读代码：Server SDK",
    "uri": "/zh/3_gameliftanywhere/32_serverlifecycle.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 3. GameLift Anywhere",
    "content": "1. 部署 GameLift stack 创建 Anywhere fleet + 自定义 location + FlexMatch 匹配配置（不含 EC2，很快）：\ncd infra npx cdk deploy PixelRushGameLiftStack --require-approval never 约 2 分钟。输出包含 AnywhereFleetId 和 AnywhereMatchmakingConfig。\n2. 把你的机器启动为 fleet 算力 一个脚本完成全部注册流程：\ncd .. ./scripts/run-anywhere.sh 观察输出——每一行都对应前面讲过的概念：\nfleet: fleet-xxxx compute: your-host-dev ip: 127.0.0.1 port: 1935 └─ RegisterCompute：这台机器加入 fleet starting server (auth token valid ~15 min)... └─ GetComputeAuthToken：InitSDK 用的短时效凭证 InitSDK (Anywhere): fleet=fleet-xxxx host=your-host-dev Connected to GameLift API Gateway. ◄─ 主动连出到 GameLift 的 WebSocket ProcessReady on port 1935; waiting for game sessions └─ 空闲且健康——等待被选中 让这个终端保持运行。\n注释 AWS 活动路径：脚本会通过预设的 COMPUTE_IP 环境变量自动使用开发机的公网 IP 注册，确保你的浏览器能连到它。\n3. 在自己的硬件上比赛 打开你的游戏站点（SiteUrl）并登录 RACE → 选 Sunny Boulevard → 注意 ⚡ QUICK START 是纯浏览器本地 模拟！要跑服务器比赛请选 2P，并再开一个浏览器标签页 （换个车手名）同样发起 2P FlexMatch 撮合两张票据 → Queue 把会话放到你的机器上 → 两个标签页连入，倒计时开始 与此同时，服务器终端实时展示生命周期：\nOnStartGameSession: arn:aws:gamelift:...:gamesession/... game session active: track=track-1 expected players=2 player Alice (…) joined slot 0 [1/2 expected] player Bob (…) joined slot 1 [2/2 expected] race started with 2 players 4. 检查点 ★ 打开 AWS 控制台 → Amazon GameLift Servers → Fleets → PixelRushAnywhereFleet：\nComputes 页签：你的机器在列，状态 Active Game sessions 页签：一条会话，状态 Active，含 2 个 player session 你刚刚在自己的电脑上托管了一场由 GameLift 编排的多人比赛。\n警告 auth token 空闲约 15 分钟后过期。如果 workshop 后面服务器退出了， 重新运行 ./scripts/run-anywhere.sh 即可。",
    "description": "1. 部署 GameLift stack 创建 Anywhere fleet + 自定义 location + FlexMatch 匹配配置（不含 EC2，很快）：\ncd infra npx cdk deploy PixelRushGameLiftStack --require-approval never 约 2 分钟。输出包含 AnywhereFleetId 和 AnywhereMatchmakingConfig。\n2. 把你的机器启动为 fleet 算力 一个脚本完成全部注册流程：\ncd .. ./scripts/run-anywhere.sh 观察输出——每一行都对应前面讲过的概念：\nfleet: fleet-xxxx compute: your-host-dev ip: 127.0.0.1 port: 1935 └─ RegisterCompute：这台机器加入 fleet starting server (auth token valid ~15 min)... └─ GetComputeAuthToken：InitSDK 用的短时效凭证 InitSDK (Anywhere): fleet=fleet-xxxx host=your-host-dev Connected to GameLift API Gateway. ◄─ 主动连出到 GameLift 的 WebSocket ProcessReady on port 1935; waiting for game sessions └─ 空闲且健康——等待被选中 让这个终端保持运行。",
    "tags": [],
    "title": "动手：跑起来",
    "uri": "/zh/3_gameliftanywhere/33_runanywhere.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战",
    "content": "时长：约 25 分钟（含约 15 分钟 fleet 激活等待——用于阅读）\n进入生产托管：上传你的服务器 build，让 GameLift 在托管 EC2 实例上运行它。",
    "description": "时长：约 25 分钟（含约 15 分钟 fleet 激活等待——用于阅读）\n进入生产托管：上传你的服务器 build，让 GameLift 在托管 EC2 实例上运行它。",
    "tags": [],
    "title": "4. 托管 Fleet",
    "uri": "/zh/4_managedfleet/index.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 4. 托管 Fleet",
    "content": "1. 为 fleet 交叉编译服务器 Fleet 实例运行 x86_64 的 Amazon Linux 2023。Go 一条命令即可交叉编译：\n./scripts/build-server-linux.sh 脚本产出 server/dist/linux/，包含：\npixelrush-server — Linux 二进制（静态链接，约 8 MB） install.sh — 部署时在每台实例上执行一次（设置权限、日志目录） 2. 部署 fleet cd infra npx cdk deploy PixelRushGameLiftStack -c stage=ec2 --require-approval never -c stage=ec2 标志在你已有的 stack 上扩展三个资源：\n资源 发生了什么 Build server/dist/linux/ 打包上传 S3，注册到 GameLift Fleet GameLift 开出一台 c5.large，下载 build，执行 install.sh，拉起你的服务器进程 Queue PixelRushQueue — FlexMatch 将使用的放置目标 信息 这一步需要 约 15 分钟（实例开通 + build 安装 + 进程健康检查）。别干等—— 翻到下一页阅读 fleet 的配置详解，等部署命令返回后再回来。",
    "description": "1. 为 fleet 交叉编译服务器 Fleet 实例运行 x86_64 的 Amazon Linux 2023。Go 一条命令即可交叉编译：\n./scripts/build-server-linux.sh 脚本产出 server/dist/linux/，包含：\npixelrush-server — Linux 二进制（静态链接，约 8 MB） install.sh — 部署时在每台实例上执行一次（设置权限、日志目录） 2. 部署 fleet cd infra npx cdk deploy PixelRushGameLiftStack -c stage=ec2 --require-approval never -c stage=ec2 标志在你已有的 stack 上扩展三个资源：\n资源 发生了什么 Build server/dist/linux/ 打包上传 S3，注册到 GameLift Fleet GameLift 开出一台 c5.large，下载 build，执行 install.sh，拉起你的服务器进程 Queue PixelRushQueue — FlexMatch 将使用的放置目标 信息 这一步需要 约 15 分钟（实例开通 + build 安装 + 进程健康检查）。别干等—— 翻到下一页阅读 fleet 的配置详解，等部署命令返回后再回来。",
    "tags": [],
    "title": "动手：构建与部署",
    "uri": "/zh/4_managedfleet/41_buildanddeploy.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 4. 托管 Fleet",
    "content": "趁 fleet 激活的时间，读一读正在生效的配置。打开 infra/lib/gamelift-stack.ts，找到 Ec2Fleet 的定义。\n运行时配置——每台实例上跑什么 runtimeConfiguration: { serverProcesses: [ { launchPath: '/local/game/pixelrush-server', parameters: '--port 8443 ...', concurrentExecutions: 1 }, { launchPath: '/local/game/pixelrush-server', parameters: '--port 2083 ...', concurrentExecutions: 1 }, ], }, 每台实例在不同端口运行两个服务器进程 → 每实例可同时承载两局比赛。 进程密度是成本杠杆：大型工作室每台机器跑几十个进程。launchPath 一律以 /local/game/ 开头——那是 GameLift 解压你 build 的位置。\n端口——玩家怎么进来 ec2InboundPermissions: [ { fromPort: 8443, toPort: 8443, ipRange: '0.0.0.0/0', protocol: 'TCP' }, { fromPort: 2083, toPort: 2083, ipRange: '0.0.0.0/0', protocol: 'TCP' }, // + 同样两个端口的 UDP ], 游戏客户端直连实例（这是 GameLift 低延迟设计的核心）——所以游戏端口必须 显式开放。只有列出的端口可达，其余全部关闭。\nTLS——对浏览器友好的连接 certificateConfiguration: { certificateType: 'GENERATED' }, GameLift 可为每个 fleet 签发 TLS 证书。我们的网页客户端跑在 HTTPS 页面上， 浏览器只允许它建立安全 WebSocket（wss://）——生成的证书加上会话的 DNS 名称，让这一切零证书运维地工作。\nQueue——谁决定会话放在哪 const ec2Queue = new gamelift.CfnGameSessionQueue(this, 'Ec2Queue', { name: 'PixelRushQueue', destinations: [ /* 本 fleet */ ], }); 没有人直接向 fleet 要会话。请求都发给 queue，由它扫描目的地列表 （fleet/别名，可跨区域）并把会话放到最合适的那个。今天队列只有一个目的地； 可选附录会加入东京和新加坡——完全不用改游戏代码。\nFleet 生命周期状态 你的部署此刻正在经历：\nNEW → DOWNLOADING → VALIDATING → BUILDING → ACTIVATING → ACTIVE (下载 build) (install.sh) (运行时) (进程健康检查) (可接会话) 回到终端——cdk deploy 返回后，继续下一页。",
    "description": "趁 fleet 激活的时间，读一读正在生效的配置。打开 infra/lib/gamelift-stack.ts，找到 Ec2Fleet 的定义。\n运行时配置——每台实例上跑什么 runtimeConfiguration: { serverProcesses: [ { launchPath: '/local/game/pixelrush-server', parameters: '--port 8443 ...', concurrentExecutions: 1 }, { launchPath: '/local/game/pixelrush-server', parameters: '--port 2083 ...', concurrentExecutions: 1 }, ], }, 每台实例在不同端口运行两个服务器进程 → 每实例可同时承载两局比赛。 进程密度是成本杠杆：大型工作室每台机器跑几十个进程。launchPath 一律以 /local/game/ 开头——那是 GameLift 解压你 build 的位置。\n端口——玩家怎么进来 ec2InboundPermissions: [ { fromPort: 8443, toPort: 8443, ipRange: '0.0.0.0/0', protocol: 'TCP' }, { fromPort: 2083, toPort: 2083, ipRange: '0.0.0.0/0', protocol: 'TCP' }, // + 同样两个端口的 UDP ], 游戏客户端直连实例（这是 GameLift 低延迟设计的核心）——所以游戏端口必须 显式开放。只有列出的端口可达，其余全部关闭。",
    "tags": [],
    "title": "Fleet 配置详解（等待时阅读）",
    "uri": "/zh/4_managedfleet/42_fleetanatomy.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 4. 托管 Fleet",
    "content": "读 fleet 自己讲述的故事 控制台 → Amazon GameLift Servers → Fleets → PixelRushFleet → Events 页签。 整个激活过程可以像时间线一样回放：\nFLEET_CREATED FLEET_STATE_DOWNLOADING ← 从 S3 拉取你的 build FLEET_CREATION_RUNNING_INSTALLER ← 执行了 install.sh FLEET_STATE_VALIDATING FLEET_CREATION_VALIDATING_RUNTIME_CONFIG FLEET_STATE_BUILDING FLEET_STATE_ACTIVATING ← 进程已拉起，健康检查通过 FLEET_STATE_ACTIVE ← 可以接客了 提示 以后 fleet 一旦异常，Events 页签永远是第一站——服务器二进制崩溃会以 SERVER_PROCESS_CRASHED 或 SERVER_PROCESS_SDK_INITIALIZATION_TIMEOUT 的形式出现，每条事件都带解释。\n逛逛其他页签 Compute：一台 c5.large 实例、公网 IP 和所在位置 Metrics：可用/活跃会话数、健康进程数——自动伸缩策略依据的就是这些指标 Game sessions：现在是空的。匹配系统还指向你的 Anywhere fleet—— 切换过来正是下一模块的事。 检查点 ★ Fleet 状态为 ACTIVE，Compute 页签有一台活跃实例。",
    "description": "读 fleet 自己讲述的故事 控制台 → Amazon GameLift Servers → Fleets → PixelRushFleet → Events 页签。 整个激活过程可以像时间线一样回放：\nFLEET_CREATED FLEET_STATE_DOWNLOADING ← 从 S3 拉取你的 build FLEET_CREATION_RUNNING_INSTALLER ← 执行了 install.sh FLEET_STATE_VALIDATING FLEET_CREATION_VALIDATING_RUNTIME_CONFIG FLEET_STATE_BUILDING FLEET_STATE_ACTIVATING ← 进程已拉起，健康检查通过 FLEET_STATE_ACTIVE ← 可以接客了 提示 以后 fleet 一旦异常，Events 页签永远是第一站——服务器二进制崩溃会以 SERVER_PROCESS_CRASHED 或 SERVER_PROCESS_SDK_INITIALIZATION_TIMEOUT 的形式出现，每条事件都带解释。\n逛逛其他页签 Compute：一台 c5.large 实例、公网 IP 和所在位置 Metrics：可用/活跃会话数、健康进程数——自动伸缩策略依据的就是这些指标 Game sessions：现在是空的。匹配系统还指向你的 Anywhere fleet—— 切换过来正是下一模块的事。 检查点 ★ Fleet 状态为 ACTIVE，Compute 页签有一台活跃实例。",
    "tags": [],
    "title": "验证 Fleet",
    "uri": "/zh/4_managedfleet/43_verify.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战",
    "content": "时长：约 20 分钟\n最后一块拼图：玩家如何找到彼此。规则集、票据、事件管道—— 然后把匹配指向你的新 EC2 fleet 并开赛。",
    "description": "时长：约 20 分钟\n最后一块拼图：玩家如何找到彼此。规则集、票据、事件管道—— 然后把匹配指向你的新 EC2 fleet 并开赛。",
    "tags": [],
    "title": "5. FlexMatch",
    "uri": "/zh/5_flexmatch/index.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 5. FlexMatch",
    "content": "**规则集（rule set）**是一份 JSON 文档，描述\"什么样算一场有效的比赛\"。 FlexMatch 用它评估每一张搜索中的票据。来读我们自己的规则集——定义在 infra/lib/gamelift-stack.ts（ruleSetBody），下面是 2 人赛的版本：\n{ \"name\": \"PixelRushRaceRules2\", \"playerAttributes\": [ { \"name\": \"level\", \"type\": \"number\", \"default\": 1 }, { \"name\": \"trackId\", \"type\": \"string\", \"default\": \"track-1\" } ], \"teams\": [{ \"name\": \"racers\", \"minPlayers\": 2, \"maxPlayers\": 2 }], \"rules\": [ { \"name\": \"SimilarLevel\", \"type\": \"distance\", \"measurements\": [\"teams[racers].players.attributes[level]\"], \"referenceValue\": \"avg(teams[racers].players.attributes[level])\", \"maxDistance\": 3 }, { \"name\": \"SameTrack\", \"type\": \"comparison\", \"operation\": \"=\", \"measurements\": [\"flatten(teams[*].players.attributes[trackId])\"] } ], \"expansions\": [ { \"target\": \"rules[SimilarLevel].maxDistance\", \"steps\": [{ \"waitTimeSeconds\": 10, \"value\": 100 }] }, { \"target\": \"teams[racers].minPlayers\", \"steps\": [{ \"waitTimeSeconds\": 45, \"value\": 1 }] } ] } 逐块解读：\n块 在我们游戏中的含义 playerAttributes 每张票据携带玩家的 level 和所选 trackId——在此声明，由我们的 Lambda 调用 StartMatchmaking 时填入 teams 一个叫 racers 的队伍，恰好 2 人。（团队对战射击游戏会在这里定义两支队伍。） SimilarLevel 规则 玩家等级与组内平均值差距不超过 3——保证公平 SameTrack 规则 所有人必须选了同一条赛道 expansions 防饿死机制：10 秒后放宽等级限制；45 秒后连 minPlayers 都降为 1，孤身玩家也能开局（我们的服务器会用 NPC 车手补满） 提示 Expansion 是\"匹配质量换等待时间“的旋钮。所有生产级匹配系统都会用它—— 没人愿意为完美匹配等 10 分钟，而放弃 20 秒内的够好匹配。\nWorkshop 部署了四套规则集（1/2/3/4 人）——除队伍人数外完全相同。 1 人规则集就是\"单人 vs NPC\"秒开服务器比赛的动力来源。",
    "description": "**规则集（rule set）**是一份 JSON 文档，描述\"什么样算一场有效的比赛\"。 FlexMatch 用它评估每一张搜索中的票据。来读我们自己的规则集——定义在 infra/lib/gamelift-stack.ts（ruleSetBody），下面是 2 人赛的版本：\n{ \"name\": \"PixelRushRaceRules2\", \"playerAttributes\": [ { \"name\": \"level\", \"type\": \"number\", \"default\": 1 }, { \"name\": \"trackId\", \"type\": \"string\", \"default\": \"track-1\" } ], \"teams\": [{ \"name\": \"racers\", \"minPlayers\": 2, \"maxPlayers\": 2 }], \"rules\": [ { \"name\": \"SimilarLevel\", \"type\": \"distance\", \"measurements\": [\"teams[racers].players.attributes[level]\"], \"referenceValue\": \"avg(teams[racers].players.attributes[level])\", \"maxDistance\": 3 }, { \"name\": \"SameTrack\", \"type\": \"comparison\", \"operation\": \"=\", \"measurements\": [\"flatten(teams[*].players.attributes[trackId])\"] } ], \"expansions\": [ { \"target\": \"rules[SimilarLevel].maxDistance\", \"steps\": [{ \"waitTimeSeconds\": 10, \"value\": 100 }] }, { \"target\": \"teams[racers].minPlayers\", \"steps\": [{ \"waitTimeSeconds\": 45, \"value\": 1 }] } ] } 逐块解读：\n块 在我们游戏中的含义 playerAttributes 每张票据携带玩家的 level 和所选 trackId——在此声明，由我们的 Lambda 调用 StartMatchmaking 时填入 teams 一个叫 racers 的队伍，恰好 2 人。（团队对战射击游戏会在这里定义两支队伍。） SimilarLevel 规则 玩家等级与组内平均值差距不超过 3——保证公平 SameTrack 规则 所有人必须选了同一条赛道 expansions 防饿死机制：10 秒后放宽等级限制；45 秒后连 minPlayers 都降为 1，孤身玩家也能开局（我们的服务器会用 NPC 车手补满） 提示 Expansion 是\"匹配质量换等待时间“的旋钮。所有生产级匹配系统都会用它—— 没人愿意为完美匹配等 10 分钟，而放弃 20 秒内的够好匹配。",
    "tags": [],
    "title": "规则集",
    "uri": "/zh/5_flexmatch/51_rulesets.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 5. FlexMatch",
    "content": "三个协作部件 匹配配置 (CONFIGURATION) = 规则集 + 队列 + 通知目标 │ │ StartMatchmaking(配置名, 玩家[属性]) ▼ 票据 (TICKET) ─────────────────────────► 游戏会话 (GAME SESSION) 每次请求一张；携带玩家、状态、 成局后经由 Queue 放置 以及（完成时的）连接信息 匹配配置把一切绑在一起——我们的 stack 为每种人数各建一个 （PixelRushMatchEc22 = EC2 队列上的 2 人赛）。\n票据生命周期 每次调用 StartMatchmaking 都返回一张票据，它经历：\nQUEUED → SEARCHING → POTENTIAL_MATCH_CREATED → PLACING → COMPLETED │ └─ 连接信息： │ （若启用接受确认流程） IP/DNS + 端口 + └─ REQUIRES_ACCEPTANCE PlayerSessionId 失败路径：TIMED_OUT · CANCELLED · FAILED COMPLETED 是回报时刻：票据此时包含去哪连（游戏会话地址）和每个玩家的 PlayerSessionId——也就是服务器在模块 3 里用 AcceptPlayerSession 验的那张\"入场券\"。\n玩家怎么知道结果？ 轮询 DescribeMatchmaking 可行但不可扩展。生产模式——我们的游戏就是这么 实现的——是事件推送：\nFlexMatch ──事件──► SNS 主题 ──► Lambda ──► WebSocket 推送 ──► 浏览器 （每次状态变化） (process-matchmaking-events.ts) 匹配配置的 notificationTarget 指向一个 SNS 主题；票据每次状态变化都会发布 事件。我们的 Lambda 把 MatchmakingSucceeded（含连接信息）经 API Gateway WebSocket 转发给等待中的玩家。端到端延迟：不到一秒。\n信息 这套基于 SNS 的模式是 AWS 官方推荐的 FlexMatch 集成方式——同一条管道 从我们的 2 人 workshop 扩展到百万级票据规模。",
    "description": "三个协作部件 匹配配置 (CONFIGURATION) = 规则集 + 队列 + 通知目标 │ │ StartMatchmaking(配置名, 玩家[属性]) ▼ 票据 (TICKET) ─────────────────────────► 游戏会话 (GAME SESSION) 每次请求一张；携带玩家、状态、 成局后经由 Queue 放置 以及（完成时的）连接信息 匹配配置把一切绑在一起——我们的 stack 为每种人数各建一个 （PixelRushMatchEc22 = EC2 队列上的 2 人赛）。\n票据生命周期 每次调用 StartMatchmaking 都返回一张票据，它经历：\nQUEUED → SEARCHING → POTENTIAL_MATCH_CREATED → PLACING → COMPLETED │ └─ 连接信息： │ （若启用接受确认流程） IP/DNS + 端口 + └─ REQUIRES_ACCEPTANCE PlayerSessionId 失败路径：TIMED_OUT · CANCELLED · FAILED COMPLETED 是回报时刻：票据此时包含去哪连（游戏会话地址）和每个玩家的 PlayerSessionId——也就是服务器在模块 3 里用 AcceptPlayerSession 验的那张\"入场券\"。",
    "tags": [],
    "title": "票据与事件",
    "uri": "/zh/5_flexmatch/52_ticketlifecycle.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 5. FlexMatch",
    "content": "1. 把匹配指向 EC2 fleet 后端 Lambda 通过环境变量选择匹配配置。从 Anywhere 切到 EC2 并重新部署 （一条命令）：\ncd infra npx cdk deploy PixelRushBackendStack -c matchmakingConfig=PixelRushMatchEc2 -c stage=ec2 --require-approval never 约 2 分钟（只改 Lambda 配置）。\n注释 Anywhere 服务器的终端现在可以停掉了（Ctrl-C）——比赛不会再放到那里。\n2. 开赛——顺便观察机器运转 2P 比赛需要第二名玩家：同事用他自己部署的站点是不行的（不同账号！）—— 请开第二个浏览器标签页换个车手名，或与邻座结对、两人都用你的站点 URL。\n两名玩家：RACE → 同一条赛道 → 2P 转圈等待时打开控制台： GameLift → Matchmaking → PixelRushMatchEc22——在 Matchmaking activity 下能看到票据计数跳动 几秒内两个浏览器同时进入倒计时——这次会话放置在你的 EC2 fleet 上 3. 回溯完整链路 控制台 → GameLift → Fleets → PixelRushFleet → Game sessions：你的会话 在列，状态 ACTIVE，挂着两个 player session。点进去——能看到浏览器实际连接 的 IP:端口，以及每个 PlayerSessionId。\n检查点 ★ 游戏会话出现在 PixelRushFleet（而非 Anywhere fleet）上，浏览器里完成了 比赛。模块 1 那张图里的每一格现在都亮了：\nBuild ✓ → Fleet ✓ → Queue ✓ → FlexMatch ✓ → Game Session ✓ → Players ✓",
    "description": "1. 把匹配指向 EC2 fleet 后端 Lambda 通过环境变量选择匹配配置。从 Anywhere 切到 EC2 并重新部署 （一条命令）：\ncd infra npx cdk deploy PixelRushBackendStack -c matchmakingConfig=PixelRushMatchEc2 -c stage=ec2 --require-approval never 约 2 分钟（只改 Lambda 配置）。\n注释 Anywhere 服务器的终端现在可以停掉了（Ctrl-C）——比赛不会再放到那里。\n2. 开赛——顺便观察机器运转 2P 比赛需要第二名玩家：同事用他自己部署的站点是不行的（不同账号！）—— 请开第二个浏览器标签页换个车手名，或与邻座结对、两人都用你的站点 URL。\n两名玩家：RACE → 同一条赛道 → 2P 转圈等待时打开控制台： GameLift → Matchmaking → PixelRushMatchEc22——在 Matchmaking activity 下能看到票据计数跳动 几秒内两个浏览器同时进入倒计时——这次会话放置在你的 EC2 fleet 上 3. 回溯完整链路 控制台 → GameLift → Fleets → PixelRushFleet → Game sessions：你的会话 在列，状态 ACTIVE，挂着两个 player session。点进去——能看到浏览器实际连接 的 IP:端口，以及每个 PlayerSessionId。",
    "tags": [],
    "title": "动手：在你的 fleet 上匹配",
    "uri": "/zh/5_flexmatch/53_matchexercise.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战",
    "content": "时长：约 15 分钟\n一切就绪。最后两个体验：端到端验证你自己的技术栈，然后加入共享竞技场全员对战。",
    "description": "时长：约 15 分钟\n一切就绪。最后两个体验：端到端验证你自己的技术栈，然后加入共享竞技场全员对战。",
    "tags": [],
    "title": "6. 决赛日",
    "uri": "/zh/6_raceday/index.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 6. 决赛日",
    "content": "统一前端 Pixel Rush 客户端内置服务器选择器。登录页上：\n☁️ AWS ARENA — 官方 workshop 服务器（讲师的部署） 🔧 MY SERVER — 任意 Pixel Rush 后端，用它的 API URL 标识 MY SERVER 的原理：调用目标后端的 /api/info 发现端点，确认它是一个 Pixel Rush arena，然后把整个客户端（登录、匹配、通知）接到那套部署上。\n证明你的部署 这是毕业考——你搭建的完整管道，一条流程验证到底：\n打开官方 workshop 站点（讲师提供的 URL——这次不是你自己的 SiteUrl） 登录页点击 🔧 MY SERVER 粘贴你的 ApiUrl（模块 2 保存过；忘了可以重查： aws cloudformation describe-stacks --stack-name PixelRushBackendStack --query \"Stacks[0].Outputs\"） 输入车手名 + 密码 gamelift → START ENGINE 大厅副标题显示你在自己的 arena 上。现在 RACE → 2P（再开一个标签页）→ 比赛跑在你的 EC2 fleet 上 刚刚发生了什么：由别人的 CloudFront 提供的前端，调用了你的 API Gateway， 经过你的 FlexMatch 撮合，最终在你的 GameLift fleet 上完成了比赛。\n检查点 ★ 大厅副标题显示 🔧（你的 arena），完成一场 2P 比赛。控制台复核： 游戏会话出现在你账号的 PixelRushFleet 下。",
    "description": "统一前端 Pixel Rush 客户端内置服务器选择器。登录页上：\n☁️ AWS ARENA — 官方 workshop 服务器（讲师的部署） 🔧 MY SERVER — 任意 Pixel Rush 后端，用它的 API URL 标识 MY SERVER 的原理：调用目标后端的 /api/info 发现端点，确认它是一个 Pixel Rush arena，然后把整个客户端（登录、匹配、通知）接到那套部署上。\n证明你的部署 这是毕业考——你搭建的完整管道，一条流程验证到底：\n打开官方 workshop 站点（讲师提供的 URL——这次不是你自己的 SiteUrl） 登录页点击 🔧 MY SERVER 粘贴你的 ApiUrl（模块 2 保存过；忘了可以重查： aws cloudformation describe-stacks --stack-name PixelRushBackendStack --query \"Stacks[0].Outputs\"） 输入车手名 + 密码 gamelift → START ENGINE 大厅副标题显示你在自己的 arena 上。现在 RACE → 2P（再开一个标签页）→ 比赛跑在你的 EC2 fleet 上 刚刚发生了什么：由别人的 CloudFront 提供的前端，调用了你的 API Gateway， 经过你的 FlexMatch 撮合，最终在你的 GameLift fleet 上完成了比赛。",
    "tags": [],
    "title": "验证你自己的服务器",
    "uri": "/zh/6_raceday/61_verifymyserver.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 6. 决赛日",
    "content": "切换到共享竞技场 该和真人比赛了。回到登录页：\n若在大厅中先点 switch racer，然后选择 ☁️ AWS ARENA 登录（同名可用——各 arena 的玩家数据库彼此独立，你会在这里获得一个新角色） 现在所有学员都在同一个世界里：右侧世界频道能看到大家陆续进入， 排行榜也是全局的。\n锦标赛时间 🏁 讲师会组织分组。建议赛制：\n第一轮：两两配对——双方选同一条赛道，排 2P 第二轮：三人组——排 3P（FlexMatch 按赛道分组，先商量好选哪条赛道！） 决赛：成绩靠前者在最难的已解锁赛道排 4P 比赛技巧：\n按键 动作 ← / →（或 A / D） 变道——点按一次变一条 空格 使用手中道具：🔥 氮气（加速）或 💣 炸弹（丢在身后） 比赛间隙留意世界频道——对局播报显示谁在和谁比赛，青色的 debug 行实时展示 FlexMatch 的工作过程。\n检查点 ★ 你已在 AWS ARENA 上与其他学员完成至少一场多人比赛。看看排行榜—— 你的最好成绩上榜了吗？",
    "description": "切换到共享竞技场 该和真人比赛了。回到登录页：\n若在大厅中先点 switch racer，然后选择 ☁️ AWS ARENA 登录（同名可用——各 arena 的玩家数据库彼此独立，你会在这里获得一个新角色） 现在所有学员都在同一个世界里：右侧世界频道能看到大家陆续进入， 排行榜也是全局的。\n锦标赛时间 🏁 讲师会组织分组。建议赛制：\n第一轮：两两配对——双方选同一条赛道，排 2P 第二轮：三人组——排 3P（FlexMatch 按赛道分组，先商量好选哪条赛道！） 决赛：成绩靠前者在最难的已解锁赛道排 4P 比赛技巧：\n按键 动作 ← / →（或 A / D） 变道——点按一次变一条 空格 使用手中道具：🔥 氮气（加速）或 💣 炸弹（丢在身后） 比赛间隙留意世界频道——对局播报显示谁在和谁比赛，青色的 debug 行实时展示 FlexMatch 的工作过程。\n检查点 ★ 你已在 AWS ARENA 上与其他学员完成至少一场多人比赛。看看排行榜—— 你的最好成绩上榜了吗？",
    "tags": [],
    "title": "AWS Arena 全员对战",
    "uri": "/zh/6_raceday/62_awsarena.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战",
    "content": "时长：约 5 分钟",
    "description": "时长：约 5 分钟",
    "tags": [],
    "title": "7. 资源清理",
    "uri": "/zh/7_cleanup/index.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 7. 资源清理",
    "content": "信息 AWS 活动路径：跳过本页——临时账号会在活动结束后自动回收。\n一条命令 cd infra npx cdk destroy PixelRushGameLiftStack PixelRushFrontendStack PixelRushBackendStack --force 约 10 分钟（主要耗在 fleet 终止上）。可以关掉终端——删除在服务端继续进行。\n验证（账单安全检查清单） 唯一有实际小时成本的资源是 fleet 实例。确认：\n控制台 → GameLift → Fleets：PixelRushFleet 处于 Deleting 或已消失 控制台 → CloudFormation：三个 PixelRush* stack 均为 DELETE_COMPLETE（或已不存在） 可选：GameLift → Builds——build 默认保留且不产生费用， 但可手动删除 PixelRushServer 提示 其余资源（Lambda、按需 DynamoDB、API Gateway、CloudFront）都是按请求计费—— 零流量即零成本，即使删除有延迟也不会产生费用。",
    "description": "信息 AWS 活动路径：跳过本页——临时账号会在活动结束后自动回收。\n一条命令 cd infra npx cdk destroy PixelRushGameLiftStack PixelRushFrontendStack PixelRushBackendStack --force 约 10 分钟（主要耗在 fleet 终止上）。可以关掉终端——删除在服务端继续进行。\n验证（账单安全检查清单） 唯一有实际小时成本的资源是 fleet 实例。确认：\n控制台 → GameLift → Fleets：PixelRushFleet 处于 Deleting 或已消失 控制台 → CloudFormation：三个 PixelRush* stack 均为 DELETE_COMPLETE（或已不存在） 可选：GameLift → Builds——build 默认保留且不产生费用， 但可手动删除 PixelRushServer 提示 其余资源（Lambda、按需 DynamoDB、API Gateway、CloudFront）都是按请求计费—— 零流量即零成本，即使删除有延迟也不会产生费用。",
    "tags": [],
    "title": "销毁资源栈",
    "uri": "/zh/7_cleanup/71_destroy.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战",
    "content": "时长：约 5 分钟",
    "description": "时长：约 5 分钟",
    "tags": [],
    "title": "8. 总结",
    "uri": "/zh/8_conclusion/index.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 8. 总结",
    "content": "模块 ↔ 能力 ↔ 你做了什么 模块 GameLift 能力 你实际做的事 1 专用游戏服务器、组件模型 建立心智地图 2 —（Serverless 游戏后端） 用 CDK 部署 API + 网页客户端 3 GameLift Anywhere、Server SDK 生命周期 把自己的机器注册为 fleet 算力；在真实 Go 代码中读 InitSDK → ProcessReady → OnStartGameSession → AcceptPlayerSession → ProcessEnding；本机托管一局会话 4 Build、托管 fleet、Queue 上传 build；部署 EC2 fleet；读运行时配置/端口/TLS；看 fleet 事件走到 ACTIVE 5 FlexMatch 逐行读规则集（teams、rules、expansions）；追踪票据生命周期；见识 SNS 事件推送；在自己的 fleet 上匹配成局 6 完整管道 通过 arena 选择器验证自己的技术栈；在共享竞技场全员对战 一张图带走 Build ──► Fleet（托管 EC2 / Anywhere）──► 服务器进程（Server SDK） ▲ 玩家 ──► StartMatchmaking ──► FlexMatch ──► Queue ┘（放置游戏会话） ▲ │ └──── SNS ► Lambda ► WebSocket ┘（连接信息 + PlayerSessionId） 如果你能凭记忆重画这张图，你就理解了 GameLift。",
    "description": "模块 ↔ 能力 ↔ 你做了什么 模块 GameLift 能力 你实际做的事 1 专用游戏服务器、组件模型 建立心智地图 2 —（Serverless 游戏后端） 用 CDK 部署 API + 网页客户端 3 GameLift Anywhere、Server SDK 生命周期 把自己的机器注册为 fleet 算力；在真实 Go 代码中读 InitSDK → ProcessReady → OnStartGameSession → AcceptPlayerSession → ProcessEnding；本机托管一局会话 4 Build、托管 fleet、Queue 上传 build；部署 EC2 fleet；读运行时配置/端口/TLS；看 fleet 事件走到 ACTIVE 5 FlexMatch 逐行读规则集（teams、rules、expansions）；追踪票据生命周期；见识 SNS 事件推送；在自己的 fleet 上匹配成局 6 完整管道 通过 arena 选择器验证自己的技术栈；在共享竞技场全员对战 一张图带走 Build ──► Fleet（托管 EC2 / Anywhere）──► 服务器进程（Server SDK） ▲ 玩家 ──► StartMatchmaking ──► FlexMatch ──► Queue ┘（放置游戏会话） ▲ │ └──── SNS ► Lambda ► WebSocket ┘（连接信息 + PlayerSessionId） 如果你能凭记忆重画这张图，你就理解了 GameLift。",
    "tags": [],
    "title": "你学到了什么",
    "uri": "/zh/8_conclusion/81_recap.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 8. 总结",
    "content": "继续深入 主题 为什么是自然的下一步 附录：多区域 fleet（本 workshop） 添加东京/新加坡 location 与基于延迟的放置——20 分钟，改一处 CDK Match backfill 向运行中的会话补充玩家（我们刻意关闭了它——赛车不收中途加入者，但大逃杀需要） FleetIQ / Spot 用受管理的 Spot 实例削减最多 70% 的 fleet 成本 容器 fleet 用容器镜像替代 build 打包服务器 玩家身份 用真实鉴权替换 workshop 密码——参见 Custom Game Backend guidance（Steam/Apple/Google 登录、JWT） 会话指标与自动伸缩 基于 PercentAvailableGameSessions 的目标跟踪伸缩 参考资料 Amazon GameLift Servers 文档 FlexMatch 规则集参考 GameLift Server SDK（Go/C++/C#/Unreal/Unity） 本 workshop 的游戏源码——今天部署的一切都可读、可改、任你扩展 感谢与我们同场竞速！🏁",
    "description": "继续深入 主题 为什么是自然的下一步 附录：多区域 fleet（本 workshop） 添加东京/新加坡 location 与基于延迟的放置——20 分钟，改一处 CDK Match backfill 向运行中的会话补充玩家（我们刻意关闭了它——赛车不收中途加入者，但大逃杀需要） FleetIQ / Spot 用受管理的 Spot 实例削减最多 70% 的 fleet 成本 容器 fleet 用容器镜像替代 build 打包服务器 玩家身份 用真实鉴权替换 workshop 密码——参见 Custom Game Backend guidance（Steam/Apple/Google 登录、JWT） 会话指标与自动伸缩 基于 PercentAvailableGameSessions 的目标跟踪伸缩 参考资料 Amazon GameLift Servers 文档 FlexMatch 规则集参考 GameLift Server SDK（Go/C++/C#/Unreal/Unity） 本 workshop 的游戏源码——今天部署的一切都可读、可改、任你扩展 感谢与我们同场竞速！🏁",
    "tags": [],
    "title": "进阶方向",
    "uri": "/zh/8_conclusion/82_nextsteps.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战",
    "content": "时长：约 20 分钟 · 需先完成模块 1–5\n一个 fleet、三大洲——让玩家连接离自己最近的区域。",
    "description": "时长：约 20 分钟 · 需先完成模块 1–5\n一个 fleet、三大洲——让玩家连接离自己最近的区域。",
    "tags": [],
    "title": "附录：多区域（可选）",
    "uri": "/zh/9_appendix_multiregion/index.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战 \u003e 附录：多区域（可选）",
    "content": "警告 额外费用：每个新增 location 各跑一台 c5.large（各约 $0.085/小时）。 完成后记得销毁。\n问题 你的 fleet 在 us-east-1。亚洲玩家要跨太平洋连接：200–300ms RTT——能玩， 但明显落后于本地玩家。物理距离无法被优化掉；只能让服务器靠近玩家。\n第 1 步——给 fleet 添加 location 托管 fleet 可以以 location 的形式跨多个区域——同一 build、同一运行时配置， 实例遍布各地。打开 infra/lib/gamelift-stack.ts，找到 Ec2Fleet 定义中的 locations: 数组并扩展：\nlocations: [ { location: this.region, locationCapacity: { desiredEc2Instances: 1, minSize: 1, maxSize: 2 } }, { location: 'ap-northeast-1', locationCapacity: { desiredEc2Instances: 1, minSize: 1, maxSize: 2 } }, // 东京 { location: 'ap-southeast-1', locationCapacity: { desiredEc2Instances: 1, minSize: 1, maxSize: 2 } }, // 新加坡 ], 部署（远程 location 激活约需 15 分钟）：\ncd infra npx cdk deploy PixelRushGameLiftStack -c stage=ec2 --require-approval never 第 2 步——放置如何选区域 只加 location 不会自动路由。放置由 queue 决定，而它只有在票据携带延迟 数据时才按延迟路由：\n游戏客户端在玩家逛大厅时后台测量到各区域的 HTTPS 往返时延 （见 frontend/src/latency.ts） StartMatchmaking 为每个玩家附上 LatencyInMs: {\"us-east-1\": 250, \"ap-northeast-1\": 80, ...} （见 backend/src/request-matchmaking.ts） Queue 把每局放到对该局玩家整体延迟最优的 location——东京的两个人 放东京，美亚混编的一对放在\"最坏情况最小\"的区域 客户端 → 票据 → Queue 这条链就是 GameLift 标准的延迟路由模式； 我们的游戏已实现第 1–2 步，因此无需改任何代码。\n验证 等三个 location 全部就绪：控制台 → fleet → Locations 页签，全部 Active 跑一场 2P，再看 Game sessions——会话的 Location 列显示 Queue 把你放在了哪里 如果你在亚洲（或挂了 VPN）：应看到 ap-northeast-1 或 ap-southeast-1 检查点 ★ Fleet 显示 3 个活跃 location，且游戏会话的 Location 与该局玩家的最低延迟 区域一致。\n提示 清理提醒：现在 npx cdk destroy PixelRushGameLiftStack 会删除三个区域的 实例——请在控制台确认所有 location 都已消失。",
    "description": "警告 额外费用：每个新增 location 各跑一台 c5.large（各约 $0.085/小时）。 完成后记得销毁。\n问题 你的 fleet 在 us-east-1。亚洲玩家要跨太平洋连接：200–300ms RTT——能玩， 但明显落后于本地玩家。物理距离无法被优化掉；只能让服务器靠近玩家。\n第 1 步——给 fleet 添加 location 托管 fleet 可以以 location 的形式跨多个区域——同一 build、同一运行时配置， 实例遍布各地。打开 infra/lib/gamelift-stack.ts，找到 Ec2Fleet 定义中的 locations: 数组并扩展：\nlocations: [ { location: this.region, locationCapacity: { desiredEc2Instances: 1, minSize: 1, maxSize: 2 } }, { location: 'ap-northeast-1', locationCapacity: { desiredEc2Instances: 1, minSize: 1, maxSize: 2 } }, // 东京 { location: 'ap-southeast-1', locationCapacity: { desiredEc2Instances: 1, minSize: 1, maxSize: 2 } }, // 新加坡 ], 部署（远程 location 激活约需 15 分钟）：",
    "tags": [],
    "title": "挑战内容",
    "uri": "/zh/9_appendix_multiregion/91_challenge.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战",
    "content": "",
    "description": "",
    "tags": [],
    "title": "类别",
    "uri": "/zh/categories/index.html"
  },
  {
    "breadcrumb": "Amazon GameLift 实战",
    "content": "",
    "description": "",
    "tags": [],
    "title": "标签",
    "uri": "/zh/tags/index.html"
  }
]
