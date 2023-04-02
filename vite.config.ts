/// <reference types="vitest" />
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": new URL("./src/components", import.meta.url).pathname,
      "@layout": new URL("./src/layout", import.meta.url).pathname,
      "@animations": new URL("./src/animations", import.meta.url).pathname,
      "@services": new URL("./src/services", import.meta.url).pathname,
      "@hooks": new URL("./src/hooks", import.meta.url).pathname,
      "@constants": new URL("./src/constants", import.meta.url).pathname,
      "@internal-types": new URL("./src/types", import.meta.url).pathname,
      "@utils": new URL("./src/utils", import.meta.url).pathname,
    },
  },
  test: {
    environment: "happy-dom",
  },
});
