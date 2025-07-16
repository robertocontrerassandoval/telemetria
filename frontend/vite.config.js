import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // o vue si usas Vue

export default defineConfig({
  plugins: [react()],
  base: '/', // importante para Render u otros hosts
})