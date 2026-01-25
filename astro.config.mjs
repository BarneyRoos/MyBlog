// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // 自定义域名配置
  site: "https://peikang.top/",

  // 使用根路径（因为现在用自定义域名）
  base: "/",

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["monaco-editor"],
    },
    build: {
      rollupOptions: {
        external: ["tailwindcss"],
        output: {
          manualChunks: {
            "monaco-editor": ["monaco-editor"],
          },
        },
      },
    },
  },
});
