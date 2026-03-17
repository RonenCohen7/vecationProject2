import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import obfuscator from "vite-plugin-javascript-obfuscator";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),

    mode === "production" &&
      obfuscator({
        options: {
          compact: true,
          controlFlowFlattening: false,
        },
      }),
  ].filter(Boolean),

  server: {
    host: true,
    proxy: {
      "/api": "http://localhost:4003",
      "/images": "http://localhost:4003"
    }
  }
}))