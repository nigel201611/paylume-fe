# 部署说明

本项目的 CI/CD 结构参考 `agentic-payment-fe`，复用同一套 GitLab 前端共享模板与 GitOps Chart 发布方式。
差异在于：官网是纯静态站点，镜像内使用 Node 静态文件服务，不包含 Next.js / SSR。

## 交付物

| 交付物 | 说明 |
| --- | --- |
| 静态产物 | `pnpm build` 输出到 `dist/`（相对 `base: /`） |
| 容器镜像 | `Dockerfile` 多阶段构建：pnpm 安装依赖 → Vite 构建 → Node 静态服务器 |
| CI | `.gitlab-ci.yml`：校验、Kaniko 构建推送、触发下游 Chart 发布 |
| 健康检查 | `GET /healthz` 返回 `{"status":"ok"}`，容器 `HEALTHCHECK` 同样使用该地址 |

镜像推送地址（dev）：`${ACR_REGISTRY}/payfi-dev/exio-paylume-fe:<tag>`。

## 构建参数与运行时

- `VITE_SITE_URL`：构建期注入，用于生成 `canonical` 与 `og:url`。CI 变量中配置，
  同时通过 Docker `--build-arg` 传入；运行期修改无效。
- `PORT`：运行时端口，默认 `8080`。
- `STATIC_ROOT`：静态文件目录，默认容器内 `/app/dist`。

静态服务器行为：

- `index.html` 设置 `no-cache`；`/assets/*` 带内容哈希，设置一年 `immutable` 缓存。
- 对文本资源启用 gzip（`Accept-Encoding: gzip`）。
- 未命中且无扩展名的路径回退到 `index.html`；带扩展名的资源仍返回 404。
- 响应头包含 `X-Content-Type-Options`、`X-Frame-Options`、`Referrer-Policy`、
  `Permissions-Policy`、`HSTS`。TLS 在 ALB 终止。
- 镜像以非 root 用户 `app` 运行，暴露 `8080`。

## 本地验证

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm build

# 使用与容器相同的静态服务器
PORT=8080 node server.mjs

# Docker
docker build --build-arg VITE_SITE_URL=https://paylume-dev.vtransfer.io -t exio-paylume-fe:local .
docker run --rm -p 8080:8080 exio-paylume-fe:local
curl -fsS http://127.0.0.1:8080/healthz
```

## GitLab CI

流水线规则：MR、`main`、tag 均执行 `frontend-validate`；`main` 与 tag 在校验通过后
构建并推送镜像；`deploy_dev` 触发下游 Chart 仓库发布。`deploy_uat` / `deploy_prod`
保持禁用，待环境确定后再启用。

| 变量 | 用途 | 来源 |
| --- | --- | --- |
| `ACR_REGISTRY` / `ACR_USER` / `ACR_PASSWORD` | Kaniko 推送镜像 | PayFi 分组 CI 变量 |
| `CHART_REPO_TRIGGER_TOKEN` | 触发 Chart 仓库流水线 | 项目 CI 变量（masked） |
| `CHART_REPO_PROJECT_ID` | Chart 仓库路径（URL 编码） | `.gitlab-ci.yml` 中配置 |
| `VITE_SITE_URL` | 构建期站点地址 | `.gitlab-ci.yml` 中配置 |
| `CHART_REPO_REF` | Chart 仓库分支 | 默认 `main` |

`deploy_dev` 的规则包含 `$CHART_REPO_TRIGGER_TOKEN` 判断：未配置 token 时任务自动跳过，
不会因为 Chart 仓库尚未接入而让 `main` 流水线失败。镜像构建与推送仍会执行。

## 首次接入前置条件

当前仓库没有配套的 Chart 仓库、Argo Application 和 DNS 记录，首次上线前需要完成：

1. 创建 Chart 仓库（默认约定：`exiogroup/exio-devops/exio-paylume-fe-chart`，
   如使用其他名称，同步修改 `CHART_REPO_PROJECT_ID` 与 `CHART_REPO_SERVICE_NAME`）。
2. Chart 需要为 `exio-paylume-fe` 部署一个容器：
   - 镜像仓库 `${ACR_REGISTRY}/payfi-dev/exio-paylume-fe`
   - 容器端口 `8080`
   - readiness / liveness 探针：`GET /healthz`
   - 资源建议：`requests` 100m CPU / 128Mi，`limits` 250m CPU / 256Mi
   - 单副本即可；静态站点无持久卷、无需 Secret
3. 在 Argo 中注册 Chart 仓库与应用，配置 `dev` 自动同步。
4. 在 cloud DNS 仓库添加 `paylume-dev.vtransfer.io` 的 CNAME（沿用现有 ALB/CertId），
   并确认 ALB ACL。
5. 在 GitLab 项目变量中配置 `CHART_REPO_TRIGGER_TOKEN`；按需将 `VITE_SITE_URL`
   修改为最终域名。

上线检查清单：

- MR 上 `frontend-validate` 通过（lint、typecheck、build）。
- `main` 镜像推送成功，`image.env` 中 `DEPLOY_IMAGE_REF` 含合法 digest。
- 下游 Chart 流水线成功，Argo 状态 `Synced / Healthy`。
- 公网 `https://<host>/`、`/healthz` 返回 200；HTML、JS、CSS 缓存头符合预期。
- 中英文切换、移动端菜单、锚点导航在线上环境复查。

## 回滚

Chart 侧通过历史镜像 digest 更新 GitOps 版本即可回退；静态站点无状态、无持久卷，
回滚不涉及数据迁移。DNS、证书由 cloud 仓库与 ALB 统一管理。
