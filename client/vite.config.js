import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server : {
      host:true,
      port: 3000,
      proxy: {
        "/api" : {
          target: "http://http://amadoudrame.ide.3wa.io:9000",
          changeOrigin: true
        }
      }
  }
})
