import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/",
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
