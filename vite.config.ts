import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/task-management/', // Replace with your repository name
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    sourcemap: true,
  },
})
