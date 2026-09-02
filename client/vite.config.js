import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      "/products": "http://localhost:3001",
      "/cart": "http://localhost:3001",
      "/wishlist": "http://localhost:3001",
    },
  },
  test: {

    globals: true,
    
    environment: "jsdom",
    
    setupFiles: ['./src/__tests__/setup.js']
    
    },
})
