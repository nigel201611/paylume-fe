# syntax=docker/dockerfile:1

# Runtime is a static nginx image — the Node image is only used to build dist.
# If CI cannot reach Docker Hub, mirror nginx into ACR and override this build arg.
ARG NGINX_IMAGE=nginx:1.27-alpine

FROM exio-vara-registry-vpc.ap-southeast-1.cr.aliyuncs.com/devops/node-builder:22-trust-20261021-r2@sha256:d3f61e1adca60a24853afc05a8887702f340d63220fc03831a09f9218ad16fdc AS base

# npmmirror is the CI default; override for local builds when its CDN is slow:
#   --build-arg NPM_REGISTRY=https://registry.npmjs.org
ARG NPM_REGISTRY=https://registry.npmmirror.com

RUN npm install -g pnpm@10.12.1
WORKDIR /app

# Docker builds have no .git directory; skip Husky hook installation.
ENV HUSKY=0

# ─── Dependencies ─────────────────────────────────────────────────────────────
FROM base AS deps
COPY package.json pnpm-lock.yaml .npmrc ./
RUN npm_config_registry=$NPM_REGISTRY pnpm install --frozen-lockfile

# ─── Build ────────────────────────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

# Public site URL used for canonical and Open Graph tags. Vite inlines it at
# build time, so it must be supplied as a Docker build arg rather than runtime env.
ARG VITE_SITE_URL=
ENV VITE_SITE_URL=${VITE_SITE_URL}

RUN pnpm build

# ─── Runtime (static nginx, no Node) ──────────────────────────────────────────
FROM ${NGINX_IMAGE} AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -q -T 3 -O /dev/null http://127.0.0.1:8080/healthz || exit 1
