---
title: "ES6+核心特性"
pubDate: 2026-01-27T07:44:21.284Z
description: "从 let/const 到 async/await，深度掌握 ES6+ 的 12 个核心特性，包括语法糖、模块化、异步编程，和最佳实践"
author: "海川"
image:
  url: ""
  alt: ""
tags: ["JS", "ES6+", "教程"]
---

## 前言

ES6（2015）是 JavaScript 的"大转折"。从那时起，JavaScript 从"浏览器脚本语言"演变成"现代编程语言"。

10 年过去了，ES6+ 的特性已经融入每个前端开发者的日常。但很多人只是"会用"，不一定"理解"。本文从**设计初衷**、**实际用法**、**常见坑**到**最佳实践**，帮你彻底掌握 ES6+ 的 12 个核心特性。

---

## 一、核心速览（60 秒）

| 特性              | ES5             | ES6+                 | 核心优势                       |
| ----------------- | --------------- | -------------------- | ------------------------------ |
| **变量声明**      | `var`           | `let`/`const`        | 块级作用域，消除 hoisting 混乱 |
| **箭头函数**      | 普通函数        | `() => {}`           | 简洁语法，自动绑定 `this`      |
| **模板字符串**    | 字符串拼接      | `` `${expr}` ``      | 多行、插值、标签模板           |
| **解构**          | 手动赋值        | `const {a, b} = obj` | 优雅提取数据                   |
| **默认参数**      | `if (!x) x = 1` | `(x = 1) => {}`      | 函数参数安全                   |
| **展开运算符**    | `.apply()`      | `...arr`             | 数组/对象合并、参数转发        |
| **Promise**       | 回调地狱        | `async/await`        | 链式异步，代码清晰             |
| **Class**         | 构造函数        | `class User {}`      | 面向对象编程                   |
| **模块化**        | 全局 + IIFE     | `import/export`      | 代码组织，避免污染             |
| **for...of**      | `for/forEach`   | `for (item of arr)`  | 统一的迭代方式                 |
| **Map/Set**       | 对象和数组      | 专用数据结构         | 更高效的键值对和去重           |
| **Proxy/Reflect** | 直接访问属性    | 拦截和元编程         | 数据响应式系统                 |

---

## 二、变量声明（let/const）

### var 的问题

```javascript
// ❌ 问题 1：没有块级作用域
if (true) {
  var x = 1;
}
console.log(x); // 1（全局泄漏）

// ❌ 问题 2：变量提升（hoisting）混乱
console.log(y); // undefined（而不是报错）
var y = 2;

// ❌ 问题 3：可以重复声明
var a = 1;
var a = 2; // 没有警告，易出错
```

### let：块级作用域

```javascript
// ✅ 块级作用域
if (true) {
  let x = 1;
}
console.log(x); // ReferenceError（不泄漏）

// ✅ 循环中的独立作用域
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 输出：0, 1, 2（而不是 3, 3, 3）

// ✅ 暂时死区（Temporal Dead Zone）
console.log(z); // ReferenceError（没有提升）
let z = 3;
```

### const：常量声明

```javascript
// ✅ 声明常量
const PI = 3.14159;
PI = 3; // TypeError（不可重新赋值）

// ⚠️ 对象属性可以修改
const user = { name: "Alice" };
user.name = "Bob"; // ✅ 可以（修改属性）
user = {}; // ❌ 不行（重新赋值）

// ✅ 冻结对象
Object.freeze(user); // 完全不可修改
```

### 何时使用

| 场景         | 推荐    | 原因                 |
| ------------ | ------- | -------------------- |
| 常量、配置   | `const` | 默认不可变，更安全   |
| 会被重新赋值 | `let`   | 表明意图：这个值会变 |
| 不要用 `var` | 永远    | 容易产生 Bug         |

**最佳实践**：默认用 `const`，需要重新赋值时用 `let`，永远不用 `var`。

---

## 三、箭头函数

### 基本语法

```javascript
// 传统函数
function add(a, b) {
  return a + b;
}

// 箭头函数
const add = (a, b) => {
  return a + b;
};

// 简化（单个表达式自动 return）
const add = (a, b) => a + b;

// 无参数需要括号
const getRandom = () => Math.random();

// 返回对象需要加括号
const createUser = (name) => ({ name, age: 0 });
```

### 箭头函数 vs 普通函数

| 特性               | 普通函数           | 箭头函数                |
| ------------------ | ------------------ | ----------------------- |
| **this 绑定**      | 动态（调用时确定） | 静态（定义时确定）      |
| **可作构造函数**   | ✅ `new func()`    | ❌ 不行                 |
| **arguments 对象** | ✅ 有              | ❌ 没有（用 rest 参数） |
| **prototype**      | ✅ 有              | ❌ 没有                 |
| **简洁度**         | 普通               | 更简洁                  |

### this 绑定的重要性

```javascript
// 传统函数：this 动态绑定
const user = {
  name: "Alice",
  greet: function () {
    console.log(this.name); // "Alice"
  },
  delayedGreet: function () {
    setTimeout(function () {
      console.log(this.name); // undefined（this 是 window）
    }, 1000);
  },
};

user.greet(); // "Alice"
user.delayedGreet(); // undefined

// ✅ 箭头函数：this 从外层继承
const user = {
  name: "Bob",
  delayedGreet: function () {
    setTimeout(() => {
      console.log(this.name); // "Bob"（继承外层的 this）
    }, 1000);
  },
};

user.delayedGreet(); // "Bob"
```

### 常见错误

```javascript
// ❌ 错误 1：用箭头函数作为方法
// 箭头函数没有自己的 this，它会捕获定义时所处位置的 this。
// 这里的 user 对象并不能创建一个新的作用域，所以箭头函数直接“向上看”，找到了全局作用域
const user = {
  name: "Alice",
  greet: () => {
    console.log(this.name); // undefined（this 指向全局）
  },
};

// ✅ 正确
const user = {
  name: "Alice",
  greet() {
    console.log(this.name); // "Alice"
  },
};

// ❌ 错误 2：不能作为构造函数
const User = () => {};
new User(); // TypeError

// ✅ 正确
function User() {}
new User(); // ✅
```

**最佳实践**：

- 回调函数、数组方法用箭头函数 ✅
- 对象方法、构造函数用普通函数 ✅

---

## 四、模板字符串

### 基本用法

```javascript
// ES5：字符串拼接很麻烦
const name = "Alice";
const age = 30;
const msg = "Hello, " + name + ". You are " + age + " years old.";

// ES6：模板字符串
const msg = `Hello, ${name}. You are ${age} years old.`;

// 多行字符串
const html = `
  <div class="container">
    <h1>${title}</h1>
    <p>${description}</p>
  </div>
`;
```

### 表达式和函数调用

```javascript
// 任何有效的 JavaScript 表达式都可以
const x = 10,
  y = 20;
`${x} + ${y} = ${x + y}`; // "10 + 20 = 30"

// 函数调用
const greet = (name) => `Hello, ${name}`;
`I say: ${greet("Bob")}`; // "I say: Hello, Bob"

// 三元表达式
const age = 25;
`You are ${age >= 18 ? "adult" : "minor"}`; // "You are adult"

// 嵌套模板字符串
const level = "warning";
const msg = `Alert: ${`<${level}>Error</>`}`;
```

### 标签模板（高级特性）

标签模板中函数不需要括号。

```javascript
// 自定义格式化函数
function highlight(strings, ...values) {
  // strings: 字符串片段数组
  // values: 插值结果数组
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += `**${values[i]}**`; // 用**包装值
    }
  }
  return result;
}

const name = "Alice";
const age = 30;

// JavaScript 引擎会自动把这个字符串拆解成两部分传给函数：
// 1. strings：被${}分割开的普通文本片段——["Name: ", ", Age: ", ""]
// 2. values：所有${}中的变量值——["Alice", 30]
highlight`Name: ${name}, Age: ${age}`;
// "Name: **Alice**, Age: **30**"

// 实际应用：SQL 查询防注入
function sql(strings, ...values) {
  // 对 values 进行转义，防止 SQL 注入
  return strings
    .map((str, i) => str + (values[i] ? escape(values[i]) : ""))
    .join("");
}

const userId = 1;
sql`SELECT * FROM users WHERE id = ${userId}`;
```

---

## 五、解构赋值

### 数组解构

```javascript
// 基本解构
const [a, b, c] = [1, 2, 3];
console.log(a, b, c); // 1, 2, 3

// 跳过元素
const [first, , third] = [1, 2, 3];
console.log(first, third); // 1, 3

// 剩余元素
const [head, ...tail] = [1, 2, 3, 4];
console.log(head, tail); // 1, [2, 3, 4]

// 默认值
const [x = 10, y = 20] = [1];
console.log(x, y); // 1, 20

// 交换变量
let p = 1,
  q = 2;
[p, q] = [q, p];
console.log(p, q); // 2, 1

// 嵌套解构
const [a, [b, c]] = [1, [2, 3]];
console.log(a, b, c); // 1, 2, 3
```

### 对象解构

```javascript
// 基本解构
const { name, age } = { name: "Alice", age: 30 };
console.log(name, age); // Alice, 30

// 重命名
const { name: userName, age: userAge } = { name: "Bob", age: 25 };
console.log(userName, userAge); // Bob, 25

// 默认值
const { role = "user" } = { name: "Charlie" };
console.log(role); // "user"

// 提取部分属性
const { name, ...rest } = { name: "David", age: 28, city: "NY" };
console.log(rest); // { age: 28, city: 'NY' }

// 嵌套对象解构
const {
  user: {
    name,
    address: { city },
  },
} = {
  user: { name: "Eve", address: { city: "LA" } },
};
console.log(name, city); // Eve, LA
```

### 函数参数解构

```javascript
// 数组参数
function sum([a, b]) {
  return a + b;
}
sum([1, 2]); // 3

// 对象参数（非常常用）
function createUser({ name, age = 0, role = "user" }) {
  return { name, age, role };
}
createUser({ name: "Alice", age: 30 }); // { name: 'Alice', age: 30, role: 'user' }

// 嵌套参数
function processData({ user: { name }, items }) {
  return `${name} has ${items.length} items`;
}

// 实际应用：React 中很常见
function Card({ title, children, onClick }) {
  return (
    <div onClick={onClick}>
      <h2>{title}</h2>
      {children}
    </div>
  );
}
```

### 常见错误

```javascript
// ❌ 错误：试图解构 null/undefined
const { a } = null; // TypeError

// ✅ 正确：提供默认值
const { a = 0 } = null || {}; // 0

// ❌ 错误：对象解构变量必须提前声明
{ name } = user; // SyntaxError

// ✅ 正确
const { name } = user; // ✅ 或
let { name };
({ name } = user); // 外面要套括号
```

**最佳实践**：

- 从函数返回多个值时用数组解构
- 从对象提取属性时用对象解构
- 避免深层嵌套解构，层数超过 3 时手动赋值更清晰

---

## 六、默认参数和展开运算符

### 默认参数

```javascript
// ES5：冗长
function greet(name) {
  name = name || "Guest";
  return `Hello, ${name}`;
}

// ES6：简洁
const greet = (name = "Guest") => `Hello, ${name}`;

// ⚠️ 陷阱：0 和 false 会触发默认值
const log = (level = "info") => console.log(level);
log(0); // "info"（0 被当成假值，输出“info”）

// ✅ 检查 undefined
const log = (level = "info") => {
  if (level === undefined) level = "info";
  console.log(level);
};
log(0); // 0

// 默认参数可以引用其他参数
const createRange = (start, end = start + 10) => [start, end];
createRange(0); // [0, 10]

// 默认参数是按需计算的，这叫「惰性求值（Lazy Evaluation）」
// 在很多编程语言中，函数的默认值是在定义时就确定好的。
// 但在 JavaScript 中，默认参数是在函数被调用时才进行计算的。
// 这在生成唯一 ID、记录日志或者设置动态时间戳时非常有用
let id = 0;
const getUser = (userId = ++id) => ({ userId });
getUser(); // { userId: 1 }
getUser(); // { userId: 2 }（每次调用重新计算）
```

### 展开运算符（...）

#### 数组展开

```javascript
// 合并数组
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = [...arr1, ...arr2]; // [1, 2, 3, 4]

// 克隆数组
const original = [1, 2, 3];
const copy = [...original]; // [1, 2, 3]（浅拷贝）

// 添加元素
const numbers = [1, 2, 3];
const extended = [0, ...numbers, 4]; // [0, 1, 2, 3, 4]

// 转换类数组对象
const args = document.querySelectorAll("p");
const arr = [...args]; // NodeList → 真正的数组
```

#### 对象展开

```javascript
// 合并对象
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 }; // { a: 1, b: 2, c: 3, d: 4 }

// 覆盖属性
const defaults = { a: 1, b: 2 };
const options = { ...defaults, b: 99 }; // { a: 1, b: 99 }

// 添加新属性
const user = { name: "Alice" };
const updated = { ...user, email: "alice@ex.com" }; // { name: 'Alice', email: 'alice@ex.com' }

// 不修改原对象
const original = { x: 1 };
const modified = { ...original, y: 2 };
console.log(original); // { x: 1 }（未改动）
```

#### Rest 参数

```javascript
// 收集剩余参数
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

// 分离前几个参数
const [first, ...rest] = [1, 2, 3, 4];
console.log(first, rest); // 1, [2, 3, 4]

// 函数参数转发
function log(level, ...args) {
  console.log(`[${level}]`, ...args);
}
log("INFO", "Server", "started"); // [INFO] Server started
```

### 展开 vs Rest 的区别

| 形式     | 上下文           | 作用                    |
| -------- | ---------------- | ----------------------- |
| `...arr` | 函数调用、字面量 | **展开**数组/对象的元素 |
| `...arr` | 函数参数、解构   | **收集**剩余元素        |

```javascript
// 展开
const arr = [1, 2, 3];
console.log(...arr); // 1 2 3

// Rest
function test(...args) {
  console.log(args); // [1, 2, 3]
}
test(1, 2, 3);
```

---

## 七、Promise 和 async/await

### 从回调地狱到 Promise

```javascript
// ❌ 回调地狱（Callback Hell）
readFile("file1.txt", (err1, data1) => {
  if (err1) throw err1;
  readFile("file2.txt", (err2, data2) => {
    if (err2) throw err2;
    readFile("file3.txt", (err3, data3) => {
      if (err3) throw err3;
      console.log(data1, data2, data3);
    });
  });
});

// ✅ Promise 链式调用
readFile("file1.txt")
  .then((data1) => readFile("file2.txt"))
  .then((data2) => readFile("file3.txt"))
  .then((data3) => console.log(data1, data2, data3))
  .catch((err) => console.error(err));

// ✅✅ async/await 最清晰
async function readFiles() {
  try {
    const data1 = await readFile("file1.txt");
    const data2 = await readFile("file2.txt");
    const data3 = await readFile("file3.txt");
    console.log(data1, data2, data3);
  } catch (err) {
    console.error(err);
  }
}
```

### Promise 基础

```javascript
// 创建 Promise
const promise = new Promise((resolve, reject) => {
  // 异步操作
  if (success) {
    resolve(result); // 成功
  } else {
    reject(error); // 失败
  }
});

// 监听结果
promise
  .then((result) => console.log(result)) // 成功处理
  .catch((error) => console.error(error)) // 错误处理
  .finally(() => console.log("done")); // 无论成功失败

// Promise.all：全部成功才成功
Promise.all([p1, p2, p3])
  .then(([r1, r2, r3]) => console.log(r1, r2, r3))
  .catch((err) => console.log("至少一个失败"));

// Promise.race：第一个完成就返回
Promise.race([p1, p2]).then((result) => console.log("first:", result));

// Promise.allSettled：无论成功失败都等待
Promise.allSettled([p1, p2, p3]).then((results) => console.log(results));
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'rejected', reason: Error }
// ]
```

### async/await：现代异步编程

```javascript
// 基本用法
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
  } catch (err) {
    console.error("Failed:", err);
  }
}

// 并行执行
async function getUsers() {
  // ❌ 顺序执行（慢）
  const user1 = await fetchUser(1);
  const user2 = await fetchUser(2);

  // ✅ 并行执行（快）
  const [user1, user2] = await Promise.all([fetchUser(1), fetchUser(2)]);
}

// 错误处理
async function safe() {
  try {
    const result = await asyncOperation();
    return result;
  } catch (err) {
    console.error("Error:", err);
    throw err; // 继续抛出
  } finally {
    cleanup(); // 总是执行
  }
}

// 在循环中使用
async function processAll(items) {
  // ✅ 逐个处理（按顺序）
  for (const item of items) {
    await process(item);
  }

  // ✅ 全部处理（并行）
  await Promise.all(items.map((item) => process(item)));
}
```

### 常见错误

```javascript
// ❌ 错误 1：忘记 await
async function test() {
  const result = fetch("/api/data"); // 返回 Promise 对象
  console.log(result); // Promise { <pending> }
}

// ✅ 正确
async function test() {
  const result = await fetch("/api/data");
  console.log(result); // Response 对象
}

// ❌ 错误 2：不必要的 async/await
async function getSum(a, b) {
  return a + b; // 不涉及异步操作
}

// ✅ 更好
function getSum(a, b) {
  return a + b;
}

// ❌ 错误 3：混用 then 和 await
async function test() {
  const result = await fetch("/api/data").then((r) => r.json());
  // 混杂了两种风格
}

// ✅ 一致使用 await
async function test() {
  const resp = await fetch("/api/data");
  const result = await resp.json();
}
```

---

## 八、Class（类）

### 从构造函数到 Class

```javascript
// ES5：构造函数和原型
function User(name, age) {
  this.name = name;
  this.age = age;
}
User.prototype.greet = function () {
  return `Hello, ${this.name}`;
};

// ES6：Class 语法
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, ${this.name}`;
  }
}

const user = new User("Alice", 30);
user.greet(); // "Hello, Alice"
```

### 类的核心特性

```javascript
// 继承
class Admin extends User {
  constructor(name, age, role) {
    super(name, age); // 调用父类构造函数
    this.role = role;
  }

  // 重写方法
  greet() {
    return `${super.greet()} (Admin)`;
  }
}

const admin = new Admin("Bob", 35, "superuser");
admin.greet(); // "Hello, Bob (Admin)"

// 静态方法和属性
class Config {
  static version = "1.0.0"; // 静态属性

  static getVersion() {
    // 静态方法
    return Config.version;
  }
}
Config.getVersion(); // "1.0.0"

// Getter 和 Setter
class Circle {
  constructor(radius) {
    this._radius = radius;
  }

  get radius() {
    return this._radius;
  }

  set radius(value) {
    if (value <= 0) throw new Error("Radius must be positive");
    this._radius = value;
  }

  get area() {
    // 计算属性
    return Math.PI * this._radius ** 2;
  }
}

const circle = new Circle(5);
circle.area; // 78.54...
circle.radius = 10; // ✅ 设置时验证
```

### 私有字段（ES2022）

```javascript
// 私有字段用 # 前缀
class BankAccount {
  #balance = 0; // 私有字段

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }

  // 私有方法
  #validate(amount) {
    return amount > 0;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount();
account.deposit(100);
account.#balance; // SyntaxError（无法访问私有字段）
account.getBalance(); // 100
```

### 常见错误

```javascript
// ❌ 错误 1：Class 没有提升
const user = new User(); // ReferenceError
class User {}

// ❌ 错误 2：忘记 super() 调用
class Admin extends User {
  constructor(name, role) {
    this.role = role; // ReferenceError：必须先调用 super()
    super(name);
  }
}

// ❌ 错误 3：this 绑定问题
class Button {
  constructor() {
    this.clicked = false;
  }

  onClick() {
    this.clicked = true;
  }
}

const btn = new Button();
// 此时handler指向了onClick这个函数，但与this的绑定已经断裂
const handler = btn.onClick;
handler(); // TypeError: Cannot set property 'clicked' of undefined

// ✅ 解决：箭头函数或 bind
const handler = btn.onClick.bind(btn);
const handler = () => btn.onClick();
```

---

## 九、模块化（import/export）

### 从 IIFE 到 ES Modules

```javascript
// ❌ ES5：全局污染，IIFE 封装
const MyModule = (function () {
  let private = "secret";
  return {
    public: function () {
      return private;
    },
  };
})();

// ✅ ES6：模块化
// math.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// 或使用 default export
export default function square(x) {
  return x * x;
}

// main.js
import { add, multiply } from "./math.js";
import square from "./math.js";

add(2, 3); // 5
square(5); // 25
```

### 导出方式详解

```javascript
// 命名导出
export const PI = 3.14159;
export function sin(x) { return Math.sin(x); }
export class Point {}

// 导出时重命名
const internal = 'secret';
export { internal as PUBLIC };

// 默认导出（每个模块只能一个）
export default {
  name: 'Default Export'
};

// 同时有默认和命名导出
export default function main() {}
export const helper = () => {};
```

### 导入方式详解

```javascript
// 导入命名导出
import { add, multiply } from "./math.js";

// 导入重命名
import { add as sum } from "./math.js";

// 导入全部
import * as math from "./math.js";
math.add(1, 2); // 3

// 导入默认导出
import Main from "./main.js";

// 同时导入默认和命名
import Default, { named } from "./module.js";

// 动态导入（在运行时）
const moduleName = "dynamic";
import(`./${moduleName}.js`).then((module) => {
  module.default();
});
```

### 循环依赖问题

```javascript
// a.js
import { b } from "./b.js";
export const a = "a";

// b.js
import { a } from "./a.js";
export const b = "b";

// ❌ 会出现循环引用问题

// ✅ 解决 1：重组代码结构
// shared.js
export const shared = "shared";

// a.js
import { shared } from "./shared.js";
export const a = "a";

// ✅ 解决 2：使用动态导入
// a.js
export async function getB() {
  const { b } = await import("./b.js");
  return b;
}
```

---

## 十、for...of 和迭代器

### for 循环对比

```javascript
// 传统 for（ES3）
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
}

// forEach（ES5）
arr.forEach((item, index) => {
  console.log(item);
});

// for...in（遍历所有可枚举属性，包括原型链，容易有 Bug）
for (let index in arr) {
  console.log(arr[index]);
}

// ✅ for...of（ES6，推荐）
for (let item of arr) {
  console.log(item);
}

// 可以用 break 和 continue
for (let item of arr) {
  if (item > 10) break;
  console.log(item);
}
```

### 可迭代对象

```javascript
// 数组、字符串、Map、Set 都是可迭代的
for (const char of "hello") {
  console.log(char); // h e l l o
}

for (const [key, value] of new Map([
  ["a", 1],
  ["b", 2],
])) {
  console.log(key, value); // a 1, b 2
}

for (const item of new Set([1, 2, 2, 3])) {
  console.log(item); // 1 2 3
}

// 对象不是可迭代的
for (const key of { a: 1, b: 2 }) {
  // TypeError: object is not iterable
}

// ✅ 用 Object.entries() 转换
for (const [key, value] of Object.entries({ a: 1, b: 2 })) {
  console.log(key, value);
}
```

### 自定义迭代器

```javascript
// 创建自定义可迭代对象
const range = {
  start: 1,
  end: 5,
  [Symbol.iterator]() {
    let current = this.start;
    return {
      next: () => {
        if (current <= this.end) {
          return { value: current++, done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (const num of range) {
  console.log(num); // 1 2 3 4 5
}

// 使用生成器简化
function* createRange(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

for (const num of createRange(1, 5)) {
  console.log(num); // 1 2 3 4 5
}
```

---

## 十一、Map 和 Set

### Map：有序键值对

```javascript
// 创建 Map
const map = new Map();

// 添加
map.set("key1", "value1");
map.set(1, "number key");
map.set({}, "object key"); // 对象也可以当 key

// 获取
map.get("key1"); // 'value1'
map.get("notexist"); // undefined

// 检查
map.has("key1"); // true

// 删除
map.delete("key1");
map.clear(); // 删除全部

// 遍历
const map = new Map([
  ["a", 1],
  ["b", 2],
]);

for (const [key, value] of map) {
  console.log(key, value);
}

for (const key of map.keys()) {
  console.log(key);
}

for (const value of map.values()) {
  console.log(value);
}

for (const [key, value] of map.entries()) {
  console.log(key, value);
}

// 大小
map.size; // 获取元素个数
```

### Map vs Object

| 特性         | Object                      | Map                      |
| ------------ | --------------------------- | ------------------------ |
| **键的类型** | 字符串 + Symbol             | 任意类型                 |
| **大小**     | `Object.keys(obj).length`   | `map.size`               |
| **性能**     | 查找快                      | 查找快，但频繁增删时更优 |
| **有序性**   | 字符串键无序，Symbol 键在后 | 有序                     |
| **序列化**   | `JSON.stringify()`          | 无内置序列化             |
| **原型**     | 有原型链                    | 没有原型链               |

### Set：去重集合

```javascript
// 创建 Set
const set = new Set();

// 添加
set.add(1);
set.add("1");
set.add(1); // 重复，不添加

// 检查
set.has(1); // true

// 删除
set.delete(1);
set.clear();

// 大小
set.size; // 2

// 遍历
for (const item of set) {
  console.log(item);
}

// 实际应用 1：数组去重
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)]; // [1, 2, 3]

// 实际应用 2：求交集
const set1 = new Set([1, 2, 3]);
const set2 = new Set([2, 3, 4]);
const intersection = new Set([...set1].filter((x) => set2.has(x))); // Set { 2, 3 }

// 实际应用 3：求并集
const union = new Set([...set1, ...set2]); // Set { 1, 2, 3, 4 }

// 实际应用 4：求差集
const diff = new Set([...set1].filter((x) => !set2.has(x))); // Set { 1 }
```

---

## 十二、代理和反射（Proxy/Reflect）

### Proxy：拦截对象操作

```javascript
// 基本用法
const target = { a: 1, b: 2 };
const handler = {
  get(target, prop) {
    console.log(`Getting ${prop}`);
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
};

const proxy = new Proxy(target, handler);
proxy.a; // 输出：Getting a
proxy.b = 10; // 输出：Setting b to 10

// 实际应用 1：数据验证
const validated = new Proxy(
  {},
  {
    set(target, prop, value) {
      if (prop === "age" && value < 0) {
        throw new Error("Age must be positive");
      }
      target[prop] = value;
      return true;
    },
  },
);

validated.age = -1; // Error: Age must be positive

// 实际应用 2：数据响应式（Vue 原理）
function reactive(target) {
  return new Proxy(target, {
    get(target, prop) {
      track(target, prop); // 记录访问
      return target[prop];
    },
    set(target, prop, value) {
      if (target[prop] !== value) {
        target[prop] = value;
        trigger(target, prop); // 触发更新
      }
      return true;
    },
  });
}

// 实际应用 3：负数索引（Python 风格）
const arr = new Proxy([1, 2, 3], {
  get(target, prop) {
    let index = Number(prop);
    if (index < 0) {
      index = target.length + index;
    }
    return target[index];
  },
});

arr[-1]; // 3（最后一个元素）
```

### Reflect：元编程 API

```javascript
// Reflect 提供了与 Proxy handler 对应的方法

// 获取属性
Reflect.get(obj, "prop");
// 等同于 obj.prop

// 设置属性
Reflect.set(obj, "prop", value);
// 等同于 obj.prop = value

// 删除属性
Reflect.deleteProperty(obj, "prop");
// 等同于 delete obj.prop

// 检查属性
Reflect.has(obj, "prop");
// 等同于 'prop' in obj

// 获取属性描述符
Reflect.getOwnPropertyDescriptor(obj, "prop");
// 等同于 Object.getOwnPropertyDescriptor(obj, 'prop')

// 获取原型
Reflect.getPrototypeOf(obj);
// 等同于 Object.getPrototypeOf(obj)

// Proxy + Reflect 配合（最佳实践）
const handler = {
  get(target, prop) {
    console.log(`Accessing ${prop}`);
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  },
};

const proxy = new Proxy({}, handler);
```

---

## 十三、生成器函数

### 基本用法

```javascript
// 生成器函数用 function*
function* generateNumbers() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = generateNumbers();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }

// 用 for...of 遍历
for (const num of generateNumbers()) {
  console.log(num); // 1 2 3
}

// 生成器可以暂停和恢复
function* fibonacci() {
  let a = 0,
    b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
```

### 生成器的双向通信

```javascript
// 可以向生成器发送值
function* echo() {
  const msg = yield "waiting"; // 这里暂停
  console.log(msg);
}

const gen = echo();
gen.next(); // { value: 'waiting', done: false }
gen.next("Hello"); // 传入值，输出：Hello

// 实际应用：Redux Saga 就用这个原理
function* fetchUser(userId) {
  try {
    const response = yield call(fetch, `/api/users/${userId}`);
    const user = yield call(() => response.json());
    yield put({ type: "USER_FETCHED", payload: user });
  } catch (err) {
    yield put({ type: "ERROR", payload: err });
  }
}
```

---

## 十四、常见错误与陷阱

### ❌ 错误 1：混淆 let/const 和 var

```javascript
// ❌ 使用 var 导致作用域泄漏
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 输出：3, 3, 3

// ✅ 用 let 创建块级作用域
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// 输出：0, 1, 2
```

### ❌ 错误 2：对象方法用箭头函数

```javascript
// ❌ this 绑定错误
const user = {
  name: "Alice",
  greet: () => {
    console.log(this.name); // undefined（this 是全局）
  },
};

// ✅ 用普通方法
const user = {
  name: "Alice",
  greet() {
    console.log(this.name); // Alice
  },
};
```

### ❌ 错误 3：忘记 await

```javascript
// ❌ 返回 Promise 对象而不是结果
async function getUser() {
  const user = fetch("/api/users/1");
  return user; // Promise 对象
}

// ✅ 使用 await
async function getUser() {
  const user = await fetch("/api/users/1");
  return user; // Response 对象
}
```

### ❌ 错误 4：误用解构默认值

```javascript
// ❌ 嵌套解构时陷阱
const { user: { name } = {} } = obj;
// 这个默认值只作用于 user，不是 name

// ✅ 如果要安全提取
const { user = {} } = obj;
const { name } = user || {};
```

### ❌ 错误 5：对象键永远是字符串

```javascript
// ❌ 期望数字键
const obj = { 1: "one", 2: "two" };
Object.keys(obj); // ['1', '2']（字符串）

// ✅ 用 Map 存数字键
const map = new Map([
  [1, "one"],
  [2, "two"],
]);
```

---

## 十五、最佳实践

### 1. 优先用 const，需要时用 let

```javascript
// ✅ 默认 const
const PI = 3.14159;
const users = []; // 即使是数组/对象

// 当需要重新赋值时
let counter = 0;
counter++;
```

### 2. 箭头函数 + 解构 = 现代 JavaScript

```javascript
// ✅ 回调函数
array.map((item) => item * 2);
array.filter(({ age }) => age > 18);

// ✅ 异步操作
const users = await fetchUsers();
const { data, total } = users;
```

### 3. 异步操作优先用 async/await

```javascript
// ❌ 混合使用
const data = await fetch("/api").then((r) => r.json());

// ✅ 一致使用 async/await
const resp = await fetch("/api");
const data = await resp.json();
```

### 4. 利用 for...of 做迭代

```javascript
// ✅ 清晰的迭代语法
for (const item of items) {
  process(item);
}

// 比 forEach 更灵活（可以 break/continue）
```

### 5. 用 Object.entries() 遍历对象

```javascript
// ✅ 统一的遍历方式
for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);
}

// 而不是 for...in（会遍历原型链）
```

### 6. 类用于构造有状态的对象

```javascript
// ✅ 当有多个相关方法和状态
class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hi, ${this.name}`;
  }
}

// 不要过度使用类
const utils = {
  sum: (a, b) => a + b,
  multiply: (a, b) => a * b,
};
```

---

## 十六、速查表

### 新语法速查

| 功能       | ES5             | ES6+                 |
| ---------- | --------------- | -------------------- |
| 变量       | `var`           | `const`/`let`        |
| 函数       | `function f()`  | `const f = () => {}` |
| 字符串     | `'a' + b`       | `` `${a}${b}` ``     |
| 对象       | `{ a: a }`      | `{ a }`              |
| 参数默认值 | `if (!x) x=1`   | `(x=1) => {}`        |
| 解构       | `a=obj.a`       | `const {a}=obj`      |
| 展开       | `.apply()`      | `...arr`             |
| 异步       | 回调函数        | `async/await`        |
| 循环       | `for / forEach` | `for...of`           |
| 数据结构   | Array/Object    | Map/Set              |

### 运行环境判断

```javascript
// Node.js 有 exports，浏览器没有
typeof exports !== "undefined";

// 或检查 globalThis
typeof globalThis.window !== "undefined"; // 浏览器
typeof globalThis.process !== "undefined"; // Node.js

// 模块判断
typeof module !== "undefined" && module.exports; // CommonJS
typeof exports !== "undefined" && typeof module !== "undefined"; // CommonJS
typeof define === "function"; // AMD
```

---

## 十七、总结

### 核心要点

1. **let/const 替代 var** - 块级作用域更安全
2. **箭头函数 + 解构** - 现代 JavaScript 的标配
3. **async/await** - 解决异步问题的最优方案
4. **Class** - 面向对象编程
5. **模块化** - import/export 统一标准
6. **for...of** - 迭代的统一方式
7. **Map/Set** - 更高效的数据结构

### ES6+ 能做什么 ES5 做不了

- 块级作用域（消除 var 的混乱）
- Promise 原生支持（不必依赖库）
- 模块化（不需要 RequireJS）
- 生成器（更优雅的异步）
- Proxy/Reflect（元编程能力）
- Class（类语法）

### 学习顺序建议

1. ✅ **必学**：let/const、箭头函数、解构、async/await
2. ✅ **常用**：模板字符串、展开运算符、for...of、Class
3. 📚 **深入**：生成器、Proxy、Reflect、Symbol
4. 🎯 **实战**：模块化、错误处理、性能优化

---
