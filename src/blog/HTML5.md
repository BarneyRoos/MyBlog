---
title: "HTML5"
pubDate: 2026-01-22
description: "俯瞰HTML5"
author: "海川"
image:
  url: ""
  alt: ""
tags: ["HTML"]
---

## 一、HTML5 基础概念

### 1. 什么是 HTML？

- HyperText Markup Language，超文本标记语言
- 它定义了网页内容元素应该长什么样，与CSS和JS配合实现页面样式和交互。

### 2. 什么是 HTML5？

- HTML5是HTML标准的最新版本
- 引入了语义化标签、丰富的表单控件、多媒体支持、离线存储、Canvas绘画等新特性

### 3. 什么是H5？

通常是HTML5的简称，有时也泛指基于HTML5开发的**移动端**网页或Web应用。

### 3. DOCTYPE 声明

```html
<!DOCTYPE html>
```

- HTML5统一使用 `<!DOCTYPE html>`
- 不区分大小写，写 `<!doctype html>` 也可以

## 二、语义化标签（重要面试题）

### 核心语义标签

| 标签        | 用途          | 场景               |
| ----------- | ------------- | ------------------ |
| `<header>`  | 页面/区域头部 | 导航栏、标题等     |
| `<nav>`     | 导航菜单      | 主菜单、分类导航   |
| `<main>`    | 主要内容      | 页面核心内容区域   |
| `<article>` | 独立内容      | 博客文章、新闻     |
| `<section>` | 内容区段      | 文章章节、功能模块 |
| `<aside>`   | 侧边栏        | 相关链接、广告     |
| `<footer>`  | 页脚          | 版权、联系方式     |

### 为什么使用语义标签？

- ✅ 提高代码可读性和可维护性
- ✅ 有利于SEO优化
- ✅ 提升无障碍可访问性（Accessibility）
- ✅ 便于搜索引擎爬虫理解页面结构

### 区别：section vs article vs div

```html
<!-- article: 独立的、完整的内容块（如博文） -->
<article>
  <h2>我的第一篇博客</h2>
  <p>内容...</p>
</article>

<!-- section: 相关内容的组织（如章节） -->
<section>
  <h2>第一章</h2>
  <p>内容...</p>
</section>

<!-- div: 无语义的通用容器 -->
<div class="wrapper">内容</div>
```

## 三、多媒体标签

### 音频标签 `<audio>`

```html
<audio controls width="300">
  <source src="music.mp3" type="audio/mpeg" />
  <source src="music.ogg" type="audio/ogg" />
  您的浏览器不支持音频播放
</audio>
```

**常用属性：**

- `controls` - 显示播放控件
- `autoplay` - 自动播放（某些浏览器限制）
- `loop` - 循环播放
- `muted` - 静音
- `preload` - 预加载（none/metadata/auto）

### 视频标签 `<video>`

```html
<video controls width="640" height="360" poster="poster.jpg">
  <source src="video.mp4" type="video/mp4" />
  <source src="video.webm" type="video/webm" />
  您的浏览器不支持视频播放
</video>
```

**常用属性：**

- `controls` - 显示控制条
- `autoplay` - 自动播放
- `muted` - 静音播放（autoplay结合使用）
- `loop` - 循环播放
- `poster` - 视频封面
- `preload` - 预加载模式

**面试要点：** 为什么需要 `<source>` 多标签？

- 不同浏览器支持不同格式，提供多个格式确保兼容性

## 四、表单增强

### 新增 input 类型

```html
<!-- 邮箱验证 -->
<input type="email" placeholder="请输入邮箱" />

<!-- 电话号码 -->
<input type="tel" placeholder="请输入电话" />

<!-- URL验证 -->
<input type="url" placeholder="请输入网址" />

<!-- 数字输入 -->
<input type="number" min="0" max="100" />

<!-- 颜色选择器 -->
<input type="color" />

<!-- 日期选择 -->
<input type="date" />
<input type="time" />
<input type="datetime-local" />

<!-- 范围滑块 -->
<input type="range" min="0" max="100" />

<!-- 搜索框 -->
<input type="search" placeholder="搜索..." />
```

### 表单属性增强

```html
<!-- placeholder: 占位符提示 -->
<input type="text" placeholder="输入用户名" />

<!-- required: 必填验证 -->
<input type="text" required />

<!-- pattern: 正则验证 -->
<input type="text" pattern="[0-9]{6}" title="请输入6位数字" />

<!-- novalidate: 禁用浏览器验证 -->
<form novalidate>
  <input type="email" />
</form>

<!-- autofocus: 自动获得焦点 -->
<input type="text" autofocus />
```

### datalist - 预定义选项列表

```html
<input type="text" list="browsers" />
<datalist id="browsers">
  <option value="Chrome"></option>
  <option value="Firefox"></option>
  <option value="Safari"></option>
</datalist>
```

## 五、Canvas 绘画

### 基础使用

```html
<canvas id="myCanvas" width="400" height="300"></canvas>

<script>
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d");

  // 绘制矩形
  ctx.fillStyle = "red";
  ctx.fillRect(10, 10, 100, 50);

  // 绘制圆形
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(200, 150, 50, 0, Math.PI * 2);
  ctx.fill();

  // 绘制线条
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(400, 300);
  ctx.stroke();
</script>
```

### Canvas vs SVG

| 特性     | Canvas           | SVG                |
| -------- | ---------------- | ------------------ |
| 绘制方式 | 栅格（像素）     | 矢量               |
| 放大效果 | 会失真           | 清晰无失真         |
| 事件     | 不支持元素事件   | 支持DOM事件        |
| 性能     | 大数据量优势     | 元素较多时较慢     |
| 用途     | 动画、游戏、图表 | 图标、线条图、演示 |

**面试要点：** Canvas绘制的内容不能被搜索引擎索引，需要提供文本备选方案

## 六、数据存储

### 1. localStorage（关键面试题）

```javascript
// 保存数据
localStorage.setItem("username", "Alice");
localStorage.setItem("config", JSON.stringify({ theme: "dark" }));

// 读取数据
const username = localStorage.getItem("username");
const config = JSON.parse(localStorage.getItem("config"));

// 删除数据
localStorage.removeItem("username");

// 清空所有
localStorage.clear();
```

**特点：**

- 永久存储，除非手动删除
- 同源策略限制（协议、域名、端口相同）
- 容量约5-10MB
- 同步操作，会阻塞DOM

### 2. sessionStorage

```javascript
sessionStorage.setItem("token", "abc123");
const token = sessionStorage.getItem("token");
```

**特点：**

- 临时存储，标签页关闭后删除
- 同源策略限制
- 每个标签页独立

### 3. IndexedDB（大数据存储）

```javascript
const request = indexedDB.open("MyDB", 1);

request.onsuccess = (event) => {
  const db = event.target.result;
  const transaction = db.transaction(["users"], "readwrite");
  const store = transaction.objectStore("users");
  store.add({ id: 1, name: "Alice" });
};
```

**特点：**

- 支持大容量（GB级别）
- 支持复杂查询
- 异步操作
- 支持事务

### localStorage vs sessionStorage vs IndexedDB

| 特性     | localStorage | sessionStorage | IndexedDB |
| -------- | ------------ | -------------- | --------- |
| 容量     | 5-10MB       | 5-10MB         | GB级      |
| 有效期   | 永久         | 标签页关闭     | 永久      |
| 操作方式 | 同步         | 同步           | 异步      |
| 查询能力 | 弱           | 弱             | 强        |

## 七、Geolocation API

### 获取用户位置

```javascript
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      console.log(`位置: ${lat}, ${lng}`);
    },
    (error) => {
      console.error("获取位置失败:", error.message);
    },
  );
}
```

**面试要点：**

- 需要用户授权
- 隐私敏感，需谨慎使用

## 八、Web Workers（多线程）

### 主线程

```javascript
// main.js
const worker = new Worker("worker.js");

// 发送消息给Worker
worker.postMessage({ num: 1000 });

// 接收Worker返回的数据
worker.onmessage = (event) => {
  console.log("计算结果:", event.data);
};
```

### Worker线程

```javascript
// worker.js
onmessage = (event) => {
  const result = expensiveCalculation(event.data.num);
  postMessage(result);
};

function expensiveCalculation(n) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  return sum;
}
```

**优势：**

- 不阻塞主线程
- 适合耗时计算
- 提升用户体验

## 九、属性和事件

### 常用属性

```html
<!-- data-* 自定义属性 -->
<div data-id="123" data-category="product">内容</div>

<script>
  const div = document.querySelector("div");
  console.log(div.dataset.id); // '123'
  console.log(div.dataset.category); // 'product'
</script>
```

### 常用事件

```javascript
// 页面加载完成
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM加载完成");
});

// 页面卸载
window.addEventListener("beforeunload", () => {
  console.log("页面即将关闭");
});

// 网络连接状态变化
window.addEventListener("online", () => console.log("网络连接"));
window.addEventListener("offline", () => console.log("网络断开"));

// 设备方向改变
window.addEventListener("orientationchange", () => {
  console.log("屏幕方向:", window.orientation);
});
```

## 十、其他重要特性

### 1. Fullscreen API（全屏）

```javascript
const element = document.querySelector("#video");
element.requestFullscreen();

document.exitFullscreen();
```

### 2. 拖拽 API

```html
<div draggable="true" ondragstart="handleDragStart(event)">拖拽我</div>

<div ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
  放在这里
</div>

<script>
  function handleDragStart(e) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", e.target.id);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    console.log("放下了:", id);
  }
</script>
```

### 3. Notification API

```javascript
// 请求权限
Notification.requestPermission().then((permission) => {
  if (permission === "granted") {
    new Notification("通知标题", {
      body: "这是通知内容",
      icon: "/icon.png",
    });
  }
});
```

### 4. Service Worker（离线缓存）

```javascript
// 在main.js中
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then((registration) => {
    console.log("Service Worker注册成功");
  });
}

// sw.js
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll(["/", "/index.html", "/styles.css"]);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
```

## 十一、面试常见问题速记

### Q1: 什么是HTML5？与HTML4的主要区别？

**A:** HTML5是最新的HTML标准，引入了语义化标签、多媒体、Canvas、Web Storage、Web Workers等新特性。主要包括新标签（`<header>`、`<article>`等）、多媒体标签（`<audio>`、`<video>`）、表单增强、以及浏览器API扩展。

### Q2: 为什么要使用语义化标签？

**A:** 三大好处：

1. 代码可读性强，易于维护
2. 利于SEO优化，搜索引擎更好理解页面结构
3. 提升无障碍访问性，屏幕阅读器能正确解读

### Q3: localStorage和sessionStorage的区别？

**A:**

- **有效期**：localStorage永久存储；sessionStorage在标签页关闭时删除
- **作用域**：都遵循同源策略
- **容量**：都是5-10MB
- **用途**：localStorage存用户偏好、登态；sessionStorage存临时数据

### Q4: Canvas和SVG如何选择？

**A:**

- **Canvas**：适合动画、游戏、频繁变化的内容
- **SVG**：适合图标、线条图、缩放不失真的场景

### Q5: 如何实现离线访问？

**A:** 使用Service Worker拦截网络请求，结合Cache API缓存资源。用户首次访问时缓存文件，离线时返回缓存版本。

### Q6: 什么是Web Worker？

**A:** 在后台线程执行JavaScript，不阻塞主线程。适用于复杂计算、数据处理。通过`postMessage`与主线程通信。

## 总结

HTML5的学习路径：

1. **基础**：掌握新语义标签的用途
2. **多媒体**：理解音视频标签和格式兼容性
3. **表单**：了解新input类型和验证
4. **API**：Storage、Geolocation、Web Workers等
5. **高级**：Service Worker、Canvas、离线存储

**面试建议：**

- 理解为什么，不仅是怎样做
- 准备实际代码示例
- 了解浏览器兼容性问题
- 关注性能和用户体验

---

祝你面试顺利！💪
