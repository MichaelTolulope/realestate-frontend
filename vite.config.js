import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: true, // Only allow access to the frontend directory
    },
  },
  optimizeDeps: {
    exclude: ['../backend'], // Prevent backend files from being processed
  },
   build: {
    rollupOptions: {
      external: ['recharts'], // Externalize recharts if absolutely necessary
    },
  },
})
