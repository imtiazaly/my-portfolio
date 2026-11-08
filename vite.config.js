// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import adminApiPlugin from "./vite-plugin-admin.js";

export default defineConfig({
  plugins: [react(), adminApiPlugin()],
  base: "./", // Important for relative paths on Netlify
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        // Change object to function
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom")
            ) {
              return "vendor";
            }
            if (id.includes("framer-motion")) {
              return "animations";
            }
            return "vendor";
          }
        },
        // 🔥 YEH LINE ADD KAREIN (MIME type issue fix)
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
});