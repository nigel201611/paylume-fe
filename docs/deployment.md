# 部署说明

本项目复用 PayFi 前端共享模板与 GitOps Chart 发布方式，CI/CD 说明见
[cicd.md](cicd.md)。官网是纯静态站点，运行阶段用 nginx 托管 `dist/`，
不包含 Next.js / SSR，也不包含 Node。

## 交付物

| 交付物 | 说明 |
| --- | --- |
| 静态产物 | `pnpm build` 输出到 `dist/`（相对 `base: /`） |
| 容器镜像 | `Dockerfile` 多阶段构建：pnpm 安装依赖 → Vite 构建 → nginx 托管静态文件 |
| CI | `.gitlab-ci.yml`：校验、Kaniko 构建推送、触发下游 Chart 发布 |
| 健康检查 | `GET /healthz` 返回 `{"status":"ok"}`，容器 `HEALTHCHECK` 同样使用该地址 |

镜像推送地址（dev）：`${ACR_REGISTRY}/payfi-dev/exio-paylume-fe:<tag>`。

## 构建参数与运行时

- `VITE_SITE_URL`：构建期注入，用于生成 `canonical` 与 `og:url`。CI 变量中配置，
  同时通过 Docker `--build-arg` 传入；运行期修改无效。
- 运行时端口：`8080`（`nginx.conf` 固定配置，无需环境变量）。
- 本地预览仍可用 Node：`PORT=8080 node server.mjs`（不进镜像）。

nginx 行为（`nginx.conf`）：

- `index.html` 设置 `no-cache`；`/assets/*` 带内容哈希，设置一年缓存。
- 对文本资源启用 gzip。
- 未命中路径回退到 `index.html`（SPA fallback）。
- 响应头包含 `X-Content-Type-Options`、`X-Frame-Options`、`Referrer-Policy`、
  `Permissions-Policy`、`HSTS`。TLS 在 ALB 终止。
- 基础镜像为 `nginx:alpine`（默认 master 进程为 root，worker 为 nginx 用户）；
  如集群强制非 root，可换成 `nginxinc/nginx-unprivileged`，端口仍为 8080。

## 本地验证

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm build

# 使用与容器相同的静态服务器
PORT=8080 node server.mjs

# Docker
docker build --build-arg VITE_SITE_URL=https://paylume.vtransfer.io -t exio-paylume-fe:local .
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

`deploy_dev` 在 `main` 与 tag 上直接触发下游 Chart 流水线；需要提前在项目 CI 变量中
配置 `CHART_REPO_TRIGGER_TOKEN`，否则该任务会失败。

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
4. 在 cloud DNS 仓库添加 `paylume.vtransfer.io` 的 CNAME（沿用现有 ALB/CertId），
   并确认 ALB ACL。
5. 在 GitLab 项目变量中配置 `CHART_REPO_TRIGGER_TOKEN`；确认 `VITE_SITE_URL`
   为最终域名。

上线检查清单：

- MR 上 `frontend-validate` 通过（lint、typecheck、build）。
- `main` 镜像推送成功，`image.env` 中 `DEPLOY_IMAGE_REF` 含合法 digest。
- 下游 Chart 流水线成功，Argo 状态 `Synced / Healthy`。
- 公网 `https://<host>/`、`/healthz` 返回 200；HTML、JS、CSS 缓存头符合预期。
- 中英文切换、移动端菜单、锚点导航在线上环境复查。

## 回滚

Chart 侧通过历史镜像 digest 更新 GitOps 版本即可回退；静态站点无状态、无持久卷，
回滚不涉及数据迁移。DNS、证书由 cloud 仓库与 ALB 统一管理。
