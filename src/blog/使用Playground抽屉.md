---
title: "使用Playground抽屉的方法"
pubDate: 2026-01-25T10:00:00+08:00
description: "如何在markdown文档中添加打开代码练兵场的链接"
author: "海川"
image:
  url: ""
  alt: ""
tags: ["教程", "使用指南"]
---

## 在markdown中添加练习链接

现在你可以在任何markdown文档中添加一个链接，点击后会在右侧弹出代码练兵场抽屉。

### 方法1：使用HTML链接

在markdown中直接添加HTML链接，使用JavaScript的`onclick`事件：

```html
<a href="javascript:void(0)" onclick="window.openPlaygroundDrawer()"
  >练习一下</a
>
```

### 方法2：使用自定义组件

更推荐的方法是创建一个可复用的组件。但目前可以直接使用上面的HTML方式。

## 效果说明

- 点击链接后，右侧会滑出一个抽屉
- 抽屉包含完整的Monaco编辑器，支持HTML、CSS、JavaScript编写
- 所有代码会自动保存到`localStorage`中
- 点击关闭按钮、点击左侧半透明区域或按ESC键都可关闭抽屉

## 使用示例

### 在你的Grid布局文档中

在案例代码块之后添加：

```markdown
### 实际应用

前面学了这个案例，现在可以 <a href="javascript:void(0)" onclick="window.openPlaygroundDrawer()">练习一下</a> 吧！
```

### 在你的Flex布局文档中

```markdown
## 练兵场

想要快速验证你的Flex布局想法吗？<a href="javascript:void(0)" onclick="window.openPlaygroundDrawer()">点击这里打开编辑器</a>
```

## 小贴士

1. **抽屉编辑器独立存储** - 不同页面的练习代码互不影响，都存储在 `localStorage` 中
2. **响应式设计** - 在手机端会自动调整为全屏模式
3. **主题切换** - 可以在编辑器中切换Light、Dark、High Contrast三种主题
4. **快速下载** - 可以随时下载代码为HTML文件

---

现在开始在你的文档中添加这个功能吧！😎
