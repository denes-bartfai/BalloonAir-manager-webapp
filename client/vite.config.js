import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      port: 5173,
      strictPort: true,
      proxy: {
        '/api': {
          target: 'http://localhost:5269',
          changeOrigin: true,
          secure: false, 
          withCredentials: true,
        },
      },
    },
  };
});