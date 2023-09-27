import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/api": path.resolve(__dirname, "./src/api"),
      "@/store": path.resolve(__dirname, "./src/store"),
      "@/assets": path.resolve(__dirname, "./src/assets"),
      "@/components": path.resolve(__dirname, "./src/components"),
      "@/constants": path.resolve(__dirname, "./src/constants"),
      "@/features": path.resolve(__dirname, "./src/features"),
      "@/layouts": path.resolve(__dirname, "./src/layouts"),
      "@/utils": path.resolve(__dirname, "./src/utils"),
    },
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
})
