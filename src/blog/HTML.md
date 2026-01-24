---
title: "HTML"
pubDate: 2026-01-22T21:30:00+08:00
description: "HTML重要概念复习"
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
- 引入了语义化标签、丰富的表单控件、多媒体支持、离线存储、Canvas绘画、新的浏览器API等新特性

### 3. 什么是H5？

通常是HTML5的简称，有时也泛指基于HTML5开发的**移动端**网页或Web应用。

### 4. DOCTYPE 声明

- 文档类型声明，也就是当前文档采用哪种HTML标准，必须写在第一行
- 确保网页在各浏览器中显示一致
- HTML5中统一使用`<!DOCTYPE html>`（不区分大小写），让浏览器以**标准模式**渲染

## 二、语义化标签

### 1. 核心语义标签

| 标签        | 用途          | 场景               |
| ----------- | ------------- | ------------------ |
| `<header>`  | 页面/区域头部 | 导航栏、标题等     |
| `<nav>`     | 导航菜单      | 主菜单、分类导航   |
| `<main>`    | 主要内容      | 页面核心内容区域   |
| `<article>` | 独立内容      | 博客文章、新闻     |
| `<section>` | 内容区段      | 文章章节、功能模块 |
| `<aside>`   | 侧边栏        | 相关链接、广告     |
| `<footer>`  | 页脚          | 版权、联系方式     |

### 2. 为什么使用语义标签？

可读性、SEO、无障碍、爬虫

- ✅ 提高代码可读性和可维护性
- ✅ 有利于SEO优化
- ✅ 提升无障碍可访问性（Accessibility）
- ✅ 便于搜索引擎爬虫理解页面结构

### 3. section、article、div的区别

- section：划分页面逻辑结构，比如产品、合作伙伴、新闻
- article：表示一段完整、独立的内容块，比如一篇文章
- div：无意义容器，用于布局或样式

### 4. 更多语义标签

| 标签           | 用途                   | 场景                 |
| -------------- | ---------------------- | -------------------- |
| `<figure>`     | 包含插图或其他说明     | 图表、照片、代码示例 |
| `<figcaption>` | figure的标题或说明文本 | 图表说明、引用来源   |
| `<time>`       | 时间或日期标记         | 文章发布时间、事件   |
| `<mark>`       | 高亮或标记文本         | 搜索结果高亮         |
| `<details>`    | 可折叠的详细信息容器   | FAQ、代码示例        |
| `<summary>`    | details的标题          | 点击展开/收起        |
| `<output>`     | 计算结果输出           | 表单计算结果         |

## 三、多媒体标签

### 1. video 和 audio 基础

- video、audio是HTML5的原生多媒体标签
- 为什么使用多个source标签：提供多个格式，兼容各种浏览器

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.ogg" type="video/ogg" />
  您的浏览器不支持 HTML5 video 标签
</video>
```

### 2. 常用方法和属性

| 方法/属性      | 说明                                   |
| -------------- | -------------------------------------- |
| `play()`       | 播放                                   |
| `pause()`      | 暂停                                   |
| `currentTime`  | 当前播放时间（秒）                     |
| `duration`     | 总时长（秒）                           |
| `volume`       | 音量（0-1）                            |
| `muted`        | 是否静音                               |
| `playbackRate` | 播放速度（1为正常，0.5为50%，2为200%） |

### 3. 常用事件

- `play`：播放开始
- `pause`：暂停
- `playing`：正在播放
- `ended`：播放结束
- `timeupdate`：当前播放时间改变
- `loadstart`：开始加载
- `progress`：加载中
- `canplay`：可以开始播放

```javascript
const video = document.querySelector("video");

video.addEventListener("timeupdate", () => {
  console.log(`当前时间: ${video.currentTime}秒`);
});

video.addEventListener("ended", () => {
  console.log("播放结束");
});
```

## 四、表单增强

### 1. 新增 input 类型

- email：自动校验格式，移动端弹出邮箱快捷输入
- tel：电话号码，移动端弹出数字键盘
- url：自动校验格式
- number：可设置最大最小值、步长
- color：弹出颜色选择器
- date：弹出日期选择器
- time：弹出时间选择器
- datetime-local：选择本地日期和时间
- range：滑块选择范围值
- search：搜索框

### 2. 控件属性增强

- placeholder: 占位符提示
- required: 必填验证
- pattern: 正则验证——`<input type="text" pattern="[0-9]{6}" title="请输入6位数字" />`
- novalidate: 禁用浏览器验证——`<form novalidate>`
- autofocus: 自动获得焦点——`<input type="text" autofocus />`

### 3. datalist - 预定义选项列表

```html
<input type="text" list="browsers" />
<datalist id="browsers">
  <option value="Chrome"></option>
  <option value="Firefox"></option>
  <option value="Safari"></option>
</datalist>
```

## 五、Canvas & SVG

- canvas：画布标签，可用JS绘制各种图形，适合动画、游戏、图表等高性能场景
- SVG：Scalable Vector Graphics，可缩放矢量图形，基于XML。适合图标、插画、图表等，任意缩放不会失真，支持事件绑定。

| 特性     | Canvas             | SVG                |
| -------- | ------------------ | ------------------ |
| 绘制方式 | 栅格（像素）       | 矢量               |
| 放大效果 | 会失真             | 清晰无失真         |
| 事件     | 不支持元素事件     | 支持DOM事件        |
| 性能     | 大数据量优势       | 元素较多时较慢     |
| 可访问性 | 不能被搜索引擎索引 | 可以               |
| 用途     | 动画、游戏、图表   | 图标、线条图、演示 |

## 六、数据存储

### 1. localStorage

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

IndexDB是HTML5提供的浏览器本地数据库，用于存储大量结构化数据。

- 容量大：支持GB级别，远超localStorage
- 结构化存储：支持对象、数组等，支持索引和查询
- 异步：所有操作均为异步，不阻塞主线程

```javascript
// 打开名为"MyDB"的数据库，版本号为1
const request = indexedDB.open("MyDB", 1);

// 数据库打开成功后触发
request.onsuccess = (event) => {
  // 获取数据库实例
  const db = event.target.result;
  // 创建一个读写事务，操作名为"users"的对象仓库
  const transaction = db.transaction(["users"], "readwrite");
  // 获取对象仓库
  const store = transaction.objectStore("users");
  // 向对象仓库中添加一条数据
  store.add({ id: 1, name: "Alice" });
};
```

### 4. localStorage & sessionStorage & IndexedDB

| 特性     | localStorage | sessionStorage | IndexedDB |
| -------- | ------------ | -------------- | --------- |
| 容量     | 5-10MB       | 5-10MB         | GB级      |
| 有效期   | 永久         | 标签页关闭     | 永久      |
| 操作方式 | 同步         | 同步           | 异步      |
| 查询能力 | 弱           | 弱             | 强        |

## 七、Geolocation API

Geolocation API是HTML5提供的用于获取用户地理位置信息的浏览器接口。

- 通过`navigator.geolocation`对象调用，常用：`getCurrentPosition`、`watchPosition`
- 需要用户授权
- 可获取经纬度、高度、速度，常用语地图、定位、打卡等

### 1. 获取用户位置

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

## 八、Web Workers（多线程）

Web Workers是HTML5提供的一种在浏览器后台运行JavaScript的机制，可以让耗时计算在独立线程中执行，不会阻塞主线程，从而提升页面响应速度。

- 通过`new Worker("xx.js")`创建，主线程和Worker通过`postMessage`进行通信。
- 适用于大数据处理、复杂计算、文件解析等
- Worker不能直接操作DOM

### 1. 主线程

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

### 2. Worker线程

```javascript
// worker.js
onmessage = (event) => {
  const result = expensiveCalculation(event.data.num);
  postMessage(result);
};
```

## 九、属性和事件

### 1. 自定义属性：data-\*

- 用于在标签上存储数据，如`data-id="123"`
- 设置：`<div data-id="123"></div>`
- 读取：`element.dataset.id`
- 可以避免滥用class、id

### 2. 常用事件

- DOMContentLoaded：DOM加载完成
- beforeunload：页面即将关闭
- online：网络已连接
- offline：网络断开
- orientationchange：屏幕方向改变

```javascript
window.addEventListener("orientationchange", () => {
  console.log("屏幕方向:", window.orientation);
});
```

## 十、其他重要特性

### 1. Fullscreen API（全屏）

FullScreen API是HTML5提供的让网页元素进入或退出全屏显示的功能。

```javascript
const element = document.querySelector("#video");
element.requestFullscreen();

document.exitFullscreen();
```

### 2. 拖拽 API

Drag and Drop API是HTML5提供的一套让网页元素可以被拖动和放置的接口，常用语文件上传、列表排序、组件拖放等场景。

```html
<!-- 可拖拽元素，设置draggable="true"，并监听拖拽开始事件 -->
<div draggable="true" ondragstart="handleDragStart(event)">拖拽我</div>

<!-- 放置目标区域，监听dragover和drop事件 -->
<div ondrop="handleDrop(event)" ondragover="handleDragOver(event)">
  放在这里
</div>

<script>
  // 拖拽开始时触发，设置拖拽数据
  function handleDragStart(e) {
    e.dataTransfer.effectAllowed = "move"; // 允许的拖拽效果
    e.dataTransfer.setData("text/plain", e.target.id); // 存储拖拽数据
  }

  // 拖拽经过目标区域时触发，必须阻止默认事件才能触发drop
  function handleDragOver(e) {
    e.preventDefault();
  }

  // 放下时触发，获取拖拽数据
  function handleDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain"); // 读取拖拽数据
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

## 十一、File API（文件操作）

File API是HTML5提供的用于访问和处理用户文件的接口，常用于文件上传、预览、读取文件内容等场景。

### 1. 获取文件信息

```html
<input type="file" id="fileInput" />
```

```javascript
const fileInput = document.querySelector("#fileInput");

fileInput.addEventListener("change", (event) => {
  const files = event.target.files; // FileList 对象

  if (files.length > 0) {
    const file = files[0]; // 获取第一个文件
    console.log(`文件名: ${file.name}`);
    console.log(`文件大小: ${file.size} 字节`);
    console.log(`文件类型: ${file.type}`);
    console.log(`修改时间: ${new Date(file.lastModified)}`);
  }
});
```

### 2. FileReader 读取文件内容

```javascript
const fileInput = document.querySelector("#fileInput");

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  // 读取为文本
  reader.onload = (e) => {
    console.log("文件内容:", e.target.result);
  };
  reader.readAsText(file, "utf-8");

  // 或读取为 Data URL（用于预览图片）
  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target.result;
    document.body.appendChild(img);
  };
  reader.readAsDataURL(file);

  // 或读取为 ArrayBuffer（二进制数据）
  reader.onload = (e) => {
    const buffer = e.target.result;
    console.log("二进制数据:", buffer);
  };
  reader.readAsArrayBuffer(file);
});
```

### 3. Blob 和 File 的关系

- `File` 是 `Blob` 的子类
- `Blob` 表示一个不可变的二进制数据块
- 常用于创建对象URL、发送请求等

```javascript
// 创建 Blob
const blob = new Blob(["Hello World"], { type: "text/plain" });
const url = URL.createObjectURL(blob);

// 上传文件
const formData = new FormData();
formData.append("file", file);
fetch("/upload", { method: "POST", body: formData });
```

## 十二、Clipboard API（剪贴板操作）

Clipboard API提供了访问系统剪贴板的接口，可以读取和写入文本或图片。

```javascript
// 复制文本到剪贴板
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("复制成功");
  } catch (err) {
    console.error("复制失败:", err);
  }
}

// 从剪贴板读取文本
async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    console.log("粘贴的内容:", text);
  } catch (err) {
    console.error("读取失败:", err);
  }
}

// 复制图片到剪贴板
async function copyImageToClipboard(blob) {
  const data = [new ClipboardItem({ [blob.type]: blob })];
  await navigator.clipboard.write(data);
}
```

## 十三、Service Worker 与离线应用

Service Worker是一种特殊的Web Worker，运行在浏览器后台，可以实现离线应用、推送通知、后台同步等功能，是构建PWA的核心技术。

### 1. 注册 Service Worker

```javascript
// main.js
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service Worker 注册成功:", registration);
      })
      .catch((error) => {
        console.log("Service Worker 注册失败:", error);
      });
  });
}
```

### 2. Service Worker 生命周期

- `install`：安装阶段，常用于缓存资源
- `activate`：激活阶段，常用于清理旧缓存
- `fetch`：拦截网络请求，实现缓存策略

```javascript
// sw.js
const CACHE_NAME = "my-cache-v1";
const urlsToCache = ["/", "/index.html", "/style.css", "/app.js"];

// 安装事件：缓存资源
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

// 激活事件：清理旧缓存
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

// 拦截请求：优先返回缓存，否则发起网络请求
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
```

### 3. 缓存策略

| 策略                   | 说明                                   | 适用场景           |
| ---------------------- | -------------------------------------- | ------------------ |
| Cache First            | 优先查询缓存，缓存不存在才发起网络请求 | 静态资源、图片     |
| Network First          | 优先发起网络请求，失败才查询缓存       | API、实时数据      |
| Stale While Revalidate | 先返回缓存，后台更新                   | 新闻、文章         |
| Network Only           | 仅使用网络请求                         | 需要实时数据的页面 |
| Cache Only             | 仅使用缓存                             | 离线资源           |

## 十四、Page Visibility API

Page Visibility API 用于检测页面是否可见，可以监听用户是否切换到其他标签页，用于节省资源、暂停视频等。

```javascript
// 检查当前页面可见性
console.log(document.visibilityState); // "visible" 或 "hidden"

// 监听可见性变化
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    console.log("页面变为可见");
    // 恢复播放、重新加载数据等
  } else {
    console.log("页面被隐藏");
    // 暂停播放、停止动画等
  }
});
```

## 十五、新的全局属性

### 1. contenteditable

设置元素内容是否可编辑。

```html
<!-- 可编辑的 div -->
<div contenteditable="true">这段文字可以编辑</div>

<!-- 禁用编辑 -->
<div contenteditable="false">这段文字不可以编辑</div>
```

### 2. spellcheck

控制是否对文本进行拼写检查（仅对非中文有效）。

```html
<textarea spellcheck="true"></textarea>
```

### 3. translate

控制浏览器翻译功能是否对该元素应用。

```html
<!-- 不翻译代码块 -->
<pre translate="no">
  const hello = "world";
</pre>
```

## 十六、History API（单页应用路由）

HTML5增强了History API，允许在不刷新页面的情况下改变地址栏URL。

```javascript
// 向浏览器历史记录栈中压入一条记录
history.pushState({ id: 1 }, "页面标题", "/page/1");

// 替换当前历史记录
history.replaceState({ id: 2 }, "新标题", "/page/2");

// 监听历史记录变化
window.addEventListener("popstate", (event) => {
  console.log("历史记录改变，state:", event.state);
});
```
