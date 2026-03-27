import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // leitet alle /github-anfragen an den express server weiter, damit kein CORS problem entsteht
    proxy: {
      '/github': 'http://localhost:3000'
    }
  }
})