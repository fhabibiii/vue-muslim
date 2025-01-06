import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/wilayah-api': {
        target: 'https://wilayah.id/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/wilayah-api/, '')
      }
    }
  }
})