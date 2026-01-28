---
title: "Promise与异步编程"
pubDate: 2026-01-27T09:49:58.345Z
description: "从回调地狱到 async/await，深度掌握 JavaScript 异步编程，包括 Promise、事件循环、并发控制和错误处理，附完整最佳实践"
author: "海川"
image:
  url: ""
  alt: ""
tags: ["JS", "Promise", "异步编程", "教程"]
---

## 前言

异步编程是 JavaScript 的灵魂。从浏览器的 I/O 操作到服务器的数据库查询，一切都是异步的。但异步的复杂性也是前端 Bug 的温床——栈溢出、内存泄漏、竞态条件，都源于对异步机制的误解。

本文从**回调地狱的困境**、**Promise 的救赎**、**async/await 的优雅**，到**事件循环的深层机制**，让你彻底掌握 JavaScript 的异步世界。

---

## 一、核心速览（60 秒）

| 阶段            | 语法                    | 优点                   | 缺点                           |
| --------------- | ----------------------- | ---------------------- | ------------------------------ |
| **回调地狱**    | `callback(err, result)` | 简单，直接             | 嵌套深，难以维护，错误处理混乱 |
| **Promise**     | `.then().catch()`       | 链式调用，统一错误处理 | 需要理解微任务，调试困难       |
| **Generator**   | `yield`                 | 看起来同步，逻辑清晰   | 需要库支持，语法复杂           |
| **async/await** | `await`                 | 最简洁，最接近同步代码 | 容易无意中顺序执行，性能问题   |

**简单对比**：

- 回调 = 邀请朋友来的时候直接说"来了告诉我"
- Promise = 留个条子"做完通知我"
- async/await = "我等着，做完了再继续"

---

## 二、回调地狱：问题所在

### 嵌套地狱

```javascript
// ❌ 回调地狱（Callback Hell）
readFile("file1.txt", (err1, data1) => {
  if (err1) {
    handleError(err1);
  } else {
    readFile("file2.txt", (err2, data2) => {
      if (err2) {
        handleError(err2);
      } else {
        readFile("file3.txt", (err3, data3) => {
          if (err3) {
            handleError(err3);
          } else {
            process(data1, data2, data3);
          }
        });
      }
    });
  }
});
```

**问题：**

1. **金字塔结构** - 代码向右缩进，难以阅读
2. **错误处理复杂** - 每层都要检查错误
3. **逻辑难以追踪** - 很难理解整个流程
4. **难以复用** - 回调函数之间耦合

---

## 三、Promise：异步的救赎

### Promise 基础

```javascript
// 创建 Promise
const promise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    resolve("成功"); // 成功状态
    // reject('失败'); // 失败状态
  }, 1000);
});

// Promise 有三种状态
// 1. pending（待定）- 初始状态
// 2. fulfilled（已兑现）- 调用 resolve()
// 3. rejected（已拒绝）- 调用 reject()
```

### Promise 链式调用

```javascript
// ✅ Promise 链式调用（比较清晰）
readFile("file1.txt")
  .then((data1) => {
    console.log("文件1:", data1);
    return readFile("file2.txt"); // 返回新 Promise
  })
  .then((data2) => {
    console.log("文件2:", data2);
    return readFile("file3.txt");
  })
  .then((data3) => {
    console.log("文件3:", data3);
    process(data1, data2, data3);
  })
  .catch((err) => {
    // 统一的错误处理
    console.error("出错:", err);
  })
  .finally(() => {
    console.log("无论成功失败都会执行");
  });
```

### then 的执行逻辑

```javascript
// then 会返回新的 Promise
Promise.resolve(1)
  .then((x) => {
    console.log("第一个 then:", x); // 1
    return x + 1; // 隐式返回 Promise.resolve(2)
  })
  .then((x) => {
    console.log("第二个 then:", x); // 2
    return Promise.resolve(x + 1); // 显式返回 Promise
  })
  .then((x) => {
    console.log("第三个 then:", x); // 3
  });

// ⚠️ 陷阱：忘记 return
Promise.resolve(1)
  .then((x) => {
    console.log("第一个 then:", x);
    readFile("file.txt"); // ❌ 没有 return
  })
  .then((x) => {
    console.log("第二个 then:", x); // undefined（没有等待文件读取完成）
  });
```

### Promise 的常用方法

```javascript
// Promise.all - 全部成功才成功
Promise.all([p1, p2, p3])
  .then(([r1, r2, r3]) => {
    console.log("全部成功:", r1, r2, r3);
  })
  .catch((err) => {
    console.log("至少一个失败:", err);
  });

// Promise.race - 第一个完成就返回（无论成功失败）
Promise.race([p1, p2, p3]).then((result) => {
  console.log("第一个完成:", result);
});

// Promise.allSettled - 全部完成，不管成功失败
Promise.allSettled([p1, p2, p3]).then((results) => {
  console.log(results);
  // [
  //   { status: 'fulfilled', value: 1 },
  //   { status: 'rejected', reason: Error },
  //   { status: 'fulfilled', value: 3 }
  // ]
});

// Promise.any - 第一个成功就返回（等待至少一个成功）
Promise.any([p1, p2, p3])
  .then((result) => {
    console.log("第一个成功:", result);
  })
  .catch((err) => {
    console.log("全部失败:", err);
  });

// Promise.resolve / Promise.reject - 快速创建
Promise.resolve(42); // 立即成功
Promise.reject("error"); // 立即失败
```

### 常见错误

```javascript
// ❌ 错误 1：Promise 链中忘记 return
Promise.resolve(1)
  .then((x) => readFile("file.txt")) // ❌ 没有 return
  .then((x) => {
    console.log(x); // undefined
  });

// ✅ 正确
Promise.resolve(1)
  .then((x) => readFile("file.txt")) // ✅ 返回 Promise
  .then((data) => {
    console.log(data); // 文件内容
  });

// ❌ 错误 2：多个 Promise 应该并行但写成了顺序
const p1 = readFile("file1.txt");
const p2 = readFile("file2.txt");
Promise.all([p1, p2]); // ✅ 并行

// ❌ 错误 3：不必要的嵌套
promise.then((result) => {
  return promise2.then((result2) => {
    return result + result2;
  });
});

// ✅ 可以直接链式调用
promise
  .then((result) => promise2)
  .then((result2) => {
    // result 丢失了！
  });

// ✅ 正确做法
Promise.all([promise, promise2]).then(([result, result2]) => result + result2);
```

---

## 四、async/await：现代异步的标杆

### 基本语法

```javascript
// async 函数总是返回 Promise
async function getUser(id) {
  return { id, name: "Alice" }; // 隐式 return Promise
}

getUser(1).then((user) => console.log(user));

// ⚠️ 等同于
function getUser(id) {
  return Promise.resolve({ id, name: "Alice" });
}
```

### await 的强大之处

```javascript
// ✅ 看起来同步，实际异步
async function fetchUserData() {
  try {
    const user = await fetchUser(); // 等待 Promise 完成
    console.log('用户:', user);

    const posts = await fetchPosts(user.id); // 等待完成
    console.log('文章:', posts);

    return { user, posts };
  } catch (err) {
    console.error('出错:', err);
  }
}

// await 只能在 async 函数中使用
function normal() {
  const result = await promise; // ❌ SyntaxError
}

async function async_func() {
  const result = await promise; // ✅
}
```

### 并行 vs 顺序执行

```javascript
// ❌ 顺序执行（慢）：一个接一个
async function sequential() {
  const user = await fetchUser(); // 等待 1 秒
  const posts = await fetchPosts(user.id); // 等待 1 秒
  return { user, posts }; // 总共 2 秒
}

// ✅ 并行执行（快）：同时执行
async function parallel() {
  // 方法 1：Promise.all
  const [user, settings] = await Promise.all([fetchUser(), fetchSettings()]);

  // 方法 2：先启动，后等待
  const userPromise = fetchUser();
  const settingsPromise = fetchSettings();
  const user = await userPromise;
  const settings = await settingsPromise;

  return { user, settings }; // 总共 1 秒
}
```

### async/await 的错误处理

```javascript
// ✅ try/catch（推荐）
async function safe() {
  try {
    const result = await asyncOp();
    return result;
  } catch (err) {
    console.error("捕获错误:", err);
    return null;
  } finally {
    cleanup();
  }
}

// catch 链式错误处理
async function chainedCatch() {
  return fetchData().catch((err) => {
    console.log("捕获 fetchData 错误");
    throw err; // 继续抛出，给上层 catch
  });
}

// 调用时的错误处理
async function main() {
  try {
    await chainedCatch();
  } catch (err) {
    console.log("最终错误处理:", err);
  }
}
```

### 常见错误

```javascript
// ❌ 错误 1：不必要的 async/await
async function add(a, b) {
  return a + b; // 不涉及异步操作
}

// ✅ 简化
function add(a, b) {
  return a + b;
}

// ❌ 错误 2：在循环中不必要的 await
async function processAll(items) {
  for (const item of items) {
    await processItem(item); // 顺序执行
  }
}

// ✅ 并行执行
async function processAll(items) {
  await Promise.all(items.map(item => processItem(item)));
}

// ❌ 错误 3：忽视错误
async function ignoreError() {
  await asyncOp(); // 如果出错，会被吞掉
}

// ✅ 必须处理
async function handleError() {
  try {
    await asyncOp();
  } catch (err) {
    console.error(err);
  }
}

// ❌ 错误 4：在非 async 函数中直接使用 await
function notAsync() {
  const result = await promise; // 语法错误
}

// ✅ 用 .then() 或转换为 async
const result = await promise; // ✅ 在 async 中
promise.then(result => {}); // ✅ 用 then
```

---

## 五、事件循环与微任务

### 宏任务 vs 微任务

| 类型       | 任务                                                       | 队列       |
| ---------- | ---------------------------------------------------------- | ---------- |
| **宏任务** | `setTimeout`、`setInterval`、`I/O`、`UI 渲染`              | 宏任务队列 |
| **微任务** | `Promise.then/catch`、`MutationObserver`、`queueMicrotask` | 微任务队列 |

### 执行顺序

```
1. 执行同步代码
2. 执行所有微任务
3. 检查是否需要渲染（UI 更新）
4. 执行一个宏任务
5. 重复第 2-4 步
```

### 经典题目

```javascript
console.log("1"); // 同步代码

setTimeout(() => {
  console.log("2"); // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log("3"); // 微任务
});

console.log("4"); // 同步代码

// 输出顺序：1 4 3 2
```

### 详细流程

```javascript
console.log("start");

setTimeout(() => {
  console.log("timeout 1");
  Promise.resolve().then(() => console.log("promise in timeout"));
}, 0);

// 这里第一个then没有return，该Promise会立即变成resolved
// 因此第二个then会不等setTimeout执行完就立刻被推入微任务队列
// JS引擎会清空微任务后才开始宏任务的执行
Promise.resolve()
  .then(() => {
    console.log("promise 1");
    setTimeout(() => {
      console.log("timeout in promise");
    }, 0);
  })
  .then(() => {
    console.log("promise 2");
  });

console.log("end");

// 输出：
// start
// end
// promise 1
// promise 2
// timeout 1
// promise in timeout
// timeout in promise
```

### 为什么很重要？

```javascript
// 例子：React 的状态更新
let state = 0;

setTimeout(() => {
  state = 1;
}, 0);

Promise.resolve().then(() => {
  console.log("Promise 看到 state:", state); // 0（还没执行 setTimeout）
});

// 输出：Promise 看到 state: 0

// 这就是为什么 Promise 比 setTimeout 执行得快！
```

---

## 六、并发控制

### 限制并发数

```javascript
// 场景：同时上传 100 张图片，但最多并发 5 个

// ❌ 一次性加载全部（内存爆炸）
Promise.all(images.map((img) => upload(img)));

// ✅ 限制并发（最多 5 个）
async function uploadWithLimit(images, limit = 5) {
  const results = [];

  for (let i = 0; i < images.length; i += limit) {
    const batch = images.slice(i, i + limit);
    const batchResults = await Promise.all(batch.map((img) => upload(img)));
    results.push(...batchResults);
  }

  return results;
}

// 或使用专门的库
const pLimit = require("p-limit");
const limit = pLimit(5);

const results = await Promise.all(
  images.map((img) => limit(() => upload(img))),
);
```

### 超时控制

```javascript
// 创建超时 Promise
function timeout(ms) {
  return new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms),
  );
}

// 竞速：最快或超时
async function fetchWithTimeout(url, ms = 5000) {
  try {
    return await Promise.race([fetch(url), timeout(ms)]);
  } catch (err) {
    console.error("请求超时或失败:", err);
  }
}

// 或使用 AbortController（推荐）
async function fetchWithAbort(url, ms = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });
    return response;
  } catch (err) {
    if (err.name === "AbortError") {
      console.error("请求被中止");
    }
  } finally {
    clearTimeout(timeoutId);
  }
}
```

### 重试机制

```javascript
// 重试直到成功或达到最大次数
async function retryAsync(fn, maxRetries = 3, delay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      console.log(`第 ${i + 1} 次失败，${delay}ms 后重试...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}

// 使用
async function unreliableTask() {
  return fetchData();
}

const result = await retryAsync(unreliableTask, 3, 1000);
```

---

## 七、错误处理最佳实践

### Promise 的错误处理

```javascript
// ❌ 不好：错误被吞掉
Promise.resolve().then(() => {
  throw new Error("Oops");
}); // 没有 catch，错误会被吞掉

// ✅ 好：统一的 catch
Promise.resolve()
  .then(doSomething)
  .then(doSomethingElse)
  .catch((err) => {
    console.error("错误:", err);
    // 记录错误、上报等
  });

// ❌ 错误处理后继续执行
Promise.resolve()
  .then(() => {
    throw new Error("错误");
  })
  .catch((err) => {
    console.error("捕获:", err);
    // 没有 return，链继续执行
  })
  .then(() => {
    console.log("继续执行");
  });

// ✅ 处理链的错误
Promise.resolve()
  .then(doSomething)
  .catch((err) => {
    console.error("第一个错误:", err);
    return "default"; // 返回默认值，继续链
  })
  .then((result) => {
    console.log("获得结果:", result);
  });
```

### async/await 的错误处理

```javascript
// ✅ 细粒度错误处理
async function multipleOps() {
  try {
    const result1 = await op1();
  } catch (err) {
    console.error("op1 失败:", err);
  }

  try {
    const result2 = await op2();
  } catch (err) {
    console.error("op2 失败:", err);
  }
}

// ✅ 统一处理多个操作
async function multipleOpsUnified() {
  try {
    const result1 = await op1();
    const result2 = await op2();
    const result3 = await op3();
  } catch (err) {
    console.error("任何一个失败:", err);
  }
}

// ✅ 局部处理和全局处理结合
async function mixed() {
  try {
    const result1 = await op1();

    let result2;
    try {
      result2 = await op2();
    } catch (err) {
      console.warn("op2 失败，使用默认值");
      result2 = "default";
    }

    return [result1, result2];
  } catch (err) {
    // 全局错误处理
    console.error("全局错误:", err);
    throw err; // 继续抛出
  }
}
```

### 自定义错误类

```javascript
// 创建特定的错误类便于区分
class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
  }
}

class TimeoutError extends Error {
  constructor(message, duration) {
    super(message);
    this.name = "TimeoutError";
    this.duration = duration;
  }
}

// 处理时区分错误类型
async function handleErrors() {
  try {
    await fetchData();
  } catch (err) {
    if (err instanceof NetworkError) {
      console.error("网络错误:", err.statusCode);
    } else if (err instanceof TimeoutError) {
      console.error("超时:", err.duration);
    } else {
      console.error("未知错误:", err);
    }
  }
}
```

---

## 八、常见模式

### 1. 轮询（定时重复）

```javascript
// 直到满足条件才停止
async function pollUntil(condition, interval = 1000) {
  while (!condition()) {
    await new Promise((resolve) => setTimeout(resolve, interval));
  }
}

// 使用
async function waitForElement() {
  await pollUntil(() => document.getElementById("result"));
  console.log("元素出现了！");
}
```

### 2. 截断（限制执行频率）

```javascript
// 防止连续快速调用
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// 使用
const debouncedSearch = debounce(async (query) => {
  const results = await search(query);
}, 500);

input.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});
```

### 3. 队列处理

```javascript
// 依次处理队列中的任务
class AsyncQueue {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  push(task) {
    this.queue.push(task);
    this.process();
  }

  async process() {
    if (this.running) return;
    this.running = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      try {
        await task();
      } catch (err) {
        console.error("任务失败:", err);
      }
    }

    this.running = false;
  }
}

// 使用
const queue = new AsyncQueue();
queue.push(() => sleep(1000).then(() => console.log("任务 1")));
queue.push(() => sleep(1000).then(() => console.log("任务 2")));
// 依次执行，间隔 1 秒
```

### 4. 缓存（避免重复请求）

```javascript
// 简单的请求缓存
function createCachedFetcher() {
  const cache = new Map();

  return async (url) => {
    if (cache.has(url)) {
      return cache.get(url);
    }

    const promise = fetch(url).then((r) => r.json());
    cache.set(url, promise);

    try {
      const result = await promise;
      return result;
    } catch (err) {
      cache.delete(url); // 失败时删除缓存
      throw err;
    }
  };
}

const cachedFetch = createCachedFetcher();
```

---

## 九、性能优化

### 识别性能问题

```javascript
// ❌ 性能问题：顺序执行，总耗时 3 秒
async function bad() {
  const user = await fetchUser(); // 1 秒
  const posts = await fetchPosts(user.id); // 1 秒
  const comments = await fetchComments(user.id); // 1 秒
  // 总计：3 秒
}

// ✅ 优化 1：并行执行不相关的操作
async function better() {
  const user = await fetchUser(); // 1 秒
  const [posts, comments] = await Promise.all([
    fetchPosts(user.id),
    fetchComments(user.id),
  ]); // 并行，1 秒
  // 总计：2 秒
}

// ✅ 优化 2：数据流式处理
async function best() {
  const user = await fetchUser(); // 1 秒
  const [posts, comments] = await Promise.all([
    fetchPosts(user.id),
    fetchComments(user.id),
  ]); // 同时执行，1 秒
  // 总计：2 秒（最优）
}
```

### 内存泄漏防止

```javascript
// ❌ 内存泄漏：无限增长的 Promise
const promises = [];

function badLoop() {
  for (let i = 0; i < Infinity; i++) {
    promises.push(asyncOp()); // ❌ 永不清理
  }
}

// ✅ 清理已完成的 Promise
const promises = new Set();

function goodLoop() {
  for (let i = 0; i < Infinity; i++) {
    const promise = asyncOp();
    promises.add(promise);

    promise.finally(() => {
      promises.delete(promise); // ✅ 及时清理
    });
  }
}

// ✅ 或使用流式处理
async function streamProcess(items) {
  for (const item of items) {
    await processItem(item); // 一个处理完再处理下一个
  }
}
```

---

## 十、Promise vs async/await 对比

| 特性         | Promise                                 | async/await                  |
| ------------ | --------------------------------------- | ---------------------------- |
| **可读性**   | 链式，需要思维转换                      | 看起来同步，更直观           |
| **错误处理** | `.catch()` 或 `.then(null, errHandler)` | `try/catch`（更熟悉）        |
| **调试**     | 链条难以追踪                            | 可以像同步代码那样调试       |
| **并发**     | 天然支持（`.all()` 等）                 | 需要显式使用 `Promise.all()` |
| **性能**     | 略快（少一层包装）                      | 略慢（但可忽略）             |
| **兼容性**   | 广泛支持                                | ES2017+，需 transpile        |

### 何时选择

```javascript
// ✅ 用 async/await
async function main() {
  const user = await fetchUser();
  const posts = await fetchPosts(user.id);
  return { user, posts };
}

// ✅ 用 Promise（当需要复杂的流程控制）
function complex() {
  return Promise.all([op1(), op2(), op3()]).then(([r1, r2, r3]) => {
    if (r1) {
      return op4(r1);
    } else {
      return op5(r2, r3);
    }
  });
}

// 🎯 最佳实践：混合使用
async function mixed() {
  try {
    // 简单串行用 async/await
    const config = await loadConfig();

    // 复杂并发用 Promise.all
    const [data1, data2, data3] = await Promise.all([
      fetchData1(),
      fetchData2(),
      fetchData3(),
    ]);

    return process(config, data1, data2, data3);
  } catch (err) {
    handleError(err);
  }
}
```

---

## 十一、常见错误与陷阱

### ❌ 错误 1：忘记 return 导致链条中断

```javascript
// ❌ 错误
readFile("file1.txt")
  .then((data) => {
    console.log(data);
    readFile("file2.txt"); // 没有 return，下一个 then 收不到
  })
  .then((data) => {
    console.log(data); // undefined
  });

// ✅ 正确
readFile("file1.txt")
  .then((data) => {
    console.log(data);
    return readFile("file2.txt"); // ✅ return
  })
  .then((data) => {
    console.log(data); // 文件内容
  });
```

### ❌ 错误 2：混淆 .then(fn1, fn2) 和 .then(fn1).catch(fn2)

```javascript
// .then(onFulfilled, onRejected) 的第二个参数只捕获前面的错误
Promise.reject("error")
  .then(null, (err) => {
    console.log("捕获到:", err); // "error"
    throw new Error("new error");
  })
  .then(null, (err) => {
    console.log("捕获到:", err); // "new error"
  });

// 更好的方式：用 .catch()
Promise.reject("error")
  .then((data) => {
    throw new Error("new error");
  })
  .catch((err) => {
    console.log("统一捕获:", err);
  });
```

### ❌ 错误 3：Promise 中的错误被吞掉

```javascript
// ❌ 错误
Promise.resolve().then(() => {
  throw new Error("Oops");
}); // 错误被吞掉，控制台无警告

// ✅ 总是要 .catch()
Promise.resolve()
  .then(() => {
    throw new Error("Oops");
  })
  .catch((err) => {
    console.error("处理错误:", err);
  });

// 或
process.on("unhandledRejection", (reason, promise) => {
  console.error("未处理的 Promise 拒绝:", reason);
});
```

### ❌ 错误 4：在顺序和并行中混淆

```javascript
// ❌ 顺序执行（慢）
async function slow() {
  const a = await op1(); // 1 秒
  const b = await op2(); // 1 秒
  const c = await op3(); // 1 秒
  // 总计：3 秒
}

// ✅ 并行执行（快）
async function fast() {
  const [a, b, c] = await Promise.all([op1(), op2(), op3()]); // 总计：1 秒（假设每个都是 1 秒）
}
```

### ❌ 错误 5：async 函数中异常没有被捕获

```javascript
// ❌ 错误
async function buggy() {
  throw new Error("Oops");
}

buggy(); // 返回被拒绝的 Promise，但错误无人处理

// ✅ 正确
async function good() {
  throw new Error("Oops");
}

good().catch((err) => {
  console.error("捕获错误:", err);
});

// 或
await good().catch((err) => {
  console.error("捕获错误:", err);
});
```

---

## 十二、最佳实践

### 1. 默认用 async/await，避免 Promise 链

```javascript
// ✅ 可读性更好
async function fetchAndProcess() {
  try {
    const data = await fetch("/api").then((r) => r.json());
    return process(data);
  } catch (err) {
    console.error(err);
  }
}
```

### 2. 并发优先，串行很少

```javascript
// ✅ 总是问自己：这些操作可以并行吗？
const [user, settings, permissions] = await Promise.all([
  fetchUser(),
  fetchSettings(),
  fetchPermissions(),
]);
```

### 3. 明确的错误处理

```javascript
// ✅ 区分可恢复和不可恢复的错误
async function main() {
  try {
    const data = await fetchData();
  } catch (err) {
    if (err instanceof NetworkError) {
      return retry(); // 可恢复
    } else {
      throw err; // 不可恢复
    }
  }
}
```

### 4. 避免过度使用 async

```javascript
// ❌ 不必要的 async
async function notNeeded() {
  return 42;
}

// ✅ 简化
function simple() {
  return 42;
}
```

### 5. 限制并发防止资源耗尽

```javascript
// ✅ 大量并发操作时限制并发数
async function processMany(items) {
  const limit = pLimit(5); // 最多 5 个并发
  await Promise.all(items.map((item) => limit(() => process(item))));
}
```

### 6. 使用现代 API

```javascript
// ✅ 优先使用 fetch + AbortController
async function modern() {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), 5000);

  try {
    return await fetch(url, { signal: controller.signal });
  } catch (err) {
    if (err.name === "AbortError") {
      console.log("请求被中止");
    }
  }
}
```

---

## 十三、速查表

### Promise 方法速查

| 方法                           | 作用       | 返回               |
| ------------------------------ | ---------- | ------------------ |
| `Promise.resolve(value)`       | 立即成功   | 成功的 Promise     |
| `Promise.reject(reason)`       | 立即失败   | 失败的 Promise     |
| `Promise.all([p1, p2])`        | 全部成功   | 数组结果           |
| `Promise.race([p1, p2])`       | 第一个完成 | 结果（成功或失败） |
| `Promise.allSettled([p1, p2])` | 全部完成   | 状态对象数组       |
| `Promise.any([p1, p2])`        | 第一个成功 | 结果               |

### 状态转移图

```
pending (初始状态)
  ↓
  ├→ fulfilled (调用 resolve)
  └→ rejected (调用 reject)

⚠️ 状态一旦改变，永远不可再改变
```

### 事件循环总结

```
Call Stack → Event Loop → Task Queue
   ↓            ↓              ↓
同步代码    微任务优先   宏任务等待
         (Promise)    (setTimeout)
```

---

## 十四、总结

### 核心要点

1. **回调 → Promise → async/await** 是渐进式演进
2. **Promise 是基础**，async/await 是语法糖
3. **事件循环很重要**，理解微/宏任务的区别
4. **错误处理要主动**，别让错误被吞掉
5. **并发优于串行**，总是考虑并行

### 学习顺序

1. ✅ **必学**：Promise 基础、async/await
2. ✅ **重要**：错误处理、事件循环
3. ✅ **常用**：并发控制、性能优化
4. 📚 **深入**：微任务、Proxy、生成器

### 常见问题 FAQ

**Q：async/await 比 Promise 快吗？**
A：性能基本相同，async/await 只是语法糖。主要区别是可读性。

**Q：为什么 Promise 错误会被吞掉？**
A：设计的初衷是避免递归抛出导致程序崩溃。务必加 `.catch()`。

**Q：应该用 Promise.all 还是 await？**
A：并行操作用 `Promise.all([...])` + `await`。

**Q：事件循环重要吗？**
A：对于理解 JavaScript 的执行模型至关重要。会影响你对 Bug 的诊断。

---
