#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, "../src/blog");

// 默认前置数据
const DEFAULT_FRONTMATTER = {
  title: "",
  pubDate: new Date().toISOString().split("T")[0],
  description: "",
  author: "海川",
  image: {
    url: "",
    alt: "",
  },
  tags: [""],
};

function formatFrontmatter(data) {
  return `---
title: "${data.title}"
pubDate: ${data.pubDate}
description: "${data.description}"
author: "${data.author}"
image:
  url: "${data.image.url}"
  alt: "${data.image.alt}"
tags: [${data.tags.map((tag) => `"${tag}"`).join(", ")}]
---`;
}

/**
 * 跨平台打开文件
 */
async function openFile(filePath) {
  try {
    const platform = process.platform;
    let command;

    if (platform === "win32") {
      // Windows
      command = `start "" "${filePath}"`;
    } else if (platform === "darwin") {
      // macOS
      command = `open "${filePath}"`;
    } else {
      // Linux 和其他
      command = `xdg-open "${filePath}"`;
    }

    await execAsync(command);
    console.log(`🔓 正在打开文档...`);
  } catch (error) {
    // 打开失败不影响脚本成功
    console.warn(`⚠️  无法自动打开文件，请手动打开: ${filePath}`);
  }
}

async function createBlogItem(itemName, options = {}) {
  const isDirectory = itemName.endsWith("/");

  // 移除末尾的 /
  const cleanName = itemName.replace(/\/$/, "");

  if (!cleanName) {
    console.error("❌ 错误：项目名不能为空");
    process.exit(1);
  }

  const itemPath = path.join(BLOG_DIR, cleanName);
  const itemDir = isDirectory ? itemPath : path.dirname(itemPath);

  try {
    // 创建目录
    if (!fs.existsSync(itemDir)) {
      fs.mkdirSync(itemDir, { recursive: true });
      console.log(`📁 创建目录: ${itemDir}`);
    }

    if (isDirectory) {
      console.log(`✅ 目录已创建: ${cleanName}/`);
    } else {
      // 创建文档
      const filename = path.basename(cleanName);
      const filePath = itemPath.endsWith(".md") ? itemPath : `${itemPath}.md`;

      // 检查文件是否已存在
      if (fs.existsSync(filePath)) {
        console.error(`❌ 错误：文件已存在 ${filePath}`);
        process.exit(1);
      }

      // 准备前置数据
      const frontmatter = {
        ...DEFAULT_FRONTMATTER,
        title: options.title || filename.replace(/-/g, " "),
        description: options.description || "",
        tags: options.tags || DEFAULT_FRONTMATTER.tags,
      };

      // 生成前置数据
      const content = `${formatFrontmatter(frontmatter)}`;

      // 写入文件
      fs.writeFileSync(filePath, content, "utf8");
      console.log(`✅ 文档已创建: ${path.relative(BLOG_DIR, filePath)}`);
      console.log(`   位置: ${filePath}`);

      // 自动打开文件
      await openFile(filePath);
    }
  } catch (error) {
    console.error(`❌ 错误: ${error.message}`);
    process.exit(1);
  }
}

// 命令行参数处理
const args = process.argv.slice(2);

// 显示帮助信息函数
function showHelp() {
  console.log(`
📖 博客项目创建工具

用法:
  npm run blog:create <name>        创建文档 (例: npm run blog:create Day-01-HTML)
  npm run blog:create <name>/       创建目录 (例: npm run blog:create HTML/)
  
选项:
  --title <title>                   自定义文档标题
  --description <desc>              自定义描述
  --tags <tag1,tag2>               自定义标签 (逗号分隔)
  --help, -h                        显示此帮助信息

例子:
  npm run blog:create Day-01-HTML
  npm run blog:create HTML/
  npm run blog:create Day-01 --title "HTML 基础" --tags "HTML,前端"
  `);
  process.exit(0);
}

// 检查是否需要显示帮助
if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
  showHelp();
}

const itemName = args[0];

// 解析选项
const options = {};
for (let i = 1; i < args.length; i += 2) {
  const key = args[i].replace("--", "");
  const value = args[i + 1];

  if (key === "tags") {
    options.tags = value.split(",").map((t) => t.trim());
  } else if (key === "title") {
    options.title = value;
  } else if (key === "description") {
    options.description = value;
  }
}

(async () => {
  await createBlogItem(itemName, options);
})();
