import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './', // Changed from '/sugar-cut/' for local development
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})