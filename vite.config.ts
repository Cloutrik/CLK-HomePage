import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];

export default defineConfig({
  base: process.env.GITHUB_ACTIONS && repositoryName ? `/${repositoryName}/` : "/",
  define: {
    global: "globalThis"
  },
  plugins: [react()],
  resolve: {
    alias: {
      "react-native": "react-native-web"
    },
    extensions: [".web.tsx", ".web.ts", ".tsx", ".ts", ".jsx", ".js"]
  }
});
