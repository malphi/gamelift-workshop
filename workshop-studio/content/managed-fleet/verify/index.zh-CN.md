---
title: "验证 Fleet"
weight: 43
---

## 读 fleet 自己讲述的故事

控制台 → **Amazon GameLift Servers → Fleets → PixelRushFleet** → **Events** 页签。
整个激活过程可以像时间线一样回放：

```
FLEET_CREATED
FLEET_STATE_DOWNLOADING          ← 从 S3 拉取你的 build
FLEET_CREATION_RUNNING_INSTALLER ← 执行了 install.sh
FLEET_STATE_VALIDATING
FLEET_CREATION_VALIDATING_RUNTIME_CONFIG
FLEET_STATE_BUILDING
FLEET_STATE_ACTIVATING           ← 进程已拉起，健康检查通过
FLEET_STATE_ACTIVE               ← 可以接客了
```

:::alert{type=success}
以后 fleet 一旦异常，Events 页签永远是第一站——服务器二进制崩溃会以
`SERVER_PROCESS_CRASHED` 或 `SERVER_PROCESS_SDK_INITIALIZATION_TIMEOUT`
的形式出现，每条事件都带解释。
:::

## 逛逛其他页签

- **Compute**：一台 c5.large 实例、公网 IP 和所在位置
- **Metrics**：可用/活跃会话数、健康进程数——自动伸缩策略依据的就是这些指标
- **Game sessions**：现在是空的。匹配系统还指向你的 Anywhere fleet——
  切换过来正是下一模块的事。

## 检查点 ★

Fleet 状态为 **ACTIVE**，Compute 页签有一台活跃实例。
