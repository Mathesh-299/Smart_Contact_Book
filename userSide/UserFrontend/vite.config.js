import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true // Fixes local dev refresh issue
  },
  build: {
    outDir: 'dist' // Ensure correct Vercel output
  }
})
