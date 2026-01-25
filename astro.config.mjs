// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // GitHub Pages 配置
  // site 用于生成正确的 sitemap 和规范 URL
  site: "https://BarneyRoos.github.io/MyBlog/",

  // base 用于设置应用的根路径（因为部署在子目录）
  base: "/MyBlog/",

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
