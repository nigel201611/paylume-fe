import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, resolve } from 'node:path'
import { gzipSync } from 'node:zlib'

const root = resolve(process.env.STATIC_ROOT || 'dist')
const port = Number(process.env.PORT || 8080)
const host = process.env.HOST || '0.0.0.0'

const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
}

const COMPRESSIBLE = new Set(['.css', '.html', '.js', '.json', '.svg', '.txt'])
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
}

async function resolveFile(pathname) {
  let decoded
  try {
    decoded = decodeURIComponent(pathname)
  } catch {
    return null
  }

  const filePath = resolve(root, `.${decoded}`)
  if (filePath !== root && !filePath.startsWith(`${root}/`)) return null

  try {
    const info = await stat(filePath)
    const finalPath = info.isDirectory() ? resolve(filePath, 'index.html') : filePath
    const finalInfo = await stat(finalPath)
    return finalInfo.isFile() ? finalPath : null
  } catch {
    return null
  }
}

const server = createServer(async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { Allow: 'GET, HEAD', ...SECURITY_HEADERS })
    res.end('Method Not Allowed')
    return
  }

  let pathname
  try {
    pathname = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`).pathname
  } catch {
    res.writeHead(400, SECURITY_HEADERS)
    res.end('Bad Request')
    return
  }

  if (pathname === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...SECURITY_HEADERS })
    res.end('{"status":"ok"}')
    return
  }

  if (pathname.endsWith('/')) pathname += 'index.html'

  let filePath = await resolveFile(pathname)
  if (!filePath && !extname(pathname)) {
    // SPA fallback for clean URLs; asset-like paths keep their 404.
    filePath = await resolveFile('/index.html')
  }

  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS })
    res.end('Not Found')
    return
  }

  const ext = extname(filePath)
  const isHashedAsset = filePath.includes('/assets/')
  const cacheControl = isHashedAsset
    ? 'public, max-age=31536000, immutable'
    : ext === '.html'
      ? 'no-cache'
      : 'public, max-age=3600'

  try {
    const file = await readFile(filePath)
    const acceptsGzip = (req.headers['accept-encoding'] || '').includes('gzip')
    const compress = acceptsGzip && COMPRESSIBLE.has(ext)
    const body = compress ? gzipSync(file) : file

    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Content-Length': body.length,
      'Cache-Control': cacheControl,
      ...(compress ? { 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' } : null),
      ...SECURITY_HEADERS,
    })
    res.end(req.method === 'HEAD' ? undefined : body)
  } catch {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8', ...SECURITY_HEADERS })
    res.end('Internal Server Error')
  }
})

server.listen(port, host, () => {
  console.log(`PAYLUME site listening on http://${host}:${port} (root: ${root})`)
})

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => server.close(() => process.exit(0)))
}
