---
title: "动手：构建与部署"
weight: 41
---

## 1. 为 fleet 交叉编译服务器

Fleet 实例运行 x86_64 的 Amazon Linux 2023。Go 一条命令即可交叉编译：

```bash
./scripts/build-server-linux.sh
```

脚本产出 `server/dist/linux/`，包含：

- `pixelrush-server` — Linux 二进制（静态链接，约 8 MB）
- `install.sh` — 部署时在每台实例上执行一次（设置权限、日志目录）

## 2. 部署 fleet

```bash
cd infra
npx cdk deploy PixelRushGameLiftStack -c stage=ec2 --require-approval never
```

`-c stage=ec2` 标志在你已有的 stack 上扩展三个资源：

| 资源 | 发生了什么 |
|---|---|
| **Build** | `server/dist/linux/` 打包上传 S3，注册到 GameLift |
| **Fleet** | GameLift 开出一台 c5.large，下载 build，执行 `install.sh`，拉起你的服务器进程 |
| **Queue** | `PixelRushQueue` — 会话放置目标（本模块直接放置，模块 5 经由 FlexMatch）|

{{% notice info %}}
这一步需要 **约 15 分钟**（实例开通 + build 安装 + 进程健康检查）。别干等——
翻到下一页阅读 fleet 的配置详解，等部署命令返回后再回来。
{{% /notice %}}
