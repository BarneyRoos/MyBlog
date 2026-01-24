---
title: "掌握Grid布局"
pubDate: 2026-01-25T09:30:00+08:00
description: "Grid布局由浅入深的完整学习指南，通过循序渐进的实践案例掌握Grid布局"
author: "海川"
image:
  url: ""
  alt: ""
tags: ["教程", "Grid布局"]
---

## 前言

这是一篇**循序渐进**的 Grid 布局学习指南。通过 8 个从浅到深的实践案例，你将逐步掌握 Grid 的核心属性和应用方法。

**学习方式**：强烈建议边读边实践。每个案例都附带完整的 HTML 和 CSS，你可以复制到本地运行，观察效果，理解原理。

---

## 案例 1：最简单的 2×2 网格

### 目标

理解 `display: grid` 的基本作用，掌握 `grid-template-columns` 和 `grid-template-rows`。

### HTML

```html
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
</div>
```

### CSS

```css
.container {
  display: grid;
  grid-template-columns: 200px 200px; /* 2列，每列200px */
  grid-template-rows: 100px 100px; /* 2行，每行100px */
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

### 效果

4 个项目自动排列成 2×2 的网格。

### 关键理解

- `display: grid` 启用 Grid 布局
- `grid-template-columns: 200px 200px` 定义 2 列，每列 200px
- `grid-template-rows: 100px 100px` 定义 2 行，每行 100px
- `gap: 10px` 为行和列都设置 10px 的间距
- 项目会按 HTML 顺序逐行填充

---

## 案例 2：使用 fr 单位实现灵活布局

### 目标

理解 `fr`（分数单位）和 `gap` 的作用，掌握如何让列自适应。

### HTML

```html
<div class="container">
  <div class="header">头部</div>
  <div class="sidebar">侧边栏</div>
  <div class="main">主内容</div>
</div>
```

### CSS

```css
.container {
  display: grid;
  /* 侧边栏固定200px，主内容占剩余空间 */
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr;
  gap: 10px;
  height: 100vh;
}

.header {
  /* 占据第1行的所有列 */
  grid-column: 1 / -1;
  background: #333;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 20px;
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

### 效果

头部横跨整行，下面是固定宽度侧边栏 + 自适应主内容。

### 关键理解

- `1fr` 表示占用剩余空间的 1 份
- `grid-column: 1 / -1` 表示从第 1 列到最后一列（占整行）
- `height: 100vh` 让容器铺满整个视口高度
- 改变浏览器宽度，主内容区域会自动拉伸/缩小

---

## 案例 3：使用 grid-template-areas 直观定义布局

### 目标

掌握命名网格区域，学会用"图形化"方式定义布局结构。

### HTML

```html
<div class="layout">
  <header>头部</header>
  <aside>侧边栏</aside>
  <main>主内容</main>
  <footer>页脚</footer>
</div>
```

### CSS

```css
.layout {
  display: grid;
  grid-template-columns: 200px 1fr 200px;
  grid-template-rows: 60px 1fr 60px;
  gap: 10px;
  height: 100vh;

  /* 用字符串"画出"布局结构 */
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

header {
  grid-area: header;
  background: #333;
  color: white;
}

aside {
  grid-area: sidebar;
  background: #f0f0f0;
}

main {
  grid-area: main;
  background: #fff;
}

footer {
  grid-area: footer;
  background: #333;
  color: white;
}
```

### 效果

经典的"圣杯布局"：头部 + 左中右三栏 + 页脚。

### 关键理解

- `grid-template-areas` 让布局一目了然
- 每个字符串代表一行网格
- 相同的区域名（如多个 `header`）表示该项目跨越多列
- 使用 `grid-area: 名称` 将元素分配到对应区域
- 修改布局时只需改字符串，元素 CSS 无需改动

---

## 案例 4：使用 repeat() 简化重复代码

### 目标

掌握 `repeat()` 函数，学会简化多列/行定义。

### HTML

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

### CSS

```css
.gallery {
  display: grid;
  /* repeat(3, 1fr) 等同于 1fr 1fr 1fr */
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
}

.card {
  aspect-ratio: 1; /* 保持1:1正方形比例 */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 8px;
}
```

### 效果

6 个卡片自动排成 3 列，每列等宽。

### 关键理解

- `repeat(次数, 值)` 重复指定次数的值
- `repeat(3, 1fr)` 等价于 `1fr 1fr 1fr`
- `aspect-ratio: 1` 保持元素的宽高比为 1:1
- 相比硬编码列数，更灵活易维护

---

## 案例 5：使用 auto-fit 实现响应式卡片网格

### 目标

掌握 `auto-fit` 和 `minmax()`，实现自适应响应式布局。

### HTML

```html
<div class="auto-gallery">
  <div class="card">卡片 1</div>
  <div class="card">卡片 2</div>
  <div class="card">卡片 3</div>
  <div class="card">卡片 4</div>
  <div class="card">卡片 5</div>
  <!-- 增加或减少卡片，列数会自动调整 -->
</div>
```

### CSS

```css
.auto-gallery {
  display: grid;
  /* 自动根据容器宽度调整列数 */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}
```

### 效果

- 容器宽度足够放 4 列 → 显示 4 列
- 容器宽度只能放 3 列 → 自动调整为 3 列，每列自动扩展
- 容器宽度很小 → 自动调整为 1 列，卡片铺满宽度

### 关键理解

- `minmax(250px, 1fr)` 表示列宽最小 250px，最大占 1fr
- `auto-fit` 根据容器宽度自动计算最多能放多少列
- 多余的空列会**折叠**，现有卡片自动扩展
- 无需媒体查询，自动响应式
- 改变浏览器宽度可观察到列数自动变化

---

## 案例 6：使用 grid-auto-rows 控制自动行高

### 目标

理解 `grid-auto-rows`，掌握在项目数超出定义范围时如何控制行高。

### HTML

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

### CSS

```css
.feed {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 150px); /* 只定义前2行 */
  grid-auto-rows: 100px; /* 后续自动创建的行都是100px */
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

### 效果

前 2 个项目高度 150px，后续 4 个项目高度 100px，排列整齐。

### 关键理解

- `grid-template-rows: repeat(2, 150px)` 只定义前 2 行
- 项目 3-6 超出定义范围，Grid 自动创建新行
- `grid-auto-rows: 100px` 控制自动创建的行高都是 100px
- 如果不设置 `grid-auto-rows`，自动行会根据内容缩放，可能不整齐

---

## 案例 7：使用 span 跨越多个网格单元

### 目标

掌握 `grid-column: span` 和 `grid-row: span`，学会让项目占据多个格子。

### HTML

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

### CSS

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
  /* 占2列，占2行 */
  grid-column: span 2;
  grid-row: span 2;
}

.item.tall {
  /* 占2行 */
  grid-row: span 2;
}
```

### 效果

大项目占据 2×2 的区域，tall 项目占 2 行，其他项目占 1×1。

### 关键理解

- `grid-column: span 2` 表示跨越 2 列
- `grid-row: span 2` 表示跨越 2 行
- `span 数字` 会从当前位置开始计算
- 结合 `grid-template-columns` 和 `grid-auto-rows`，能构建复杂的不规则布局

---

## 案例 8：完整实战 - 仪表盘布局

### 目标

综合运用前面学到的所有属性，创建一个真实的仪表盘布局。

### HTML

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
      <div>订单 #003 - $789</div>
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

### CSS

```css
.dashboard {
  display: grid;
  /* 4列布局 */
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 180px;
  gap: 20px;
  padding: 20px;
  background: #f5f5f5;
}

.header {
  /* 占整行 */
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

/* 大卡片占2x2 */
.card.card-large {
  grid-column: span 2;
  grid-row: span 2;
  justify-content: flex-end;
}

.card.card-large .number {
  font-size: 40px;
}

/* 宽卡片占2列 */
.card.card-wide {
  grid-column: span 2;
}

.mini-list {
  font-size: 12px;
  color: #666;
}

.mini-list div {
  margin: 4px 0;
}

/* 响应式：平板端 */
@media (max-width: 1024px) {
  .dashboard {
    grid-template-columns: repeat(2, 1fr);
  }

  .card.card-large {
    grid-column: span 2;
  }
}

/* 响应式：手机端 */
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

### 效果

- 桌面端：4 列布局，头部横跨整行，大卡片占 2×2，宽卡片占 2 列
- 平板端：自动调整为 2 列
- 手机端：自动调整为 1 列

### 关键理解

- `grid-column: 1 / -1` 让头部占整行
- `grid-column: span 2` 和 `grid-row: span 2` 创建大卡片
- `grid-auto-rows: 180px` 保持行高一致
- 使用媒体查询在不同屏幕大小下调整 `grid-template-columns`
- 整体布局清晰、易维护、高响应性

---

## 总结与最佳实践

### 学到的 Grid 属性

| 属性                     | 作用           | 常用场景           |
| ------------------------ | -------------- | ------------------ |
| `display: grid`          | 启用 Grid 布局 | 所有 Grid 容器     |
| `grid-template-columns`  | 定义列宽       | 固定列数布局       |
| `grid-template-rows`     | 定义行高       | 固定行数布局       |
| `grid-template-areas`    | 命名区域       | 复杂布局结构       |
| `gap`                    | 设置间距       | 所有需要间距的布局 |
| `1fr`                    | 分数单位       | 自适应宽度         |
| `repeat()`               | 重复值         | 简化多列/行代码    |
| `minmax()`               | 最小最大值     | 响应式布局         |
| `auto-fit`               | 自动列数       | 卡片网格           |
| `grid-auto-rows`         | 自动行高       | 项目数不定的情况   |
| `span`                   | 跨越单元格     | 不规则布局         |
| `grid-column / grid-row` | 指定位置       | 精确定位项目       |

### 3 条设计原则

1. **从容器开始**：先定义容器的列和行，再放置项目
2. **优先使用 grid-template-areas**：代码更直观，维护更容易
3. **响应式优先**：使用 `auto-fit` 和 `minmax()`，无需或少用媒体查询

### 下一步建议

- 🎨 尝试修改案例中的数值，观察效果变化
- 📱 在不同屏幕大小下测试响应式布局
- 🚀 用 Grid 重新设计你的项目布局
- 📖 深入学习高级特性：`auto-fill`、`grid-auto-flow`、命名网格线等

---

**祝你学习愉快！通过这 8 个案例的实践，你已经掌握了 Grid 布局的核心，可以应对大部分实际项目需求。** 🎉
