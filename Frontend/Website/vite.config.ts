import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//     plugins: [react()],
//     server: {host:true, open: true }
// })


export default defineConfig({
  server: {
    proxy: {
      "/api": "http://localhost:4003",
      "/images": "http://localhost:4003"
    }
  }
});
