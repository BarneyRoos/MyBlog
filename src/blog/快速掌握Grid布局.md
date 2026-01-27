---
title: "快速掌握Grid布局"
pubDate: 2026-01-26T02:13:06.000Z
description: "Grid布局由浅入深的完整学习指南，通过循序渐进的实践案例掌握Grid布局"
author: "海川"
image:
  url: ""
  alt: ""
tags: ["教程", "Grid布局"]
---

## 前言

这是一篇**系统完整的 Grid 布局学习指南**。从基础概念、核心属性，到 8 个循序渐进的实践案例，再到高级特性和最佳实践，全面覆盖 Grid 的方方面面。

**学习方式**：强烈建议边读边实践。每个案例都附带完整的 HTML 和 CSS，你可以直接从右下角打开练兵场（💻）。

在 CSS 布局的演进史中，我们经历了从 Table 布局的臃肿、Float 布局的挣扎，到 Flexbox 的局部统治。然而，真正的“终极 Boss”始终是 **CSS Grid**。如果说 Flexbox 解决了“线”的排列，那么 Grid 则彻底接管了“面”的构建。

---

## 一、Grid 基础概念

### 1. 什么是 Grid？

- CSS Grid Layout，CSS网格布局
- 是 CSS3 提供的一种强大的**二维布局**方案
- 相比 Flex（一维），Grid 能同时控制行和列，更适合复杂的整体页面布局
- 现代前端必学的布局方式，用于后台管理系统、仪表盘、卡片网格等

### 2. Grid 的核心概念

#### 基本术语

- **网格容器（Grid Container）**：使用 `display: grid` 的元素，负责定义网格结构
- **网格项目（Grid Item）**：容器的直接子元素，会被放置在网格中
- **行（Row）**：水平方向的轨道
- **列（Column）**：竖直方向的轨道
- **网格单元（Cell）**：行列交叉点形成的单个方块
- **网格区域（Area）**：由一个或多个单元格组成的矩形区域
- **网格线（Line）**：分隔行或列的线，编号从 1 开始

```
        col 1  col 2  col 3
row 1  +------+------+------+
       | cell | cell | cell |
row 2  +------+------+------+
       | cell | cell | cell |
row 3  +------+------+------+
```

**重要提示**：只有容器的**直接子元素**才是网格项目。嵌套的元素不会成为网格项目。

#### 网格线、网格轨道、网格单元

理解这三个概念很重要：

```
网格线（Grid Lines）- 横纵分割线，用于定位
     ↓
+-----+-----+-----+
| 单元 | 单元 | 单元 |
+-----+-----+-----+
| 单元 | 单元 | 单元 |
+-----+-----+-----+
 ↑轨道↑
```

- **网格线**：就像 Excel 表格的行号和列号（从 1 开始）
- **网格轨道**：两条相邻网格线之间的空间（即一行或一列）
- **网格单元**：四条网格线围成的最小区域

这对理解 `grid-column: 1 / 3` 这样的语法很关键——它表示从第 1 条列线到第 3 条列线。

#### 隐式 vs 显式网格

- **显式网格**：你通过 `grid-template-columns` 和 `grid-template-rows` 明确定义的网格
- **隐式网格**：当项目超出显式网格时，Grid 自动创建的行和列（由 `grid-auto-rows` 和 `grid-auto-columns` 控制）

```css
.container {
  grid-template-columns: repeat(3, 1fr); /* 显式定义3列 */
  grid-auto-rows: 100px; /* 隐式行高100px */
}
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

**结合使用**：

- 通常用 Grid 做整体布局框架，再用 Flex 做细节排列
- 例如：Grid 控制主页面结构，Flex 控制卡片内部元素排列

| 对比维度       | Grid           | Flex           |
| -------------- | -------------- | -------------- |
| **控制维度**   | 二维（行+列）  | 一维（行或列） |
| **主要用途**   | 整体页面布局   | 组件内部排列   |
| **项目定位**   | 显式定位到网格 | 被动排列       |
| **响应式友好** | 极好           | 好             |

---

## 二、Grid 容器属性详解

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

**语法**：`grid-template-columns: 200px 100px 200px`，表示创建三个列并设置了各自宽度。<br/>

**列的宽度**：可以使用`固定数值`，也可以使用`fr（份数）`，以及`minmax（范围）`。

**行的设置**：同理。

#### 拥抱 fr和minmax

`fr`（fraction）是 Grid 的灵魂，用在`grid-template-columns` 和 `grid-template-rows`中。每个`1fr`表示一份，下面的语句表示“创建三个列，左侧列宽200px，剩余空间分成3份（1fr+2fr），中间列占1份，右侧列占2份”：

```css
grid-template-columns: 200px 1fr 2fr;
```

`minmax`是个函数，它给列宽限定了最小值和最大值，比如：

```css
/* 第三列最小100px，最大自适应 */
grid-template-columns: 200px 1fr minmax(100px, auto);
```

#### 重复：repeat()

想象你需要一个12列的布局，这时重复地设置列就很麻烦，可以用下面的方式来创建：

```css
/* 12列等宽 */
grid-template-columns: repeat(12, 1fr);
/* 固定和均分混合 */
grid-template-columns: 200px repeat(10, 1fr) 100px;
/* 固定、均分、自适应混合 */
grid-template-columns: 200px repeat(11, minmax(100px, auto));
```

#### 常见用法示例

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

**关键概念**：

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

1. **代码可读性极高** - 可以直观看出布局结构，像 ASCII 艺术一样清晰
2. **维护性强** - 修改布局只需改变 `grid-template-areas` 字符串，项目 CSS 无需改动
3. **响应式友好** - 在媒体查询中轻松改变布局，无需修改项目属性
4. **减少重复代码** - 不需要为每个项目重复写 `grid-column/grid-row`

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

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: 80px; /* 只定义1行 */
  grid-auto-rows: 100px; /* 后续自动创建的行都是100px */
  gap: 10px;
}

/* item高度根据内容自动计算，不受限制 */
.container.auto {
  grid-auto-rows: auto;
}
```

### 8. 对齐属性

Grid 的对齐属性遵循严密的逻辑，分为**网格整体**、**整行整列**，以及**项目自身**三种层级的对齐。

| 目标         | 水平方向 (Inline) | 垂直方向 (Block) | 简写            |
| ------------ | ----------------- | ---------------- | --------------- |
| **网格整体** | `justify-content` | `align-content`  | `place-content` |
| **整行整列** | `justify-items`   | `align-items`    | `place-items`   |
| **项目自身** | `justify-self`    | `align-self`     | `place-self`    |

#### justify-content / align-content（网格在容器内的对齐）

控制整个网格在容器内的位置：

```css
.container {
  width: 500px;
  display: grid;
  grid-template-columns: repeat(3, 100px);
  justify-content: center; /* 网格水平居中在容器内 */
  align-content: center; /* 网格垂直居中在容器内 */
  place-content: center; /* 简写 */
}
```

#### justify-items / align-items（项目在单元内的对齐）

```css
.container {
  display: grid;
  justify-items: center; /* 水平居中所有项目 */
  align-items: center; /* 垂直居中所有项目 */
  place-items: center; /* 简写：同时水平和竖直居中 */
}
```

**可选值**：`start` | `end` | `center` | `stretch`（默认）

#### 项目级对齐属性

```css
.item {
  justify-self: start; /* 该项目水平靠左 */
  align-self: end; /* 该项目垂直靠下 */
  place-self: center; /* 简写 */
}
```

---

## 三、Grid 项目属性

### 1. grid-column / grid-row

定义项目占据的列和行范围。

```css
.item {
  grid-column: 1 / 3; /* 从第1列到第3列 */
  grid-row: 1 / span 2; /* 从第1行跨越2行 */
}
```

### 2. grid-area

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

---

## 四、Grid 高级特性

### 1. repeat() 函数

简化重复的列或行定义。

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 等同于：1fr 1fr 1fr */
  grid-template-columns: repeat(2, 200px 1fr); /* 等同于：200px 1fr 200px 1fr */
}
```

### 2. minmax() 函数

定义轨道的最小和最大尺寸。

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  grid-template-columns: minmax(100px, 200px);
}
```

### 3. fr 单位

分数单位，表示按比例分配剩余空间。

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 1fr; /* 左列固定，右两列等分剩余 */
  grid-template-columns: 1fr 2fr 1fr; /* 按1:2:1分配 */
}
```

### 4. auto-fit vs auto-fill

这两个属性都用于**自动创建列数**，但处理"多余空间"的方式不同。

#### 场景：容器宽 1000px，每个卡片最小 250px

**使用 auto-fit：**

```css
.container {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
```

- 计算最多能放多少列：1000 ÷ 250 = 4 列
- **如果只有 3 个项目**：Grid 创建 4 个列轨道，第 4 个空列**被折叠**（宽度变为 0），前 3 个项目扩展占用全部空间，每列约 333px
- **如果有 5 个项目**：第 5 个项目换到第二行

**使用 auto-fill：**

```css
.container {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
```

- 计算最多能放多少列：1000 ÷ 250 = 4 列
- **如果只有 3 个项目**：Grid 创建 4 个列轨道，第 4 列**保留**（宽度仍为 250px），前 3 个项目保持 250px 宽，剩余 250px 留白
- **如果有 5 个项目**：第 5 个项目换到第二行

#### 何时使用？

| 场景                         | 推荐          | 原因                       |
| ---------------------------- | ------------- | -------------------------- |
| 卡片网格（希望卡片自动扩展） | `auto-fit` ✅ | 充分利用容器空间，不浪费   |
| 相册网格（希望保持固定尺寸） | `auto-fill`   | 卡片保持一致大小           |
| 响应式栅栏布局               | `auto-fit` ✅ | 自适应扩展最符合响应式设计 |

**建议**：大多数时候用 `auto-fit`。

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
    [start] 200px
    [content-start] 1fr
    [content-end] 200px
    [end];
}

.sidebar {
  grid-column: start / content-start;
}
```

---

## 五、从零开始的 8 个实践案例

### 案例 1：最简单的 2×2 网格

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
</div>
```

```css
.container {
  display: grid;
  grid-template-columns: 200px 200px;
  grid-template-rows: 100px 100px;
  gap: 10px;
}

.item {
  background: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
```

**关键点**：项目会按 HTML 顺序逐行填充。

### 案例 2：使用 fr 单位的灵活布局

```html
<div class="container">
  <div class="header">头部</div>
  <div class="sidebar">侧边栏</div>
  <div class="main">主内容</div>
</div>
```

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr;
  gap: 10px;
  height: 100vh;
}

.header {
  grid-column: 1 / -1;
  background: #333;
  color: white;
  padding: 0 20px;
  display: flex;
  align-items: center;
}

.sidebar {
  background: #f0f0f0;
  padding: 20px;
}

.main {
  background: #fff;
  padding: 20px;
}
```

**关键点**：`1fr` 占用剩余空间，`grid-column: 1 / -1` 占整行。

### 案例 3：grid-template-areas 圣杯布局

```html
<div class="container">
  <header>Header</header>
  <aside class="left">SideBar</aside>
  <main>Content</main>
  <aside class="right">SideBar</aside>
  <footer>Footer</footer>
</div>
```

```css
.container {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 60px 1fr 60px;
  height: 100vh;

  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

header {
  grid-area: header;
  background: #ccc;
}
aside.left {
  grid-area: sidebar;
  background: #aaa;
}
main {
  grid-area: main;
}
aside.right {
  grid-area: aside;
  background: #aaa;
}
footer {
  grid-area: footer;
  background: #ccc;
}
```

**关键点**：代码一目了然，修改布局只需改 `grid-template-areas` 字符串。

### 案例 4：repeat() 卡片网格

```html
<div class="gallery">
  <div class="card">1</div>
  <div class="card">2</div>
  <div class="card">3</div>
  <div class="card">4</div>
  <div class="card">5</div>
  <div class="card">6</div>
</div>
```

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
}

.card {
  aspect-ratio: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 8px;
}
```

**关键点**：`repeat(3, 1fr)` 简化了重复代码，`aspect-ratio: 1` 保持正方形。

### 案例 5：auto-fit 响应式卡片

```html
<div class="auto-gallery">
  <div class="card">卡片 1</div>
  <div class="card">卡片 2</div>
  <div class="card">卡片 3</div>
</div>
```

```css
.auto-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 8px;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

**关键点**：自动根据容器宽度调整列数，无需媒体查询！

### 案例 6：grid-auto-rows 控制自动行高

```html
<div class="feed">
  <div class="item">项目 1</div>
  <div class="item">项目 2</div>
  <div class="item">项目 3</div>
  <div class="item">项目 4</div>
  <div class="item">项目 5</div>
  <div class="item">项目 6</div>
</div>
```

```css
.feed {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 150px);
  grid-auto-rows: 100px;
  gap: 10px;
  padding: 20px;
}

.item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}
```

**关键点**：前 2 行 150px，后续自动行 100px，整齐划一。

### 案例 7：span 跨越多个单元格

```html
<div class="masonry">
  <div class="item big">大项目（占2x2）</div>
  <div class="item">项目 2</div>
  <div class="item">项目 3</div>
  <div class="item tall">项目 4（占2行）</div>
  <div class="item">项目 5</div>
  <div class="item">项目 6</div>
</div>
```

```css
.masonry {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 150px;
  gap: 10px;
  padding: 20px;
}

.item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-weight: bold;
}

.item.big {
  grid-column: span 2;
  grid-row: span 2;
}

.item.tall {
  grid-row: span 2;
}
```

**关键点**：`span` 让项目占据多个格子，创建不规则布局。

### 案例 8：完整实战 - 仪表盘布局

```html
<div class="dashboard">
  <header class="header">仪表盘</header>
  <div class="card card-large">
    <h3>总销售额</h3>
    <p class="number">¥ 1,234,567</p>
  </div>
  <div class="card">
    <h3>订单数</h3>
    <p class="number">5,678</p>
  </div>
  <div class="card">
    <h3>用户数</h3>
    <p class="number">12,345</p>
  </div>
  <div class="card card-wide">
    <h3>最近交易</h3>
    <div class="mini-list">
      <div>订单 #001 - $123</div>
      <div>订单 #002 - $456</div>
    </div>
  </div>
  <div class="card">
    <h3>转化率</h3>
    <p class="number">3.2%</p>
  </div>
  <div class="card">
    <h3>跳出率</h3>
    <p class="number">21.5%</p>
  </div>
</div>
```

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 180px;
  gap: 20px;
  padding: 20px;
  background: #f5f5f5;
}

.header {
  grid-column: 1 / -1;
  background: #333;
  color: white;
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  border-radius: 4px;
}

.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card h3 {
  margin: 0;
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.card .number {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  color: #333;
}

.card.card-large {
  grid-column: span 2;
  grid-row: span 2;
}

.card.card-wide {
  grid-column: span 2;
}

/* 响应式 */
@media (max-width: 1024px) {
  .dashboard {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .dashboard {
    grid-template-columns: 1fr;
  }

  .card.card-large,
  .card.card-wide {
    grid-column: span 1;
  }
}
```

**关键点**：综合运用所有属性，包括响应式设计。

---

## 六、常见错误与陷阱

### ❌ 错误 1：忘记只有直接子元素才是网格项目

```html
<div class="container">
  <div class="wrapper">
    <!-- 这是网格项目 -->
    <div class="item">这不是网格项目</div>
  </div>
</div>
```

**解决**：直接在网格容器内放置元素，或调整 HTML 结构。

### ❌ 错误 2：混淆 grid-column 的两种写法

```css
.item {
  /* 写法1：起点/终点 */
  grid-column: 1 / 3; /* 从线1到线3，跨2列 */

  /* 写法2：起点/span数 */
  grid-column: 1 / span 2; /* 从线1开始，跨2列 */
}
/* 这两个等价！ */
```

### ❌ 错误 3：gap vs margin 搞混

```css
/* ✅ 使用 gap */
.grid {
  display: grid;
  gap: 20px; /* 只作用于项目之间，不包括边界 */
}

/* ❌ 使用 margin */
.item {
  margin: 10px; /* 作用于所有方向，包括与容器的距离 */
}
```

**建议**：优先使用 `gap`。

### ❌ 错误 4：auto-fit vs auto-fill 搞混

**使用 auto-fit**（推荐）：多余空列折叠，项目自动扩展

```css
.container {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}
/* 容器1000px，3项 → 每项约333px（充分填满） */
```

**使用 auto-fill**：多余空列保留

```css
.container {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
/* 容器1000px，3项 → 每项250px，留白250px */
```

---

## 七、Grid 最佳实践

### 1. 优先使用 grid-template-areas

```css
/* ✅ 好的做法：清晰直观 */
grid-template-areas:
  "header header header"
  "sidebar main main"
  "footer footer footer";

/* ❌ 不好的做法：数字难以理解 */
.item {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
}
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
/* ✅ 使用 gap */
.grid {
  display: grid;
  gap: 20px;
}

/* ❌ 容易出现外边距问题 */
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

---

## 八、对齐属性完全指南

### gap vs margin 的详细区别

**使用 gap：**

- 只作用于**项目之间**，不包括项目与容器边界的距离
- 任何 CSS 框模型都无法覆盖 gap
- 推荐方式，更干净、更可预测

**使用 margin：**

- 作用于项目与其他一切的距离
- 容易导致与容器边界的间距不一致
- 在 Grid 中通常不推荐用于间距控制

### grid-auto-flow 的三种模式详解

| flow 值      | 行为                                       | 常用场景       |
| ------------ | ------------------------------------------ | -------------- |
| `row` (默认) | 逐行从左到右填充项目                       | 大多数情况     |
| `column`     | 逐列从上到下填充项目                       | 需要按列排列时 |
| `row dense`  | 逐行填充，但允许后面的小项目插入前面的空隙 | 砌体布局       |

**row dense 的妙用**：

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: row dense;
}

.item.big {
  grid-column: span 2;
  grid-row: span 2;
}
/* 不用dense时，第2、3项会被迫到第3行 */
/* 用dense时，它们会填充big项后的空隙 */
```

---

## 九、调试技巧

### 1. 使用浏览器 DevTools 的 Grid 检查工具

在 Chrome 和 Firefox 中，当你选中一个 Grid 容器时，可以在 DevTools 中勾选"显示网格"选项，会直观显示网格线和编号。

### 2. 给网格线命名便于理解

```css
.container {
  grid-template-columns:
    [start] 200px
    [content-start] 1fr
    [content-end] 200px
    [end];
}

.item {
  grid-column: content-start / content-end;
}
```

代码更易读易维护。

### 3. 快速验证网格结构

```css
.container > * {
  outline: 1px solid red; /* 快速看到所有项目的边界 */
}
```

---

## 十、完整属性速查表

| 属性                    | 用途             | 常见值                          |
| ----------------------- | ---------------- | ------------------------------- |
| `grid-template-columns` | 定义列           | `1fr 1fr 1fr`、`repeat(3, 1fr)` |
| `grid-template-rows`    | 定义行           | `100px 200px`、`repeat(2, 1fr)` |
| `grid-template-areas`   | 命名区域         | `"header header"`               |
| `gap`                   | 间距             | `20px`、`20px 30px`             |
| `grid-auto-flow`        | 排列方向         | `row`、`column`、`row dense`    |
| `grid-auto-rows`        | 自动行高         | `100px`、`auto`                 |
| `grid-auto-columns`     | 自动列宽         | `150px`、`auto`                 |
| `justify-items`         | 项目水平对齐     | `center`、`stretch`             |
| `align-items`           | 项目竖直对齐     | `center`、`stretch`             |
| `justify-content`       | 网格水平对齐     | `center`、`space-between`       |
| `align-content`         | 网格竖直对齐     | `center`、`space-between`       |
| `justify-self`          | 单个项目水平对齐 | `center`、`start`               |
| `align-self`            | 单个项目竖直对齐 | `center`、`start`               |
| `grid-column`           | 列范围           | `1 / 3`、`1 / span 2`           |
| `grid-row`              | 行范围           | `1 / 3`、`1 / span 2`           |
| `grid-area`             | 区域或行列范围   | `header`、`1 / 1 / 3 / 3`       |

---

## 十一、总结与下一步

### 核心要点

1. **Grid 是二维布局**：可同时控制行和列
2. **优先用 grid-template-areas**：代码更直观易维护
3. **auto-fit 是响应式首选**：自动适应容器宽度
4. **gap 优于 margin**：更干净可靠
5. **Grid + Flex 组合最强**：Grid 负责整体，Flex 负责细节

### 下一步建议

- 🎨 尝试修改案例中的数值，观察效果变化
- 📱 在不同屏幕大小下测试响应式布局
- 🚀 用 Grid 重新设计你的项目布局

---
