# GameLift Workshop（Hugo 站点源）

本目录是 workshop 教程站点的内容源，基于
[aws-modernization-workshop-base](https://github.com/aws-samples/aws-modernization-workshop-base)
模板（Hugo + hugo-theme-learn）。

## 目录

```
workshop/
├── DESIGN.md            设计方案（v3，已评审）
├── config.toml          Hugo 配置（含 en/zh 双语）
├── content/             教程内容，双语（*.en.md / *.zh.md）
│   ├── _index.*.md      首页
│   ├── 1_Introduction/  … 9_Appendix_MultiRegion/
└── static/
    └── infrastructure/
        └── workshop-studio.yaml   Workshop Studio 账号预置 CFN 模板
```

## 本地预览

```bash
# 1. 取 base 模板作为站点骨架（一次性）
git clone https://github.com/aws-samples/aws-modernization-workshop-base /tmp/ws-base
cd /tmp/ws-base && git submodule update --init   # 拉取 hugo-theme-learn 主题

# 2. 用本目录内容覆盖
rm -rf content config.toml
cp -r /path/to/gamelift-workshop/workshop/content .
cp    /path/to/gamelift-workshop/workshop/config.toml .
cp -r /path/to/gamelift-workshop/workshop/static/* static/

# 3. 启动
hugo server -D    # http://localhost:1313，右上角可切换 English/简体中文
```

## 发布

base 模板自带 `webspec.yml`（CodeBuild）：安装 Hugo → `hugo` 构建 → 产物在
`public/`。接入 Amplify Hosting 或 S3+CloudFront 均可。

## 待办（发布前）

- [ ] 替换 `content/2_Setup/23_Bootstrap.*.md` 与 CFN 模板中的
      `https://github.com/YOUR-ORG/gamelift-workshop.git` 为真实仓库地址
- [ ] 首页与 1_Introduction 的架构图（当前为 ASCII，可换成 draw.io 导出图放
      `static/images/`）
- [ ] 各检查点补充控制台截图（`static/images/`）
- [ ] Workshop Studio 事件配置：把 `workshop-studio.yaml` 注册为事件模板，
      Event Outputs 暴露 CodeServerURL / CodeServerPassword
- [ ] 讲师侧：提前部署官方 AWS ARENA（本仓库主 README 的部署流程），
      将 SiteUrl 写入 6_RaceDay 讲师提示
