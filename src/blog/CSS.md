---
title: "CSS"
pubDate: 2026-01-24
description: "CSS基础深度复习"
author: "海川"
image:
  url: ""
  alt: ""
tags: ["CSS"]
---

## 一、CSS 基础概念

### 1. 什么是 CSS？

- Cascading Style Sheets，层叠样式表
- 与HTML配合使用，定义网页的样式和排版
- 遵循"层叠"原则：同一元素被多个规则作用时，按优先级应用

### 2. CSS 的三种引入方式

| 方式       | 语法                                  | 优先级 | 场景               |
| ---------- | ------------------------------------- | ------ | ------------------ |
| 内联样式   | `<div style="color: red;"></div>`     | 最高   | 临时测试           |
| 内部样式   | `<style>div { color: red; }</style>`  | 中     | 单个页面           |
| 外部样式表 | `<link rel="stylesheet" href="*.css"` | 最低   | 生产环境、代码复用 |

### 3. CSS 层叠性和继承性

- **层叠性**：同一元素被多个规则作用，优先级高的规则生效
- **继承性**：父元素的某些属性被子元素继承（如color、font、text等），而某些属性不被继承（如width、height、margin、padding）

## 二、选择器

### 1. 基础选择器

| 选择器   | 示例             | 说明         |
| -------- | ---------------- | ------------ |
| 通用选择 | `*`              | 选中所有元素 |
| 元素选择 | `div`            | 选中所有div  |
| 类选择器 | `.class-name`    | 选中class    |
| ID选择器 | `#id-name`       | 选中id       |
| 属性选择 | `[attr="value"]` | 按属性选中   |

### 2. 组合选择器

| 组合方式 | 示例           | 说明                 |
| -------- | -------------- | -------------------- |
| 后代选择 | `div p`        | div中所有p（任意层） |
| 子选择器 | `div > p`      | div的直接子元素p     |
| 相邻选择 | `h1 + p`       | 紧接在h1后的p        |
| 兄弟选择 | `h1 ~ p`       | h1后的所有兄弟p      |
| 分组选择 | `div, p, span` | 多个选择器合并       |

### 3. 伪类和伪元素

**伪类**：表示元素的某种状态

| 伪类                 | 说明           | 示例               |
| -------------------- | -------------- | ------------------ |
| `:hover`             | 鼠标悬停       | `a:hover`          |
| `:active`            | 被激活（按下） | `a:active`         |
| `:focus`             | 获得焦点       | `input:focus`      |
| `:visited`           | 已访问链接     | `a:visited`        |
| `:first-child`       | 第一个子元素   | `li:first-child`   |
| `:last-child`        | 最后一个子元素 | `li:last-child`    |
| `:nth-child(n)`      | 第n个子元素    | `li:nth-child(2n)` |
| `:not(selector)`     | 否定选择器     | `li:not(.active)`  |
| `:enabled/:disabled` | 表单启用/禁用  | `input:disabled`   |

**伪元素**：创建虚拟元素，用双冒号表示

| 伪元素           | 说明             | 示例                          |
| ---------------- | ---------------- | ----------------------------- |
| `::before`       | 在元素前插入内容 | `p::before { content: "★"; }` |
| `::after`        | 在元素后插入内容 | `p::after { content: "★"; }`  |
| `::first-line`   | 第一行文本       | `p::first-line`               |
| `::first-letter` | 第一个字符       | `p::first-letter`             |
| `::selection`    | 被选中的文本     | `p::selection`                |

### 4. 选择器优先级

优先级从高到低：**行内样式 > ID选择器 > 类选择器/属性选择器/伪类 > 元素选择器 > 通用选择器**

**优先级计算规则**：用四元组表示 `(a, b, c, d)`，从左到右比较

- **a** = 行内样式个数（1 或 0）
- **b** = ID选择器个数
- **c** = 类、属性选择器、伪类个数
- **d** = 元素选择器个数

**示例分析**：

| 选择器                    | 计算过程                          | 优先级       |
| ------------------------- | --------------------------------- | ------------ |
| `#header .nav > li:hover` | 1个ID + 1个类 + 1个伪类 + 1个元素 | (0, 1, 2, 1) |
| `.btn.active`             | 2个类                             | (0, 0, 2, 0) |
| `div p`                   | 2个元素                           | (0, 0, 0, 2) |
| `style="color: red"`      | 行内样式                          | (1, 0, 0, 0) |

**比较方式**：从左到右逐位比较，前面的权重更高

- `(1, 0, 0, 0)` > `(0, 1, 0, 0)` → 行内样式 > ID选择器
- `(0, 1, 0, 0)` > `(0, 0, 3, 3)` → 1个ID > 3个类 + 3个元素

**！important 是最高优先级，但应避免使用**

## 三、盒模型

### 1. 盒模型的组成

```
┌─────────────────────────────────┐
│          margin（外边距）       │
│ ┌─────────────────────────────┐ │
│ │ border（边框）              │ │
│ │ ┌─────────────────────────┐ │ │
│ │ │ padding（内边距）       │ │ │
│ │ │ ┌───────────────────┐   │ │ │
│ │ │ │ content（内容）   │   │ │ │
│ │ │ └───────────────────┘   │ │ │
│ │ └─────────────────────────┘ │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### 2. box-sizing 属性

| 值            | 说明               | width/height               |
| ------------- | ------------------ | -------------------------- |
| `content-box` | 标准盒模型（默认） | 仅包含content              |
| `border-box`  | IE盒模型           | 包含content+padding+border |

```css
/* 统一使用 border-box，便于计算尺寸 */
* {
  box-sizing: border-box;
}
```

### 3. 常用盒模型属性

```css
.box {
  /* 内容 */
  width: 200px;
  height: 100px;

  /* 内边距 */
  padding: 10px; /* 四个方向 */
  padding: 10px 20px; /* 上下、左右 */
  padding: 10px 20px 30px 40px; /* 上、右、下、左 */

  /* 边框 */
  border: 1px solid #333;
  border-radius: 4px; /* 圆角 */
  border-top-left-radius: 50%; /* 单个角 */

  /* 外边距 */
  margin: 10px;
  margin: auto; /* 居中 */

  /* 外边距折叠：相邻元素的margin会合并为较大值 */
}
```

### 4. 水平居中和垂直居中

```css
/* 文本/行内元素水平居中 */
.container {
  text-align: center;
}

/* 块元素水平居中 */
.container {
  width: 200px;
  margin: 0 auto;
}

/* Flexbox 居中（推荐） */
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 300px;
}

/* Grid 居中（推荐） */
.container {
  display: grid;
  place-items: center; /* 水平、垂直同时居中 */
  height: 300px;
}
```

## 四、布局

### 1. 文档流

- 正常的排版流，块元素从上到下，行内元素从左到右
- `display: block`：块元素（独占一行）
- `display: inline`：行内元素（不独占一行）
- `display: inline-block`：行内块（既不独占行，又能设置宽高）

### 2. 浮动（float）

```css
.float {
  float: left; /* 左浮动 */
  float: right; /* 右浮动 */
  float: none; /* 不浮动 */
}

/* 清除浮动 */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

**浮动应用场景：**

- ✅ 文字环绕图片
- ✅ 多列布局（已被Flexbox/Grid代替）
- ⚠️ 现已大多被Flexbox和Grid取代

### 3. 定位（position）

| 值         | 说明                           | 定位参考 |
| ---------- | ------------------------------ | -------- |
| `static`   | 默认，按正常流排列             | -        |
| `relative` | 相对定位，相对于自身原位置     | 自身     |
| `absolute` | 绝对定位，相对于最近的定位祖先 | 定位祖先 |
| `fixed`    | 固定定位，相对于视口           | 视口     |
| `sticky`   | 粘性定位，滚动到位置时固定     | 视口     |

### 4. Flexbox 布局

Flexbox是一维布局模型，适合处理单行或单列的灵活布局。

```css
.container {
  display: flex;

  /* 主轴方向 */
  flex-direction: row; /* row | column | row-reverse | column-reverse */

  /* 主轴对齐 */
  justify-content: flex-start; /* flex-start | center | flex-end | space-between | space-around | space-evenly */

  /* 交叉轴对齐 */
  align-items: center; /* flex-start | center | flex-end | stretch */

  /* 换行 */
  flex-wrap: wrap; /* wrap | nowrap | wrap-reverse */

  /* 行对齐 */
  align-content: center; /* 类似justify-content */

  gap: 10px; /* 间隙 */
}

.item {
  /* 放大因子 */
  flex-grow: 1;

  /* 缩小因子 */
  flex-shrink: 1;

  /* 基础大小 */
  flex-basis: 200px;

  /* 简写 */
  flex: 1; /* 等价于 flex: 1 1 0 */

  /* 单个项目对齐 */
  align-self: center;
}
```

### 5. Grid 布局

Grid是二维布局模型，适合处理复杂的行列布局。

```css
.container {
  display: grid;

  /* 定义列 */
  grid-template-columns: 200px 1fr 200px; /* 固定+弹性+固定 */
  grid-template-columns: repeat(3, 1fr); /* 3等列 */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* 响应式 */

  /* 定义行 */
  grid-template-rows: 100px 200px;

  /* 间隙 */
  gap: 10px 20px; /* 行 列 */
  row-gap: 10px;
  column-gap: 20px;

  /* 主轴对齐 */
  justify-items: center; /* 水平对齐单元格内容 */

  /* 交叉轴对齐 */
  align-items: center; /* 垂直对齐单元格内容 */
}

.item {
  /* 跨越列 */
  grid-column: 1 / 3; /* 从第1列到第3列 */
  grid-column: span 2; /* 跨越2列 */

  /* 跨越行 */
  grid-row: 1 / 4;
}
```

## 五、文本和字体

### 1. 文本属性

```css
.text {
  /* 字体 */
  font-family: "微软雅黑", Arial, sans-serif;
  font-size: 16px;
  font-weight: 700; /* 400(normal) | 700(bold) */
  font-style: italic; /* normal | italic | oblique */
  line-height: 1.5; /* 行高 */
  letter-spacing: 2px; /* 字间距 */
  word-spacing: 5px; /* 词间距 */

  /* 文本对齐 */
  text-align: center; /* left | right | center | justify */

  /* 文本装饰 */
  text-decoration: underline; /* none | underline | overline | line-through */
  text-decoration-color: red;
  text-decoration-style: dashed;

  /* 文本转换 */
  text-transform: uppercase; /* uppercase | lowercase | capitalize */

  /* 文本阴影 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  /* 文本溢出 */
  white-space: nowrap; /* 不换行 */
  overflow: hidden;
  text-overflow: ellipsis; /* 省略号 */

  /* 多行省略 */
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 显示3行 */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* @font-face 自定义字体 */
@font-face {
  font-family: "MyFont";
  src: url("/fonts/myfont.woff2") format("woff2");
}
```

### 2. 字体简写

```css
/* font: [style] [weight] [size]/[line-height] [family] */
.text {
  font:
    italic bold 16px/1.5 "微软雅黑",
    sans-serif;
}
```

## 六、颜色和背景

### 1. 颜色表示方法

```css
.color {
  /* 颜色名称 */
  color: red;

  /* 十六进制 */
  color: #ff0000;
  color: #f00; /* 简写 */

  /* RGB */
  color: rgb(255, 0, 0);
  color: rgba(255, 0, 0, 0.5); /* 带透明度 */

  /* HSL */
  color: hsl(0, 100%, 50%);
  color: hsla(0, 100%, 50%, 0.5);

  /* 关键字 */
  color: transparent;
}
```

### 2. 背景属性

```css
.background {
  /* 背景色 */
  background-color: #f0f0f0;

  /* 背景图 */
  background-image: url("/image.png");
  background-repeat: no-repeat; /* repeat | no-repeat | repeat-x | repeat-y */
  background-position: center; /* left/center/right top/center/bottom */
  background-size: contain; /* cover | contain | 100% 100px */
  background-attachment: fixed; /* 固定或滚动 */

  /* 简写 */
  background: #f0f0f0 url("/image.png") no-repeat center / cover;

  /* 渐变 */
  background: linear-gradient(90deg, red, blue); /* 线性渐变 */
  background: radial-gradient(circle, red, blue); /* 径向渐变 */
  background: conic-gradient(red, yellow, lime, aqua, blue, red); /* 圆锥渐变 */
}
```

## 七、边框和阴影

### 1. 边框

```css
.border {
  /* 单个方向 */
  border-top: 1px solid #333;
  border-right: 2px dashed red;
  border-bottom: 3px dotted blue;
  border-left: 4px double green;

  /* 简写 */
  border: 1px solid #333;

  /* 圆角 */
  border-radius: 8px; /* 所有角 */
  border-radius: 8px 10px 12px 14px; /* 上左、上右、下右、下左 */
  border-radius: 50%; /* 圆形 */

  /* 边框样式 */
  border-style: solid | dashed | dotted | double;
}
```

### 2. 阴影

```css
.shadow {
  /* 盒子阴影：box-shadow: x偏移 y偏移 模糊距离 [扩散距离] 颜色 [inset] */
  /* 右下2px，模糊4px，黑色半透明 */
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);

  /*外部阴影：下移4px，模糊8px 内部阴影：内边1px，淡黑色 */
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(0, 0, 0, 0.1);

  /* 文本阴影：text-shadow: x偏移 y偏移 模糊距离 颜色 */
  /* 右下1px，模糊2px，黑色半透明 */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}
```

## 八、过渡和动画

### 1. 过渡（Transition）

过渡是属性值在一段时间内的平滑变化。

```css
.button {
  background-color: blue;
  /* 属性 时间 缓动函数 */
  transition: background-color 0.3s ease;

  /* 可单独指定 */
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0.1s; /* 延迟 */
}

.button:hover {
  background-color: red;
}

/* 过渡多个属性 */
.box {
  transition:
    width 0.3s,
    height 0.4s,
    transform 0.5s;
  /* 或 */
  transition: all 0.3s;
}
```

**缓动函数**
| 值 | 说明 |
| ------------- | ------------ |
| `linear` | 匀速 |
| `ease` | 缓入缓出（默认） |
| `ease-in` | 缓入 |
| `ease-out` | 缓出 |
| `ease-in-out` | 缓入缓出 |

### 2. 动画（Animation）

动画是一系列关键帧的组合。

```css
/* 定义动画 */
@keyframes slide {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(100px);
  }
  100% {
    transform: translateX(0);
  }
}

.box {
  animation: slide 2s ease-in-out infinite;
  /* 属性    时间  缓动函数   重复次数 */

  /* 单独指定 */
  animation-name: slide;
  animation-duration: 2s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-direction: alternate; /* 来回 */
  animation-fill-mode: forwards; /* 保持最后状态 */
  animation-play-state: running; /* 暂停或运行 */
}
```

## 九、变换（Transform）

变换用于2D或3D旋转、缩放、倾斜、平移元素。

```css
.transform {
  /* 2D变换 */
  transform: translateX(50px); /* 平移X */
  transform: translateY(50px); /* 平移Y */
  transform: translate(50px, 30px); /* 平移XY */
  transform: scaleX(1.5); /* 缩放X */
  transform: scaleY(0.8); /* 缩放Y */
  transform: scale(1.5); /* 缩放 */
  transform: rotate(45deg); /* 旋转 */
  transform: skewX(10deg); /* 倾斜X */
  transform: skewY(10deg); /* 倾斜Y */

  /* 3D变换 */
  transform: rotateX(45deg);
  transform: rotateY(45deg);
  transform: rotateZ(45deg);
  transform: translate3d(10px, 20px, 30px);
  transform: scale3d(1.5, 1.5, 1.5);

  /* 多个变换 */
  transform: translate(50px) rotate(45deg) scale(1.2);

  /* 变换基点 */
  transform-origin: center; /* 默认中心 */
  transform-origin: left top;
  transform-origin: 50% 50%;

  /* 3D效果 */
  perspective: 1000px; /* 视距 */
  transform-style: preserve-3d; /* 保持3D */
}
```

## 十、响应式设计

### 1. 媒体查询

```css
/* 基础语法 */
@media (condition) {
  /* 样式 */
}

/* 常用条件 */
@media (max-width: 768px) {
  /* 小于等于768px */
  .container {
    width: 100%;
  }
}

@media (min-width: 1024px) {
  /* 大于等于1024px */
  .container {
    width: 1200px;
  }
}

@media (min-width: 768px) and (max-width: 1024px) {
  /* 范围 */
  .container {
    width: 100%;
  }
}

@media (orientation: landscape) {
  /* 横屏 */
}

@media (orientation: portrait) {
  /* 竖屏 */
}

/* 打印样式 */
@media print {
  .no-print {
    display: none;
  }
}
```

### 2. 响应式单位

| 单位   | 说明                   | 示例                |
| ------ | ---------------------- | ------------------- |
| `px`   | 像素（绝对）           | `width: 200px`      |
| `%`    | 相对于父元素           | `width: 50%`        |
| `em`   | 相对于元素自身字体大小 | `font-size: 1.5em`  |
| `rem`  | 相对于根元素字体大小   | `font-size: 1.5rem` |
| `vw`   | 视口宽度的1%           | `width: 100vw`      |
| `vh`   | 视口高度的1%           | `height: 100vh`     |
| `vmin` | 视口最小值的1%         | `width: 50vmin`     |
| `vmax` | 视口最大值的1%         | `width: 50vmax`     |

```css
html {
  font-size: 16px; /* 基础字体 */
}

.container {
  width: 90vw; /* 视口宽度的90% */
  max-width: 1200px;
}

.text {
  font-size: 1.5rem; /* 24px（1.5 * 16px） */
}
```

### 3. 响应式网格

```css
/* 使用Grid的响应式布局 */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

/* 使用Flexbox的响应式布局 */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 calc(25% - 20px); /* 每行4张 */
  min-width: 200px;
}

@media (max-width: 768px) {
  .card {
    flex: 1 1 calc(50% - 20px); /* 小屏2张 */
  }
}

@media (max-width: 480px) {
  .card {
    flex: 1 1 100%; /* 超小屏1张 */
  }
}
```

## 十一、常见属性速查

### 1. Display 相关

```css
display: block; /* 块元素 */
display: inline; /* 行内元素 */
display: inline-block; /* 行内块 */
display: flex; /* Flex布局 */
display: grid; /* Grid布局 */
display: none; /* 隐藏元素 */
visibility: hidden; /* 隐藏但占空间 */
visibility: visible; /* 显示 */
```

### 2. 常用属性

```css
/* 透明度 */
opacity: 0.5;

/* 溢出处理 */
overflow: visible | hidden | scroll | auto;
overflow-x: auto;
overflow-y: hidden;

/* 光标 */
cursor: pointer | hand | move | text | default;

/* Z轴堆叠 */
z-index: 10;

/* 点击事件 */
pointer-events: none; /* 穿透点击 */

/* 用户选择 */
user-select: none; /* 禁止选择 */
```

## 十二、BFC（块级格式化上下文）

BFC是一个独立的渲染区域，内部的元素不会影响外部。

### 1. 触发 BFC 的条件

- ✅ `float` 不为 none
- ✅ `position` 为 absolute 或 fixed
- ✅ `display` 为 flex、grid、inline-block 等
- ✅ `overflow` 不为 visible
- ✅ `display: table-cell` 等表格相关

### 2. BFC 的应用

```css
/* 清除浮动 */
.clearfix {
  overflow: auto; /* 创建BFC */
}

/* 防止外边距折叠 */
.container {
  overflow: auto; /* 创建BFC */
}

/* 自适应两列布局 */
.left {
  float: left;
  width: 200px;
}

.right {
  overflow: auto; /* 创建BFC，自动适应剩余宽度 */
}
```

## 十三、预处理器简介

### 1. SCSS/SASS

SCSS是CSS的超集，提供变量、嵌套、混入等功能。

```scss
// 变量
$primary-color: #3498db;
$base-padding: 10px;

// 嵌套
.container {
  width: 100%;

  .header {
    background-color: $primary-color;
    padding: $base-padding;
  }
}

// 混入
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  @include flex-center;
  height: 300px;
}

// 继承
.btn {
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.btn-primary {
  @extend .btn;
  background-color: $primary-color;
}
```

### 2. Less

Less语法与SCSS类似，同样提供变量、嵌套等。

```less
@primary-color: #3498db;

.container {
  width: 100%;

  .header {
    background-color: @primary-color;
  }
}
```

## 十四、常见问题解决

### 1. 去除默认样式

```css
/* 重置浏览器默认样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

/* 或使用 normalize.css */
```

### 2. 1px 边框问题

移动端1px边框在高分屏显示较粗。

```css
.border {
  border: 1px solid #ddd; /* 普通1px边框 */
  transform: scaleY(0.5); /* 垂直缩小一半 */
  transform-origin: 0 0; /* 缩放基点为左上角 */
}

/* 或使用伪元素 */
.border::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: #ddd;
  transform: scaleY(0.5);
  transform-origin: 0 0;
}
```

### 3. 高清图片处理

主要针对高分辨率（如 Retina 屏）下图片模糊的问题

```css
/* 图片在不同屏幕宽度下都能自适应，不会变形 */
img {
  width: 100%;
  height: auto;
  display: block;
}

/* 高分屏用2倍分辨率的图片 */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  .logo {
    background-image: url("logo@2x.png");
    background-size: 200px 100px;
  }
}
```

## 十五、性能优化

### 1. 减少重排和重绘

```javascript
// ❌ 不好：多次重排
for (let i = 0; i < 1000; i++) {
  element.style.width = i + "px"; // 每次都会触发重排
}

// ✅ 好：一次重排
element.style.width = "1000px";

// ✅ 好：使用 transform 不触发重排
element.style.transform = "translateX(1000px)";
```

### 2. CSS 最佳实践

```css
/* ✅ 使用class而不是ID */
.button {
}

/* ✅ 简化选择器 */
.nav > .item {
} /* 而不是 body > div > nav > ul > li > a */

/* ✅ 避免过度嵌套 */
.container .header .title {
} /* 最多3层 */

/* ✅ 使用 transform 和 opacity 做动画 */
.animate {
  animation: slide 1s;
}

@keyframes slide {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100px);
  }
}
```

### 3. 避免常见问题

```css
/* ❌ 避免通用选择器 */
* {
  color: black;
}

/* ❌ 避免过多媒体查询 */
@media (max-width: 600px) {
}
@media (max-width: 700px) {
}

/* ✅ 合理组织 */
@media (max-width: 768px) {
  /* 所有小屏样式 */
}
```
