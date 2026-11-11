import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

function siteMeta(siteUrl: string): Plugin {
  return {
    name: 'paylume-site-meta',
    transformIndexHtml(html) {
      if (!siteUrl) return html

      const tags = [
        `<link rel="canonical" href="${siteUrl}/" />`,
        `<meta property="og:url" content="${siteUrl}/" />`,
      ].join('\n    ')

      return html.replace('<!-- site-meta -->', tags)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(() => {
  const siteUrl = (process.env.VITE_SITE_URL || '').replace(/\/+$/, '')

  return {
    plugins: [react(), tailwindcss(), siteMeta(siteUrl)],
    build: {
      rolldownOptions: {
        output: {
          codeSplitting: {
            groups: [
              { name: 'react', test: /node_modules\/(?:react|react-dom|scheduler)\// },
              { name: 'gsap', test: /node_modules\/(?:gsap|@gsap)\// },
              { name: 'motion', test: /node_modules\/motion\// },
              { name: 'vendor', test: /node_modules\// },
            ],
          },
        },
      },
    },
  }
})
