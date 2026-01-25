// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // GitHub Pages 配置（将 YOUR_USERNAME 替换为你的 GitHub 用户名，YOUR_REPO 替换为仓库名）
  // 如果是用户或组织页面，使用: https://YOUR_USERNAME.github.io/
  // 如果是项目页面，使用: https://YOUR_USERNAME.github.io/YOUR_REPO/
  site: "https://BarneyRoos.github.io/MyTechStack/",

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()],
    build: {
      rollupOptions: {
        external: ["tailwindcss"],
      },
    },
  },
});
