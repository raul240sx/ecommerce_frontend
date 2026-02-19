import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    allowedHosts: [
      'guitarzone.cl',
      'localhost'
    ],
    hmr: {
      clientPort: 443, // Necesario para que el Hot Reload funcione sobre HTTPS de Cloudflare
    },
    watch: {
      usePolling: true,
    },
  },
})