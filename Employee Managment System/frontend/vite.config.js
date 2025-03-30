import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    mimeTypes: {
      'application/javascript': ['js'],
      'application/json': ['json'],
      'text/javascript': ['mjs']
    }
  }
})
