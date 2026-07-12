---
title: "克隆与初始化"
weight: 23
---

## 1. 克隆仓库

*（AWS 活动路径：仓库已克隆在 `~/gamelift-workshop`——直接 `cd` 进去即可。）*

```bash
git clone https://github.com/malphi/gamelift-workshop.git
cd gamelift-workshop
```

## 2. 安装依赖

```bash
(cd infra && npm install)
(cd backend && npm install)
(cd frontend && npm install)
```

## 3. 初始化 CDK

CDK 需要对每个账号/区域做一次性 bootstrap（创建部署所需的 S3 桶和角色）：

```bash
cd infra
npx cdk bootstrap
```

预期输出结尾为：

```
 ✅  Environment aws://123456789012/us-east-1 bootstrapped.
```

{{% notice note %}}
这个账号/区域以前 bootstrap 过？命令是幂等的——输出 `(no changes)` 后直接结束。
{{% /notice %}}
