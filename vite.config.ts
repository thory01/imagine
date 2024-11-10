import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base URL to "/imagine/" by default, or "" if explicitly set to "false"
  base: process.env.VITE_DEPLOY_TO_SUBDIRECTORY === "false" ? "" : "/imagine/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
