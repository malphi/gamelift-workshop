---
title: "Clone & Bootstrap"
weight: 23
---

## 1. Clone the repository

*(AWS event path: already cloned at `~/gamelift-workshop` — just `cd` into it.)*

```bash
git clone https://github.com/YOUR-ORG/gamelift-workshop.git
cd gamelift-workshop
```

## 2. Install dependencies

```bash
(cd infra && npm install)
(cd backend && npm install)
(cd frontend && npm install)
```

## 3. Bootstrap CDK

CDK needs a one-time bootstrap per account/region (creates an S3 bucket and
roles it deploys through):

```bash
cd infra
npx cdk bootstrap
```

Expected output ends with:

```
 ✅  Environment aws://123456789012/us-east-1 bootstrapped.
```

{{% notice note %}}
Already bootstrapped this account/region before? The command is idempotent —
it prints `(no changes)` and exits.
{{% /notice %}}
