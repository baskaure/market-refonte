import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2018',
    cssCodeSplit: true,
    minify: 'esbuild',
    sourcemap: false,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('scheduler')) return 'react-vendor'
            if (id.includes('motion')) return 'motion'
            if (id.includes('ogl')) return 'ogl'
            if (id.includes('mathjs')) return 'mathjs'
            return 'vendor'
          }
        },
      },
    },
  },
})
