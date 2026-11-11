# PAYLUME Frontend CI/CD

## 交付目录与目标

- 前端 CI：`.gitlab-ci.yml`，复用 PayFi 前端共享模板，固定模板版本
  `311d90438d4038ff2eafeb8349a72fe0e960cfb0`。
- 容器镜像：`Dockerfile` 多阶段构建。构建阶段使用固定版本的 node-builder，运行阶段为
  `nginx:alpine` + `nginx.conf`，镜像内不包含 Node。
- CD Chart：`exiogroup/exio-devops/exio-paylume-fe-chart`；前端流水线只负责触发，
  不直接操作集群。
- 目标环境：dev（`vara-dev / payfi`），单 Pod 的静态站点。
- 地址：`https://paylume.vtransfer.io`，TLS 在 ALB 终止。

## CI 行为

MR、`main`、tag 均执行 `frontend-validate`：安装锁定依赖、lint、typecheck、Vite 构建。

`main` 与 tag 校验通过后，Kaniko 构建并推送镜像到
`${ACR_REGISTRY}/payfi-dev/exio-paylume-fe:<tag>`；`image-digest.txt` 与 dotenv artifact
传递 `DEPLOY_IMAGE_REF=<tag>@sha256:<digest>`。

`deploy_dev` 把 `SERVICES=exio-paylume-fe,<tag>@sha256:<digest>` 发给 Chart 仓库触发发布。
共享模板继承的 UAT / Prod job 已禁用。

`VITE_SITE_URL=https://paylume.vtransfer.io` 在校验构建和 Docker build arg 两处生效，
用于生成 `canonical` 与 `og:url`；运行期修改变量不能改写浏览器包。

镜像阶段：

| 阶段 | 内容 |
| --- | --- |
| `deps` | `pnpm install --frozen-lockfile` |
| `builder` | `tsc -b && vite build` → `dist/` |
| `runner` | `nginx:alpine` + `nginx.conf` + `dist/` |

运行时监听 `8080`，健康检查 `GET /healthz`。

## 构建产物与缓存

- `dist/` 约 788 KB；字体为自托管 Latin 子集 woff2（4 个文件，约 96 KB）。
- JS 按 react / motion / gsap / vendor / app 分包，首屏预加载公共 chunk。
- About / Capabilities / Approach / Solutions / UseCases / Contact 拆成独立 chunk，
  进入视口或点击导航时按需加载。
- nginx 对 `/assets/*` 设置一年缓存，`index.html` 为 `no-cache`，文本资源启用 gzip。

## CD 行为

`deploy_dev` 触发下游 Chart 仓库流水线，Chart 侧负责生成 values、lint / render、
提交 dev 版本并请求 Argo 同步。两个仓库均使用 resource group 串行处理 dev 发布。

作业成功仅表示同步已请求，不代表 Pod 已 `Healthy`。回滚通过历史镜像 digest 更新 Chart
完成；静态站点无状态，不涉及数据迁移。

## 首次接入与配置

1. 创建 Chart 仓库 `exiogroup/exio-devops/exio-paylume-fe-chart`，并配置
   `CHART_REPO_PROJECT_ID`、`CHART_REPO_SERVICE_NAME`。
2. Chart 为 `exio-paylume-fe` 部署一个容器：端口 `8080`，探针 `GET /healthz`，
   单副本，无持久卷。
3. 在 GitLab 项目变量中配置 `ACR_REGISTRY` / `ACR_USER` / `ACR_PASSWORD` 和
   `CHART_REPO_TRIGGER_TOKEN`（masked）。
4. 在 cloud DNS 仓库添加 `paylume.vtransfer.io` 的 CNAME（沿用现有 ALB / CertId），
   并确认 ALB ACL。
5. 确认 `VITE_SITE_URL` 为最终域名。

## GitHub Pages（可选）

除 GitLab + Helm 的主发布链路外，站点也可以发布到 GitHub Pages：

- 远程：`github` → `git@github.com:nigel201611/paylume-fe.git`
- 工作流：`.github/workflows/pages.yml`，push `main` 或手动触发
- 地址：`https://nigel201611.github.io/paylume-fe/`
- 构建变量：`VITE_BASE=/paylume-fe/`（项目页路径）、
  `VITE_SITE_URL=https://nigel201611.github.io/paylume-fe`
- 首次使用需在 GitHub 仓库 Settings → Pages 中把 Source 设为 **GitHub Actions**
- 若绑定自定义域名，将 `VITE_BASE` 改为 `/`，并同步修改 `VITE_SITE_URL`
- 站点只用锚点导航，无客户端路由，因此不需要 404 fallback；构建时写入 `.nojekyll`

GitLab 流水线不受影响：未设置 `VITE_BASE` 时构建仍使用根路径 `/`。

## 验证记录

- 本地：`pnpm typecheck`、`pnpm lint`、`pnpm build` 通过，`dist/` 788 KB。
- 本地 Docker（公共 `node:22-alpine` 构建 + `nginx:1.27-alpine` 运行，临时验证用）：
  镜像 77.1 MB；`/`、`/healthz`、gzip、缓存头、SPA fallback、favicon 均符合预期。
- CI：待首次流水线验证。构建阶段需要能访问 `nginx:alpine`；如 CI 无法访问 Docker Hub，
  需将镜像同步到 ACR 并调整 `Dockerfile` 的 `FROM`。

## 回滚

Chart 侧通过历史镜像 digest 更新 GitOps 版本回退。静态站点无状态、无持久卷，
回滚不涉及数据迁移；DNS 与证书由 cloud 仓库和 ALB 统一管理。
