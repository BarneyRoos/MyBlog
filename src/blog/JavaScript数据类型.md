---
title: "JavaScript数据类型"
pubDate: 2026-01-27T03:43:21.953Z
description: "从基础概念到深度理解，完整掌握 JavaScript 的 8 种数据类型、类型检测、类型转换和常见陷阱"
author: "海川"
image:
  url: ""
  alt: ""
tags: ["JS", "数据类型", "教程"]
---

## 前言

JavaScript 的数据类型是进阶的基石。很多 Bug 都源于对数据类型的误解——你以为它是字符串，其实是数字；你以为相等，其实不相等。

本文从**基础概念**、**8 种类型详解**、**类型检测**、**类型转换**，到**常见错误和最佳实践**，让你彻底掌握 JavaScript 的类型系统。

---

## 一、核心速览（30 秒）

| 分类         | 类型      | 示例                        | 存储方式 |
| ------------ | --------- | --------------------------- | -------- |
| **原始类型** | Number    | `42`、`3.14`、`NaN`         | 栈       |
|              | String    | `"hello"`、`` `template` `` | 栈       |
|              | Boolean   | `true`、`false`             | 栈       |
|              | Null      | `null`                      | 栈       |
|              | Undefined | `undefined`                 | 栈       |
|              | Symbol    | `Symbol('id')`              | 栈       |
|              | BigInt    | `123n`、`BigInt(123)`       | 栈       |
| **对象类型** | Object    | `{}`、`[]`、`()`            | 堆       |

**关键区别**：原始类型存储**值**，对象类型存储**引用**。

---

## 二、8 种数据类型详解

### 1. Number（数字）

JavaScript 中所有数字都是 64 位浮点数（IEEE 754）。

#### 基本用法

```javascript
// 整数
let int = 42;
// 浮点数
let float = 3.14;
// 负数
let negative = -100;
// 科学计数法
let scientific = 1.23e2; // 123
// 十六进制
let hex = 0xff; // 255
// 八进制（ES6）
let octal = 0o17; // 15
// 二进制（ES6）
let binary = 0b1010; // 10
// 特殊值
let inf = Infinity;
let negInf = -Infinity;
let notANumber = NaN; // "Not-a-Number"
```

#### 常见陷阱

| 问题         | 代码                   | 结果                  | 原因                       |
| ------------ | ---------------------- | --------------------- | -------------------------- |
| 浮点精度     | `0.1 + 0.2`            | `0.30000000000000004` | 二进制存储精度问题         |
| NaN 比较     | `NaN === NaN`          | `false`               | NaN 不等于任何值，包括自己 |
| typeof NaN   | `typeof NaN`           | `"number"`            | NaN 是 number 类型的特殊值 |
| 大数精度丢失 | `9007199254740992 + 1` | `9007199254740992`    | 超过 MAX_SAFE_INTEGER      |

#### 实用方法

```javascript
// 检查是否是有效的数字
Number.isNaN(NaN); // true
Number.isNaN("NaN"); // false（"NaN"字符串返回false）

// 检查是否是安全的整数（-2^53 ~ 2^53）
Number.isSafeInteger(42); // true
Number.isSafeInteger(9007199254740992); // false

// 检查是否是有限数字
Number.isFinite(42); // true
Number.isFinite(Infinity); // false

// 格式化数字
(1234.567).toFixed(2); // "1234.57"
(42).toString(2); // "101010"（二进制字符串）
(255).toString(16); // "ff"（十六进制字符串）
```

**最佳实践**：涉及金钱计算，不要用 Number，用字符串或 BigInt。

### 2. String（字符串）

字符串是**不可变**的，任何"修改"操作都会创建新字符串。

#### 基本用法

```javascript
// 单引号
let single = "hello";

// 双引号
let double = "world";

// 反引号（模板字符串）
let template = `Hello ${name}`;

// 特殊字符
let special = "line1\nline2"; // \n 换行
let tab = "col1\tcol2"; // \t 制表符
let quote = 'He said "hi"'; // \" 转义双引号

// 字符串长度
"hello".length; // 5

// 访问字符
"hello"[0]; // "h"
"hello".charAt(0); // "h"
```

#### 常用方法

| 方法            | 描述                 | 示例                          | 返回值          |
| --------------- | -------------------- | ----------------------------- | --------------- |
| `includes()`    | 是否包含子串         | `"hello".includes("ll")`      | `true`          |
| `startsWith()`  | 是否以...开头        | `"hello".startsWith("he")`    | `true`          |
| `endsWith()`    | 是否以...结尾        | `"hello".endsWith("lo")`      | `true`          |
| `indexOf()`     | 查找子串位置         | `"hello".indexOf("l")`        | `2`             |
| `substring()`   | 提取子串             | `"hello".substring(1, 4)`     | `"ell"`         |
| `slice()`       | 提取子串（支持负数） | `"hello".slice(-2)`           | `"lo"`          |
| `split()`       | 按分隔符分割         | `"a,b,c".split(",")`          | `["a","b","c"]` |
| `trim()`        | 移除首尾空格         | `" hello ".trim()`            | `"hello"`       |
| `toUpperCase()` | 转大写               | `"hello".toUpperCase()`       | `"HELLO"`       |
| `toLowerCase()` | 转小写               | `"HELLO".toLowerCase()`       | `"hello"`       |
| `replace()`     | 替换（首次）         | `"hello".replace("l","x")`    | `"hexlo"`       |
| `replaceAll()`  | 替换（全部）         | `"hello".replaceAll("l","x")` | `"hexxo"`       |
| `padStart()`    | 左侧填充             | `"5".padStart(3, "0")`        | `"005"`         |
| `repeat()`      | 重复字符串           | `"ab".repeat(3)`              | `"ababab"`      |

#### 模板字符串的威力

```javascript
// 多行字符串
const html = `
  <div>
    <h1>Title</h1>
    <p>Content</p>
  </div>
`;

// 表达式计算
const x = 10,
  y = 20;
console.log(`${x} + ${y} = ${x + y}`); // "10 + 20 = 30"

// 函数调用
const name = "Alice";
console.log(`Hello ${name.toUpperCase()}`); // "Hello ALICE"

// 标签模板（高级）
function highlight(strings, ...values) {
  return strings[0] + `**${values[0]}**` + strings[1];
}
highlight`The name is ${name}`; // "The name is **Alice**"
```

**常见错误**

```javascript
// ❌ 错误：修改字符串
let str = "hello";
str[0] = "H"; // 不生效！字符串不可变
console.log(str); // "hello"

// ✅ 正确：创建新字符串
str = str.charAt(0).toUpperCase() + str.slice(1);
console.log(str); // "Hello"
```

### 3. Boolean（布尔）

布尔值只有 `true` 和 `false` 两个值。

#### 基本用法

```javascript
let flag = true;
let isVisible = false;

// 布尔值的逻辑运算
true && false; // false（AND）
true || false; // true（OR）
!true; // false（NOT）
```

#### 哪些值转换为 false（假值）

```javascript
Boolean(false); // false
Boolean(null); // false
Boolean(undefined); // false
Boolean(0); // false
Boolean(-0); // false
Boolean(0n); // false（BigInt 的 0）
Boolean(NaN); // false
Boolean(""); // false（空字符串）
Boolean([]); // true（⚠️数组总是 truthy）
Boolean({}); // true（⚠️对象总是 truthy）
```

**关键点**：`[]` 和 `{}` 是 truthy，尽管它们是空的！

### 4. Null 和 Undefined（空值）

这两个经常混淆，但意义不同。

| 特征            | Null                            | Undefined                       |
| --------------- | ------------------------------- | ------------------------------- |
| **含义**        | 表示"无值"，程序员主动赋值      | 表示"未定义"，系统默认值        |
| **获得方式**    | 主动赋值 `null`                 | 未初始化、函数无返回值          |
| **typeof 结果** | `"object"`（设计缺陷）          | `"undefined"`                   |
| **== 比较**     | `null == undefined` 为 `true`   | `null == undefined` 为 `true`   |
| **=== 比较**    | `null === undefined` 为 `false` | `null === undefined` 为 `false` |

```javascript
// 何时得到 undefined
let x; // 未初始化
console.log(x); // undefined

function test() {}
test(); // 无返回值，默认返回 undefined

let obj = { a: 1 };
obj.b; // 属性不存在，返回 undefined

const arr = [1, 2, 3];
arr[10]; // 超出索引，返回 undefined

// 何时得到 null
let empty = null; // 主动赋值
const result = null; // 主动赋值

// 比较的坑
null == undefined; // true
null === undefined; // false
0 == null; // false
0 == undefined; // false
"" == null; // false
```

**最佳实践**：用 `undefined` 表示未定义，用 `null` 表示有意的空值。

### 5. Symbol（符号）

Symbol 是 ES6 引入的新类型，每个 Symbol 都**唯一且不可变**。

#### 基本用法

```javascript
// 创建 Symbol
const id = Symbol("id");
const id2 = Symbol("id");

// 每个 Symbol 都是唯一的
id === id2; // false

// Symbol 用作对象属性
const user = {
  [id]: 123, // 用 Symbol 作为属性键
  name: "Alice",
};

user[id]; // 123
user.name; // 'Alice'
```

#### 为什么使用 Symbol？

1. **避免属性名冲突**：在对象上添加隐藏属性
2. **定义对象的私有属性**：`for...in` 和 `Object.keys()` 无法访问

```javascript
// 场景：库开发者不想污染用户对象
const privateData = Symbol("privateData");

class MyClass {
  constructor() {
    this[privateData] = "secret"; // 隐藏属性
  }

  getPrivateData() {
    return this[privateData];
  }
}

const obj = new MyClass();
console.log(obj); // { getPrivateData: [Function] }
Object.keys(obj); // [] 无法看到 privateData
obj[privateData]; // 'secret' 但你知道键名才能访问
```

#### 内置 Symbol

```javascript
// Symbol.iterator - 让对象可迭代
const iterable = {
  [Symbol.iterator]() {
    return {
      next() {
        return { value: 1, done: false };
      },
    };
  },
};

for (let item of iterable) {
  console.log(item);
}

// Symbol.hasInstance - 自定义 instanceof 行为
class MyClass {
  static [Symbol.hasInstance](obj) {
    return true; // 所有对象都是 MyClass 实例
  }
}

[] instanceof MyClass; // true
```

**实战场景**：Symbol 用得少，了解即可。主要在库和框架开发中使用。

### 6. BigInt（大整数）

BigInt 用于表示任意大的整数，不损失精度。

#### 基本用法

```javascript
// 创建 BigInt
const big1 = 123n; // 后缀 n
const big2 = BigInt(123);
const big3 = BigInt("99999999999999999999");

// 大数运算
1000000000000000000000n + 1n; // 1000000000000000000001n
1000000000000000000000n * 2n; // 2000000000000000000000n

// 比较
100n > 50n; // true
100n === 100; // false（BigInt 和 Number 不相等）
100n == 100; // true（宽松相等）
```

#### 重要限制

```javascript
// ❌ 不能与 Number 混合运算
100n + 50; // TypeError: Cannot mix BigInt and other types

// ❌ 不能用于位运算
100n & 50; // TypeError

// ❌ 不能转换为 boolean（需要明确）
if (1n) {
} // TypeError
if (1n !== 0n) {
} // ✅ 正确

// ✅ 可以用 Boolean() 转换
Boolean(1n); // true
Boolean(0n); // false
```

**使用场景**：密码学、大数计算、数据库 ID。日常开发很少用。

### 7. Object（对象）

对象是 JavaScript 最复杂的类型，包括：普通对象、数组、函数、日期等。

#### 基本用法

```javascript
// 对象字面量
const user = {
  name: "Alice",
  age: 30,
  greet() {
    return `Hello, ${this.name}`;
  },
};

// 构造函数
const obj = new Object();

// 访问属性
user.name; // "Alice"
user["age"]; // 30
user["greet"](); // "Hello, Alice"

// 动态属性
const key = "email";
user[key] = "alice@example.com"; // user.email = 'alice@example.com'
```

#### 对象相关方法速查

| 方法                      | 描述                       | 示例                                   |
| ------------------------- | -------------------------- | -------------------------------------- |
| `Object.keys()`           | 获取所有键（自有、可枚举） | `Object.keys({a:1,b:2})` → `['a','b']` |
| `Object.values()`         | 获取所有值                 | `Object.values({a:1,b:2})` → `[1,2]`   |
| `Object.entries()`        | 获取键值对                 | `Object.entries({a:1})` → `[['a',1]]`  |
| `Object.assign()`         | 对象合并（浅拷贝）         | `Object.assign({},a,b)`                |
| `Object.create()`         | 创建对象（指定原型）       | `Object.create(proto)`                 |
| `Object.freeze()`         | 冻结对象（不可修改）       | `Object.freeze(obj)`                   |
| `Object.seal()`           | 密封对象（不可添加删除）   | `Object.seal(obj)`                     |
| `Object.hasOwnProperty()` | 是否拥有属性               | `obj.hasOwnProperty('name')`           |
| `Object.getPrototypeOf()` | 获取原型                   | `Object.getPrototypeOf(obj)`           |

#### 数组（特殊对象）

```javascript
// 创建数组
const arr = [1, 2, 3];
const arr2 = new Array(1, 2, 3);

// 数组方法（常用）
arr.push(4); // 末尾添加 → [1,2,3,4]
arr.pop(); // 末尾删除 → [1,2,3]
arr.shift(); // 开头删除 → [2,3]
arr.unshift(0); // 开头添加 → [0,2,3]
arr.slice(1, 2); // 截取（不修改原数组） → [2]
arr.splice(1, 1, 99); // 删除并插入 → 修改原数组

// 数组遍历
arr.forEach((item) => console.log(item));
arr.map((item) => item * 2); // 转换
arr.filter((item) => item > 2); // 过滤
arr.find((item) => item > 2); // 找第一个
arr.some((item) => item > 2); // 是否存在
arr.every((item) => item > 0); // 是否都满足
arr.reduce((sum, item) => sum + item, 0); // 累积
```

### 8. Function（函数）

函数也是对象，可以赋值给变量、作为参数传递、返回函数。

```javascript
// 函数声明
function greet(name) {
  return `Hello, ${name}`;
}

// 函数表达式
const sayHi = function (name) {
  return `Hi, ${name}`;
};

// 箭头函数
const arrow = (name) => `Hey, ${name}`;

// 函数也是对象
typeof greet; // "function"（实际是 object 的子类型）
greet.name; // "greet"
greet.toString(); // 函数的字符串表示

// 高阶函数（函数作为参数或返回值）
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
add5(3); // 8
```

---

## 三、类型检测方法对比

检测数据类型有多种方式，各有优缺点。

### typeof 运算符

```javascript
// 原始类型
typeof 42; // "number"
typeof "hello"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof Symbol("id"); // "symbol"
typeof 123n; // "bigint"

// 对象类型（全部返回 "object"）
typeof {}; // "object"
typeof []; // "object"（数组也是 object）
typeof null; // "object"（历史 Bug）
typeof function () {}; // "function"（特殊情况）
```

**问题**：无法区分具体对象类型，`null` 返回 `"object"`。

### instanceof 运算符

```javascript
// 检查原型链
[] instanceof Array; // true
[] instanceof Object; // true（因为 Array 继承自 Object）
{} instanceof Object; // true
new Date() instanceof Date; // true

// 但对原始类型无效
42 instanceof Number; // false
"hello" instanceof String; // false
true instanceof Boolean; // false
```

**问题**：只适用于对象，不适用于原始类型。

### Object.prototype.toString()

```javascript
// 最可靠的方式
Object.prototype.toString.call(42); // "[object Number]"
Object.prototype.toString.call("hello"); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call(new Date()); // "[object Date]"
Object.prototype.toString.call(new RegExp()); // "[object RegExp]"
Object.prototype.toString.call(() => {}); // "[object Function]"
```

**优点**：最准确，适用于所有类型。

### 实用的类型检测函数

```javascript
// 创建一个通用的类型检测函数
function getType(value) {
  const type = Object.prototype.toString.call(value);
  return type.slice(8, -1).toLowerCase(); // 提取中间的类型名
}

getType(42); // "number"
getType("hello"); // "string"
getType([]); // "array"
getType({}); // "object"
getType(new Date()); // "date"
getType(null); // "null"
getType(undefined); // "undefined"
```

### 类型检测对比表

| 方法                          | Number | String | Boolean | Null | Undefined | Array | Object | Date |
| ----------------------------- | ------ | ------ | ------- | ---- | --------- | ----- | ------ | ---- |
| `typeof`                      | ✅     | ✅     | ✅      | ❌   | ✅        | ❌    | ✅     | ❌   |
| `instanceof`                  | ❌     | ❌     | ❌      | ❌   | ❌        | ✅    | ✅     | ✅   |
| `Object.prototype.toString()` | ✅     | ✅     | ✅      | ✅   | ✅        | ✅    | ✅     | ✅   |

**建议**：优先用 `Object.prototype.toString()` 或上面的 `getType()` 函数。

---

## 四、类型转换

### 隐式转换（自动）

```javascript
// 数字 + 字符串 = 字符串
1 + "2"; // "12"（不是 3）
"hello" + 1; // "hello1"

// 其他 + 字符串 = 字符串
true + ""; // "true"
null + ""; // "null"
undefined + ""; // "undefined"

// 运算触发数字转换
"10" - 5; // 5（字符串被转为数字）
"10" * "2"; // 20
"10" / 2; // 5
true + 1; // 2（true 转为 1）
false + 1; // 1（false 转为 0）

// 比较触发转换
"10" > 5; // true
"10" == 10; // true（宽松相等）
"10" === 10; // false（严格相等）

// Boolean 转换
if ("hello") {
} // true（非空字符串是 truthy）
if (0) {
} // false
if ([]) {
} // true（数组是 truthy，即使是空数组）
```

**陷阱汇总**

```javascript
// ⚠️ 经典陷阱
[] + []; // ""（两个空数组转为空字符串后连接）
[] + {}; // "[object Object]"
{
}
+[]; // 0（大括号被当作块，不是对象）

// ⚠️ 等号陷阱
null == undefined; // true（宽松相等）
null === undefined; // false（严格相等）
0 == false; // true
0 === false; // false
"" == false; // true
"" === false; // false

// ⚠️ 数组转换陷阱
[1, 2, 3].toString(); // "1,2,3"
[].toString(); // ""
```

### 显式转换（手动）

```javascript
// 转为字符串
String(42); // "42"
String(true); // "true"
(42).toString(); // "42"
`${42}`; // "42"（模板字符串）

// 转为数字
Number("42"); // 42
Number("3.14"); // 3.14
Number("hello"); // NaN
Number(true); // 1
Number(false); // 0
Number(null); // 0
Number(undefined); // NaN
parseInt("42px", 10); // 42（解析整数）
parseFloat("3.14px"); // 3.14（解析浮点数）

// 转为布尔值
Boolean(42); // true
Boolean(0); // false
Boolean(""); // false
Boolean("hello"); // true
Boolean([]); // true（坑点）
Boolean({}); // true（坑点）
!!42; // true（double NOT 也能转 Boolean）
```

**转换规则表**

| 值          | 转为 Number | 转为 String         | 转为 Boolean |
| ----------- | ----------- | ------------------- | ------------ |
| `0`         | `0`         | `"0"`               | `false`      |
| `"0"`       | `0`         | `"0"`               | `true`       |
| `""`        | `0`         | `""`                | `false`      |
| `"hello"`   | `NaN`       | `"hello"`           | `true`       |
| `[]`        | `0`         | `""`                | `true`       |
| `[1]`       | `1`         | `"1"`               | `true`       |
| `[1,2]`     | `NaN`       | `"1,2"`             | `true`       |
| `{}`        | `NaN`       | `"[object Object]"` | `true`       |
| `null`      | `0`         | `"null"`            | `false`      |
| `undefined` | `NaN`       | `"undefined"`       | `false`      |

---

## 五、值类型 vs 引用类型

### 栈 vs 堆

| 特性         | 原始类型   | 对象类型         |
| ------------ | ---------- | ---------------- |
| **存储位置** | 栈         | 堆（栈中存地址） |
| **赋值行为** | 复制值     | 复制引用         |
| **修改影响** | 不影响原值 | 影响所有引用     |
| **比较方式** | 比较值     | 比较地址         |
| **内存占用** | 小，固定   | 大，动态         |

#### 实际演示

```javascript
// 原始类型：复制值
let a = 42;
let b = a;
b = 100;
console.log(a); // 42（a 不受影响）

// 对象类型：复制引用
let obj1 = { value: 42 };
let obj2 = obj1; // 复制引用，不是复制值
obj2.value = 100;
console.log(obj1.value); // 100（obj1 被修改）

// 数组也是引用
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);
console.log(arr1); // [1, 2, 3, 4]

// 函数参数也遵循这个规则
function modify(value) {
  if (typeof value === "number") {
    value = 999; // 原始类型，修改不影响外部
  } else {
    value.prop = 999; // 对象类型，修改影响外部
  }
}

let num = 42;
let obj = { prop: 42 };
modify(num);
modify(obj);
console.log(num); // 42
console.log(obj.prop); // 999
```

### 浅拷贝 vs 深拷贝

```javascript
// ⚠️ 浅拷贝（只复制一层）
const original = { name: "Alice", address: { city: "NY" } };
const shallow = Object.assign({}, original);
shallow.address.city = "LA"; // 修改嵌套对象
console.log(original.address.city); // "LA"（原对象被修改）

// ✅ 深拷贝（完全独立）
const deep = JSON.parse(JSON.stringify(original));
deep.address.city = "LA";
console.log(original.address.city); // "NY"（原对象不受影响）

// ⚠️ JSON 方式的限制
// 无法复制函数、Symbol、undefined、循环引用
const obj = {
  method() {
    return 42;
  },
  circular: null,
};
obj.circular = obj; // 循环引用
JSON.parse(JSON.stringify(obj)); // TypeError: Converting circular structure
```

---

## 六、常见错误与陷阱

### ❌ 错误 1：混淆 null 和 undefined

```javascript
// ⚠️ 两者都表示"无值"，但意思不同
let a = null; // 有意的空值
let b = undefined; // 未定义

// 检测时要小心
a == b; // true（宽松相等）
a === b; // false（严格相等）

// 最佳实践
if (value === null || value === undefined) {
}
// 或使用 nullish coalescing operator
value ?? defaultValue;
```

### ❌ 错误 2：误以为 [] 和 {} 是 falsy

```javascript
// ⚠️ 数组和对象即使是空的，也是 truthy
if ([]) console.log("truthy"); // 输出
if ({}) console.log("truthy"); // 输出
if ([].length) console.log("never"); // 不输出

// 正确的检测方式
if (Array.isArray(arr) && arr.length > 0) {
}
if (Object.keys(obj).length > 0) {
}
```

### ❌ 错误 3：误用 == 而非 ===

```javascript
// ⚠️ == 会触发隐式转换，导致预期外的结果
0 == false; // true
"" == false; // true
null == 0; // false
null == undefined; // true

// ✅ 总是用 === 进行比较
0 === false; // false
null === undefined; // false
```

### ❌ 错误 4：Float 精度问题

```javascript
// ⚠️ 不能用 == 或 === 比较浮点数
0.1 + 0.2 === 0.3; // false（实际是 0.30000000000000004）

// ✅ 用 epsilon 方法比较
Math.abs(0.1 + 0.2 - 0.3) < Number.EPSILON; // true

// 或用 toFixed() 转字符串比较
(0.1 + 0.2).toFixed(2) === "0.30"; // true
```

### ❌ 错误 5：typeof null 返回 "object"

```javascript
// ⚠️ 这是 JavaScript 的历史 Bug
typeof null; // "object"

// 正确检测 null
value === null; // ✅
Object.prototype.toString.call(value) === "[object Null]"; // ✅
```

### ❌ 错误 6：对象比较总是 false

```javascript
// ⚠️ 对象比较比的是引用，不是内容
{} === {}; // false（两个不同的对象）
[] === []; // false
{ a: 1 } === { a: 1 }; // false

let obj = { a: 1 };
obj === obj; // true（同一个对象）

// 比较内容，需要手动实现或用库
JSON.stringify(obj1) === JSON.stringify(obj2);
```

---

## 七、最佳实践

### 1. 优先使用严格相等（===）

```javascript
// ❌ 不好
if (value == null) {
}

// ✅ 好
if (value === null || value === undefined) {
}
// 或使用 Nullish Coalescing
if (value ?? null) {
}
```

### 2. 显式转换优于隐式转换

```javascript
// ❌ 隐式转换，容易出错
if (arr.length) {
} // 如果是 0 呢？

// ✅ 显式转换，意图明确
if (arr.length > 0) {
}
if (Boolean(value)) {
}
if (Number(value) > 0) {
}
```

### 3. 使用 Number.isNaN() 检测 NaN

```javascript
// ❌ 不好，全局函数会隐式转换
isNaN("hello"); // true
isNaN(undefined); // true

// ✅ 好，不进行类型转换
Number.isNaN(NaN); // true
Number.isNaN("hello"); // false
Number.isNaN(undefined); // false
```

### 4. 金钱计算用字符串或 BigInt

```javascript
// ❌ 不好，浮点精度问题
const total = 0.1 + 0.2; // 0.30000000000000004

// ✅ 好，用整数运算
const total = (1 + 2) / 100; // 0.03（转换为美分）
// 或用字符串库如 decimal.js

// ✅ 或用 BigInt
const price = 100n; // 1 元 = 100 分
const total = price + 50n; // 150n（150 分）
```

### 5. 对象类型检测用通用函数

```javascript
// ✅ 创建一个可重用的类型检测函数
const getType = (value) => {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};

getType([]); // "array"
getType({}); // "object"
getType(new Date()); // "date"

// 或使用现成库如 lodash
_.isArray(arr);
_.isObject(obj);
_.isDate(date);
```

### 6. 避免隐式强制转换

```javascript
// ❌ 依赖隐式转换
function process(value) {
  if (value) {
    // value 可能被强制转换
    // ...
  }
}

// ✅ 明确类型
function process(value) {
  if (typeof value === "string" && value.length > 0) {
    // ...
  }
}
```

---

## 八、速查表

### 类型判断速查

```javascript
// 快速判断常见类型
const is = {
  number: (v) => typeof v === "number",
  string: (v) => typeof v === "string",
  boolean: (v) => typeof v === "boolean",
  null: (v) => v === null,
  undefined: (v) => v === undefined,
  array: Array.isArray,
  object: (v) => v !== null && typeof v === "object" && !Array.isArray(v),
  date: (v) => v instanceof Date,
  function: (v) => typeof v === "function",
  symbol: (v) => typeof v === "symbol",
  bigint: (v) => typeof v === "bigint",
};

is.number(42); // true
is.array([]); // true
is.object({}); // true
```

### 类型转换速查

| 原值        | 转 Number | 转 String           | 转 Boolean |
| ----------- | --------- | ------------------- | ---------- |
| `42`        | `42`      | `"42"`              | `true`     |
| `"42"`      | `42`      | `"42"`              | `true`     |
| `""`        | `0`       | `""`                | `false`    |
| `true`      | `1`       | `"true"`            | `true`     |
| `false`     | `0`       | `"false"`           | `false`    |
| `null`      | `0`       | `"null"`            | `false`    |
| `undefined` | `NaN`     | `"undefined"`       | `false`    |
| `[]`        | `0`       | `""`                | `true`     |
| `{}`        | `NaN`     | `"[object Object]"` | `true`     |

### 8 种数据类型速查

| 类型      | typeof      | 存储 | 可变性 | 示例                        |
| --------- | ----------- | ---- | ------ | --------------------------- |
| Number    | "number"    | 栈   | 不可变 | `42`、`3.14`、`NaN`         |
| String    | "string"    | 栈   | 不可变 | `"hello"`、`` `template` `` |
| Boolean   | "boolean"   | 栈   | 不可变 | `true`、`false`             |
| Null      | "object"    | 栈   | -      | `null`                      |
| Undefined | "undefined" | 栈   | -      | `undefined`                 |
| Symbol    | "symbol"    | 栈   | 不可变 | `Symbol('id')`              |
| BigInt    | "bigint"    | 栈   | 不可变 | `123n`                      |
| Object    | "object"    | 堆   | 可变   | `{}`、`[]`、`()`            |

---

## 九、总结

### 核心要点

1. **8 种数据类型**：7 种原始类型 + 1 种对象类型
2. **原始 vs 对象**：值 vs 引用，栈 vs 堆
3. **类型检测**：用 `Object.prototype.toString()` 最准确
4. **类型转换**：优先显式，避免隐式
5. **常见坑**：null vs undefined、float 精度、[] 和 {} 的 truthy

### 最常犯的 5 个错误

1. 用 `==` 而非 `===`
2. 误以为 `typeof null === "object"` 是对的
3. 混淆 `null` 和 `undefined`
4. 认为 `[]` 和 `{}` 是 falsy
5. Float 精度问题用 `==` 比较

### 下一步建议

- 📝 在项目中创建一个类型检测工具函数库
- 🧪 用 `===` 替换项目中所有的 `==`
- 💰 如果涉及数字计算，考虑用 decimal.js 库
- 🔍 理解原型链和继承（基于对象类型展开）
