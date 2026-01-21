---
title: "内容网站神器：Astro"
pubDate: 2026-01-21
description: "快速搭建内容驱动型网站"
layout: ../../layouts/MdPostLayout.astro
author: "海川"
image:
  url: "https://docs.astro.build/assets/rose.webp"
  alt: "The Astro logo on a dark background with a pink glow."
tags: ["astro", "blogging", "learning in public"]
---

## 简介

Astro是一个Web框架，用它可以快速搭建一个内容驱动型网站，比如个人博客。再加上AI、Github和Netlify，基本上不怎么费劲就可以让一个全新网站发布上线，你需要考虑的只有网站设计和内容安排。
Astro使我们可以用Markdown编写内容，并使用CSS和JS来美化页面、添加交互。语法一眼望去就是HTML，还有点像JSX，对React开发者来说简直一眼就会。

## 开发环境

- Node.js：最低支持版本为：`v18.20.8`、`v20.3.0` 和 `v22.0.0`。（注意：`v19` 和 `v21` 版本不受支持。）
- 创建新项目：`pnpm create astro@latest`
- 运行项目：`pnpm run dev`
- 部署项目：提交到Github，然后在Netlify中轻松部署

## 页面

- 单个页面：`src/pages`目录中一个`.astro`文件就是一个页面
- 文章：在`src/pages`目录中用`.md`文件来编写文章
- 页内样式：使用`<style>`标签
- 全局样式：通过import全局样式文件`.css`来加载样式代码
- frontmatter：在文件顶部写入的JS脚本，编译时运行
- 脚本：在`<script>`标签中编写脚本，也可以导入`.js`文件
- 页面路由规则与Next.js中一样，`pages`目录下的文件均可以通过路径访问，比如/blog就是/pages/blog.astro，动态路由也是一样

## 组件

- 位置：放在 `src/components` 中
- 单个组件：一个组件就是一个`.astro`文件
- 内容：没有`<head>、<body>`标签
- Props：用JSX语法传递props，通过`Astro.props`接收props

## 布局

- 布局组件：编写通用的布局结构，形成一个组件
- slot：在组件中使用时可以渲染插入的内容
- Markdown内容布局：
  1. 创建一个布局组件，可以导入一些主题样式代码
  2. 在`.md`文件的frontmatter中添加layout配置，选择布局组件即可

## API

- 读取本地文章：`Object.values(import.meta.glob('./posts/*.md', { eager: true }))`
- 动态路由：需要向外界导出`getStaticPaths`方法，该方法返回一个支持的路由配置数组，数组的每一项中都包含params和props

```js
export async function getStaticPaths() {
  const allPosts = Object.values(
    import.meta.glob("../posts/*.md", { eager: true }),
  );

  return [
    { params: { tag: "astro" }, props: { posts: allPosts } },
    { params: { tag: "successes" }, props: { posts: allPosts } },
    { params: { tag: "community" }, props: { posts: allPosts } },
    { params: { tag: "blogging" }, props: { posts: allPosts } },
    { params: { tag: "setbacks" }, props: { posts: allPosts } },
    { params: { tag: "learning in public" }, props: { posts: allPosts } },
  ];
}
```
