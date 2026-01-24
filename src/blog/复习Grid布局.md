---
title: "Grid布局复习"
pubDate: 2026-01-24T19:40:00+08:00
description: "深入复习Grid布局"
author: "海川"
image:
  url: ""
  alt: ""
tags: ["Grid布局"]
---

## 一、Grid 基础概念

### 1. 什么是 Grid？

- CSS Grid Layout，CSS网格布局
- 是CSS3提供的一种强大的**二维布局**方案
- 相比Flex（一维），Grid能同时控制行和列，更适合复杂的整体页面布局
- 现代前端必学的布局方式，用于后台管理系统、仪表盘、卡片网格等

### 2. Grid 的核心概念

#### 基本术语：

- **Grid 容器**：使用 `display: grid` 的元素
- **Grid 项目**：容器的直接子元素
- **行（Row）**：水平方向的轨道
- **列（Column）**：竖直方向的轨道
- **网格单元（Cell）**：行列交叉点形成的单个方块
- **网格区域（Area）**：由一个或多个单元格组成的矩形区域
- **网格线（Line）**：分隔行或列的线，编号从1开始

```
        col 1  col 2  col 3
row 1  +------+------+------+
       | cell | cell | cell |
row 2  +------+------+------+
       | cell | cell | cell |
row 3  +------+------+------+
```

### 3. Grid vs Flex 使用场景

**使用 Flex：**

- 导航栏中的菜单项排列
- 列表项内部的元素对齐
- 工具栏按钮分布

**使用 Grid：**

- 整个页面的主体布局（头部+侧边栏+主内容+底部）
- 相册/图片网格排列
- 表格式布局
- 仪表盘卡片排列

**结合使用：**

- 通常用Grid做整体布局框架，再用Flex做细节排列
- 例如：Grid控制主页面结构，Flex控制卡片内部元容排列

## 二、Grid 容器属性

### 1. display: grid

将元素设置为 Grid 容器，其子元素自动成为 Grid 项目。

```css
.container {
  display: grid; /* 块级Grid容器 */
  /* display: inline-grid; */ /* 行内Grid容器 */
}
```

### 2. grid-template-columns - 定义列

定义网格的列数和列宽。

```css
.container {
  display: grid;

  /* 固定宽度：3列，每列200px */
  grid-template-columns: 200px 200px 200px;

  /* 比例分配：3列等宽 */
  grid-template-columns: 1fr 1fr 1fr;

  /* 混合：固定列 + 自适应列 */
  grid-template-columns: 200px 1fr 1fr;

  /* repeat 简化语法：重复3次1fr */
  grid-template-columns: repeat(3, 1fr);

  /* repeat + 自动填充（后面详解） */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

**关键概念：**

- `fr`：分数单位，表示按比例分配剩余空间
- `repeat(次数, 值)`：重复指定次数的值，简化代码
- `auto-fit` 和 `auto-fill`：自动创建列，根据可用空间调整

### 3. grid-template-rows - 定义行

定义网格的行数和行高。

```css
.container {
  display: grid;
  grid-template-rows: 100px 200px 100px; /* 3行，高度分别为100px、200px、100px */
  grid-template-rows: repeat(3, 1fr); /* 3行等高 */
}
```

### 4. grid-template-areas - 命名网格区域

用更直观的方式定义和引用网格区域，使布局结构一目了然。

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 60px 1fr 60px;
  gap: 10px;

  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.aside {
  grid-area: aside;
}
.footer {
  grid-area: footer;
}
```

**为什么要使用命名网格区域？**

1. **代码可读性极高** - 可以直观看出布局结构，像ASCII艺术一样清晰
2. **维护性强** - 修改布局只需改变grid-template-areas字符串，项目CSS无需改动
3. **响应式友好** - 在媒体查询中轻松改变布局，无需修改项目属性
4. **减少重复代码** - 不需要为每个项目重复写grid-column/grid-row

**对比：使用命名 vs 不使用命名**

使用命名（推荐）：

```css
/* 一眼看出布局 */
grid-template-areas:
  "header header header"
  "sidebar main aside"
  "footer footer footer";

.header {
  grid-area: header;
}
```

不使用命名（繁琐）：

```css
/* 需要计算线号，不直观 */
.header {
  grid-column: 1 / -1;
  grid-row: 1;
}

.sidebar {
  grid-column: 1;
  grid-row: 2;
}

.main {
  grid-column: 2;
  grid-row: 2;
}

/* ...更多项目... */
```

**响应式布局示例**

```css
/* 桌面端：三栏布局 */
.container {
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

/* 平板端：两栏布局 */
@media (max-width: 1024px) {
  .container {
    grid-template-areas:
      "header header"
      "sidebar main"
      "footer footer";
    grid-template-columns: 150px 1fr;
  }
}

/* 手机端：单栏布局 */
@media (max-width: 768px) {
  .container {
    grid-template-areas:
      "header"
      "sidebar"
      "main"
      "aside"
      "footer";
    grid-template-columns: 1fr;
  }
}
```

**命名规则提示**

- 区域名使用小写字母和连字符，如 `header-main`、`sidebar-nav`
- 点号 `.` 表示空单元格：`"header header ."` 在右侧留下空位
- 区域必须是矩形，不能是L形或其他不规则形状

### 5. gap - 网格间距

定义行间距和列间距（推荐用法）。

```css
.container {
  display: grid;
  gap: 20px; /* 行列间距都是20px */
  /* gap: 20px 30px; */ /* 行间距20px，列间距30px */
}
```

### 6. grid-auto-flow - 项目排列方向

定义项目如何自动排列（当不显式指定位置时）。

| 属性值         | 说明                   |
| -------------- | ---------------------- |
| `row`          | 默认值，逐行填充       |
| `column`       | 逐列填充               |
| `row dense`    | 逐行填充，尽量填充空隙 |
| `column dense` | 逐列填充，尽量填充空隙 |

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: row; /* 按行填充 */
}
```

### 7. grid-auto-columns / grid-auto-rows

定义自动创建的行/列的大小（当项目超出定义的网格时）。

**什么时候会自动创建行/列？**

当HTML中的项目数超过 `grid-template-columns/rows` 定义的数量时，Grid会自动创建新行或新列来容纳这些项目。此时使用 `grid-auto-rows/columns` 控制这些自动创建的轨道大小。

**示例对比：**

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
  <!-- 超出定义范围 -->
  <div class="item">6</div>
  <!-- 会自动创建新行 -->
</div>
```

**不设置 grid-auto-rows 的情况：**

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: 80px; /* 只定义1行 */
  gap: 10px;

  /* 没有设置grid-auto-rows，第2、3行会自动调整大小（通常缩小到内容高度） */
}
```

结果：第1行高度80px，第2、3行会自动缩小，可能只有30px。❌ 不美观

**设置 grid-auto-rows 的情况（推荐）：**

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: 80px;
  grid-auto-rows: 100px; /* 后续自动创建的行也都是100px */
  gap: 10px;
}
```

结果：所有行高都统一为100px。✅ 整齐美观

**使用 auto 值**

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 100px;
  grid-auto-rows: auto; /* 自动根据内容调整 */
}

/* item高度根据内容自动计算，不受限制 */
```

**实际应用：无限滚动列表**

```css
.feed {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(10, 200px); /* 初始10行 */
  grid-auto-rows: 200px; /* 后续加载的项目也都是200px */
  gap: 20px;
}

/* 当滚动加载更多项目时，会自动创建新行，无需修改CSS */
```

**grid-auto-columns 用法（逐列填充）**

```css
.container {
  display: grid;
  grid-template-rows: repeat(3, 100px);
  grid-auto-columns: 150px; /* 自动创建的列宽为150px */
  grid-auto-flow: column; /* 按列填充 */
}

/* 当项目超出3列时，会自动创建新列，每列150px */
```

### 8. justify-items - 项目水平对齐（容器级）

控制所有项目在列内的水平对齐方式。

| 属性值    | 说明               |
| --------- | ------------------ |
| `start`   | 靠左对齐           |
| `end`     | 靠右对齐           |
| `center`  | 居中对齐           |
| `stretch` | 拉伸填满（默认值） |

```css
.container {
  display: grid;
  justify-items: center; /* 所有项目水平居中 */
}
```

### 9. align-items - 项目竖直对齐（容器级）

控制所有项目在行内的竖直对齐方式。

| 属性值    | 说明               |
| --------- | ------------------ |
| `start`   | 靠上对齐           |
| `end`     | 靠下对齐           |
| `center`  | 居中对齐           |
| `stretch` | 拉伸填满（默认值） |

```css
.container {
  display: grid;
  align-items: center; /* 所有项目竖直居中 */
}
```

### 10. place-items - 简写

`place-items: <align-items> <justify-items>` 的简写。

```css
.container {
  display: grid;
  place-items: center center; /* 水平竖直都居中 */
  place-items: center; /* 等同于上面 */
}
```

### 11. justify-content - 整体网格水平对齐

控制整个网格在容器内的水平位置（当网格宽度小于容器宽度时生效）。

| 属性值          | 说明         |
| --------------- | ------------ |
| `start`         | 靠左         |
| `end`           | 靠右         |
| `center`        | 居中         |
| `space-between` | 两端对齐     |
| `space-around`  | 周围均匀分布 |
| `space-evenly`  | 均匀分布     |

```css
.container {
  width: 1000px;
  display: grid;
  grid-template-columns: repeat(3, 200px);
  justify-content: center; /* 网格水平居中 */
}
```

### 12. align-content - 整体网格竖直对齐

控制整个网格在容器内的竖直位置（当网格高度小于容器高度时生效）。

```css
.container {
  height: 800px;
  display: grid;
  grid-template-rows: repeat(2, 200px);
  align-content: center; /* 网格竖直居中 */
}
```

### 13. place-content - 简写

`place-content: <align-content> <justify-content>` 的简写。

```css
.container {
  display: grid;
  place-content: center; /* 网格整体居中 */
}
```

### 14. 容器属性速查表

| 属性                    | 用途         | 常见值                          |
| ----------------------- | ------------ | ------------------------------- |
| `grid-template-columns` | 定义列       | `1fr 1fr 1fr`、`repeat(3, 1fr)` |
| `grid-template-rows`    | 定义行       | `100px 200px`、`repeat(2, 1fr)` |
| `grid-template-areas`   | 命名区域     | `"header header"`               |
| `gap`                   | 间距         | `20px`、`20px 30px`             |
| `grid-auto-flow`        | 排列方向     | `row`、`column`                 |
| `justify-items`         | 项目水平对齐 | `center`、`stretch`             |
| `align-items`           | 项目竖直对齐 | `center`、`stretch`             |
| `justify-content`       | 网格水平对齐 | `center`、`space-between`       |
| `align-content`         | 网格竖直对齐 | `center`、`space-between`       |

## 三、Grid 项目属性

### 1. grid-column-start / grid-column-end

定义项目占据的列范围。

```css
.item {
  grid-column-start: 1; /* 从第1条列线开始 */
  grid-column-end: 3; /* 到第3条列线结束 */
  /* 占据第1、2列 */
}

/* 和上面等效 */
.item {
  grid-column-start: 1;
  grid-column-end: span 2; /* 跨越（占据）2列 */
}
```

### 2. grid-row-start / grid-row-end

定义项目占据的行范围。

```css
.item {
  grid-row-start: 1;
  grid-row-end: 3; /* 占据第1、2行 */
}
```

### 3. grid-column / grid-row - 简写

`grid-column: <start> / <end>` 的简写形式。

```css
.item {
  grid-column: 1 / 3; /* 从第1列到第3列 */
  grid-row: 1 / span 2; /* 从第1行跨越2行 */
}
```

### 4. grid-area - 综合属性

既可以指定区域名，也可以指定行列范围。

```css
/* 方式1：使用命名区域 */
.item {
  grid-area: header;
}

/* 方式2：指定行列 */
.item {
  grid-area: 1 / 1 / 3 / 3; /* row-start / col-start / row-end / col-end */
}
```

### 5. justify-self - 项目水平对齐

覆盖容器的 `justify-items`，控制单个项目的水平对齐。

```css
.item {
  justify-self: center; /* 该项目水平居中 */
}
```

### 6. align-self - 项目竖直对齐

覆盖容器的 `align-items`，控制单个项目的竖直对齐。

```css
.item {
  align-self: center; /* 该项目竖直居中 */
}
```

### 7. place-self - 简写

`place-self: <align-self> <justify-self>` 的简写。

```css
.item {
  place-self: center; /* 项目整体居中 */
}
```

**项目属性速查表**

| 属性           | 用途     | 常见值                    |
| -------------- | -------- | ------------------------- |
| `grid-column`  | 列范围   | `1 / 3`、`1 / span 2`     |
| `grid-row`     | 行范围   | `1 / 3`、`1 / span 2`     |
| `grid-area`    | 区域     | `header`、`1 / 1 / 3 / 3` |
| `justify-self` | 水平对齐 | `center`、`start`         |
| `align-self`   | 竖直对齐 | `center`、`start`         |
| `place-self`   | 整体对齐 | `center`                  |

## 四、Grid 高级特性

### 1. repeat() 函数

简化重复的列或行定义。

```css
.container {
  display: grid;

  /* 重复3次1fr */
  grid-template-columns: repeat(3, 1fr);
  /* 等同于：grid-template-columns: 1fr 1fr 1fr; */

  /* 重复多个值 */
  grid-template-columns: repeat(2, 200px 1fr);
  /* 等同于：grid-template-columns: 200px 1fr 200px 1fr; */
}
```

### 2. minmax() 函数

定义轨道的最小和最大尺寸。

```css
.container {
  display: grid;

  /* 每列最小200px，最大1fr */
  grid-template-columns: repeat(3, minmax(200px, 1fr));

  /* 至少100px，最大不超过200px */
  grid-template-columns: minmax(100px, 200px);
}
```

### 3. auto-fit vs auto-fill

这两个属性都用于**自动创建列数**，但处理"多余空间"的方式不同。

**auto-fit：列数自动调整，多余列会折叠**

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

- Grid 会根据容器宽度自动计算能放下多少列
- 当项目数少于计算出的列数时，多余的**空列会折叠**
- 现有项目会自动**扩展填满**整行

**auto-fill：列数固定，多余列保留为空**

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
```

- Grid 会根据容器宽度自动计算**最多能放多少列**
- 计算出的列数是**固定的**，不会因为项目数而改变
- 多余的空列会**保留**（占据空间但为空）
- 项目会按照计算出的列数排列

**实际代码对比：**

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

```css
/* auto-fit：3项最优显示 */
.container {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  /* 容器1000px → 3项 × ~333px，充分利用空间 ✅ */
}

/* auto-fill：可能出现空列浪费 */
.container {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  /* 容器1000px → 可能显示5列，最后2列为空 ❌ */
}
```

### 4. fr 单位

分数单位，表示按比例分配剩余空间。

```css
.container {
  display: grid;

  /* 左列200px固定，右列占剩余空间 */
  grid-template-columns: 200px 1fr;

  /* 左中右按1:2:1的比例分配 */
  grid-template-columns: 1fr 2fr 1fr;
}
```

### 5. span 关键字

让项目跨越多个网格单元。

```css
.item {
  grid-column: span 2; /* 跨越2列 */
  grid-row: span 3; /* 跨越3行 */
}
```

### 6. 命名网格线

给网格线起名字，便于引用。

```css
.container {
  display: grid;
  grid-template-columns:
    [col-start] 200px
    [col-middle] 1fr
    [col-end] 200px;
  grid-template-rows:
    [row-header] 60px
    [row-main] 1fr
    [row-footer] 60px;
}

.sidebar {
  grid-column: col-start;
  grid-row: row-header / row-footer;
}
```

## 五、[实用案例](https://codesandbox.io/p/sandbox/bo-ke-dai-ma-yan-shi-hrndwc)

已在CodeSandbox实现以下全部案例

### 1. 经典圣杯布局（头部+侧边栏+主内容+页脚）

```html
<div class="layout">
  <header>头部</header>
  <aside>侧边栏</aside>
  <main>主内容</main>
  <footer>页脚</footer>
</div>
```

```css
.layout {
  display: grid;
  height: 100vh;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 60px 1fr 60px;
  gap: 10px;

  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

header {
  grid-area: header;
  background: #333;
}

aside {
  grid-area: sidebar;
  background: #f0f0f0;
}

main {
  grid-area: main;
  grid-column: 2 / span 2; // 让main占据右侧aside的空间
}

footer {
  grid-area: footer;
  background: #333;
}
```

### 2. 响应式卡片网格

```html
<div class="gallery">
  <div class="card">卡片1</div>
  <div class="card">卡片2</div>
  <div class="card">卡片3</div>
  <!-- 更多卡片 -->
</div>
```

```css
.gallery {
  display: grid;
  gap: 20px;
  padding: 20px;

  /* 响应式：自动根据容器宽度调整列数 */
  grid-template-columns: repeat(auto-fit, minmax(30%, 1fr));
}

.card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  min-height: 100px;
}

/* 响应式断点 */
@media (max-width: 768px) {
  .gallery {
    grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
  }
}
```

### 3. Pinterest 瀑布流布局

```html
<div class="masonry">
  <div class="item" style="grid-row: span 2;">高卡片</div>
  <div class="item">正常卡片</div>
  <div class="item" style="grid-row: span 3;">更高卡片</div>
  <!-- 更多卡片 -->
</div>
```

```css
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  auto-rows: 200px; /* 基础行高 */
  grid-auto-flow: dense; /* 自动填充空隙 */
}

.item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}
```

### 4. 仪表盘布局

```html
<div class="dashboard">
  <div class="widget big">大卡片（占2x2）</div>
  <div class="widget">小卡片</div>
  <div class="widget">小卡片</div>
  <div class="widget wide">宽卡片（占2列）</div>
</div>
```

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 150px);
  gap: 20px;
  padding: 20px;
}

.widget {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.widget.big {
  grid-column: span 2;
  grid-row: span 2;
}

.widget.wide {
  grid-column: span 2;
}
```

### 5. 文章列表与侧边栏

```html
<div class="article-layout">
  <article class="main-content">
    <div class="post">文章1</div>
    <div class="post">文章2</div>
  </article>
  <aside class="sidebar">
    <div class="widget">热门文章</div>
    <div class="widget">分类</div>
  </aside>
</div>
```

```css
.article-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.main-content {
  display: grid;
  gap: 20px;
}

.post {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

.sidebar {
  display: grid;
  gap: 20px;
}

.widget {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .article-layout {
    grid-template-columns: 1fr;
  }
}
```

## 六、Grid vs Flex 对比深度分析

| 对比维度       | Grid           | Flex           |
| -------------- | -------------- | -------------- |
| **控制维度**   | 二维（行+列）  | 一维（行或列） |
| **主要用途**   | 整体页面布局   | 组件内部排列   |
| **项目定位**   | 显式定位到网格 | 被动排列       |
| **代码复杂度** | 高             | 低             |
| **学习曲线**   | 陡峭           | 平缓           |
| **响应式友好** | 极好           | 好             |
| **浏览器兼容** | IE11不支持     | IE11部分支持   |
| **性能**       | 计算量大       | 计算量小       |

**选择策略：**

1. **整体页面框架** → Grid
2. **导航栏、菜单、按钮组** → Flex
3. **卡片网格** → 根据是否需要固定位置选择（固定→Grid，流动→Flex+wrap）
4. **复杂表格式布局** → Grid
5. **组件内部对齐** → Flex

## 七、Grid 最佳实践

### 1. 使用 grid-template-areas 提高可读性

```css
/* ✅ 好的做法：清晰直观 */
grid-template-areas:
  "header header header"
  "sidebar main main"
  "footer footer footer";

/* ❌ 不好的做法：数字难以理解 */
grid-column: 1 / 2;
grid-row: 1 / 3;
```

### 2. 响应式优先考虑 auto-fit

```css
/* ✅ 自动响应，无需媒体查询 */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

/* ❌ 需要手动编写多个媒体查询 */
grid-template-columns: repeat(4, 1fr);
@media (max-width: 1200px) {
  grid-template-columns: repeat(3, 1fr);
}
```

### 3. 合理组合 Grid 和 Flex

```css
/* 外层Grid做整体布局 */
.page {
  display: grid;
  grid-template-columns: 200px 1fr;
}

/* 卡片内部用Flex对齐 */
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

### 4. 使用 gap 替代 margin

```css
/* ✅ 使用gap */
.grid {
  display: grid;
  gap: 20px;
}

/* ❌ 容易出现外边距塌陷 */
.item {
  margin: 10px;
}
```

### 5. 避免硬编码尺寸

```css
/* ✅ 使用灵活的单位 */
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(2, minmax(200px, auto));

/* ❌ 硬编码，响应式差 */
grid-template-columns: 300px 300px 300px;
grid-template-rows: 400px 400px;
```

## 八、浏览器兼容性

Grid 在现代浏览器中兼容性良好：

- Chrome 57+
- Firefox 52+
- Safari 10.1+
- Edge 16+
- **IE 11 不支持**（项目需要支持IE时，使用Flex替代）

**兼容性检查网址：** caniuse.com/css-grid

## 九、调试技巧

### 1. 使用浏览器开发者工具

- Chrome/Firefox 会自动高亮Grid网格
- 选中容器时显示网格线和编号
- 可视化查看网格结构

### 2. 添加调试样式

```css
.container {
  border: 2px solid red;
  display: grid;
}

.item {
  border: 1px solid blue;
  background: rgba(0, 0, 255, 0.1);
}
```

### 3. 使用命名网格线便于调试

```css
/* 命名网格线，易于理解 */
grid-template-columns:
  [start] 200px
  [nav-end content-start] 1fr
  [content-end sidebar-start] 200px
  [end];
```

## 十、常见问题

### 1. Grid 项目超出边界？

```css
/* 问题：项目内容溢出 */
.item {
  overflow: hidden; /* 解决方案 */
  text-overflow: ellipsis;
}
```

### 2. 如何让项目居中？

```css
/* 项目本身居中 */
.item {
  place-self: center;
}

/* 所有项目都居中 */
.container {
  place-items: center;
}

/* 整个网格在容器中居中 */
.container {
  place-content: center;
}
```

### 3. Grid 能用于一维布局吗？

```css
/* 可以，但Flex更合适 */
.list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* 改用Flex更简洁 */
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
```

### 4. auto-fit 和 auto-fill 怎么选？

```css
/* 卡片会自动扩展填满行 - 用 auto-fit */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

/* 卡片保持宽度，可能有空列 - 用 auto-fill */
grid-template-columns: repeat(auto-fill, 200px);
```
