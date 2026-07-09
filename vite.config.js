import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { extname, join, resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Sert le blog statique en mode dev (npm run dev → http://localhost:5173/blog/).
 * En prod le blog est généré dans dist/ par scripts/build-blog.mjs ; en dev ce
 * plugin le régénère à chaque page consultée (≈100 ms) pour refléter
 * immédiatement les modifications de content/blog/*.mjs.
 */
function blogDev() {
  return {
    name: 'blog-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = (req.url || '').split('?')[0]
        if (url !== '/blog' && !url.startsWith('/blog/')) return next()
        try {
          execFileSync('node', ['scripts/build-blog.mjs'], { cwd: __dirname })
        } catch (e) {
          res.statusCode = 500
          res.end(`Erreur de génération du blog : ${e.message}`)
          return
        }
        let file = join(__dirname, 'dist', url)
        if (!extname(file)) file = join(file, 'index.html')
        if (!existsSync(file)) return next()
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(readFileSync(file))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), blogDev()],
  build: {
    target: 'es2018',
    cssCodeSplit: true,
    minify: 'esbuild',
    sourcemap: false,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      // Deux pages statiques : l'accueil et /kingdomads/ (meta et canonical dédiés).
      input: {
        main: resolve(__dirname, 'index.html'),
        kingdomads: resolve(__dirname, 'kingdomads/index.html'),
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) return 'react-vendor'
            return 'vendor'
          }
        },
      },
    },
  },
})
