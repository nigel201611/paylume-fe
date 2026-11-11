# exio-paylume-fe

PAYLUME INC. 企业官网。基于 **Vite + React 19 + TypeScript + Tailwind CSS 4**，
动效组件来自 [React Bits](https://reactbits.dev)，支持中英文切换。

## 技术栈

- React 19 / Vite 8 / TypeScript
- Tailwind CSS 4（`@tailwindcss/vite`）
- React Bits：SplitText、BlurText、SpotlightCard、ShapeGrid、StarBorder、CountUp、Magnet、ClickSpark、Noise、FadeContent、GradientText
- GSAP / Motion 驱动动画，尊重 `prefers-reduced-motion`
- 字体：Geist / Geist Mono（界面）+ Manrope（标题）+ Archivo Black（字标），通过 `@fontsource` 本地自托管；中文回退系统字体

## 本地开发

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # typecheck + 生产构建，输出 dist/
pnpm preview    # 预览构建产物
pnpm lint       # oxlint
pnpm typecheck  # tsc -b
```

## 国际化

- 文案集中在 `src/i18n/messages.ts`，`en` / `zh` 两种语言共享同一个 `Messages` 类型。
- `src/i18n/locale-provider.tsx` 负责语言状态、`localStorage` 持久化（`paylume-locale`）、
  `<html lang>`、页面标题与 description。
- 首次访问按浏览器语言选择中文或英文；语言切换器位于顶部导航右侧（移动端为旗帜图标）。
- 新增文案时同时补齐 `en` 与 `zh`，否则 TypeScript 会报错。
- 中文标题使用显式分行数组控制版式；中文展示标题字号在 `src/index.css` 中单独收紧。

## 目录结构

```
src/
  components/            页面区块与语言切换
  components/reactbits/  从 React Bits 注册表引入的组件
  i18n/                  messages + locale provider
  index.css              Tailwind 主题、基础样式与中文排版
```

## 部署

- 静态站点镜像：`Dockerfile` 多阶段构建，运行阶段使用 nginx（`nginx.conf`）托管 `dist`，
  默认端口 `8080`，健康检查 `/healthz`；Node 仅用于构建阶段。
  如 CI 无法访问 Docker Hub，可将 nginx 镜像同步到 ACR 并通过 `--build-arg NGINX_IMAGE=...` 覆盖。
- GitLab CI：`.gitlab-ci.yml`，复用 `exio-frontend-ci` 共享模板；`main` 与 tag 构建并推送
  镜像到 `payfi-dev`，随后触发下游 Chart 仓库发布 dev。
- CI/CD 流水线与产物说明见 [docs/cicd.md](docs/cicd.md)；
- 详细变量、Chart 参数、首次接入与回滚步骤见 [docs/deployment.md](docs/deployment.md)。

本地以容器方式验证：

```bash
pnpm build
PORT=8080 node server.mjs
# 或
docker build --build-arg VITE_SITE_URL=https://paylume.vtransfer.io -t exio-paylume-fe:local .
docker run --rm -p 8080:8080 exio-paylume-fe:local
```

## 内容来源

页面文案与结构基于原静态页 `docs/官网.html`，已完整迁移为 React 组件并补齐中文翻译；
原文件在迁移完成后删除。
