---
# 文章标题
title: promise 异步总结
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2020-12-29
# 所属标签（可以设置多个🏷）
tags:
  - 代码片段
  - promise
# 所属分类（可以设置多个💖）
categories:
  - 前端
# 是否开启侧边栏
sidebar: "auto"
# 文章置顶（数字代表排序权重📚）
sticky: 0
# 文章是否发布 true（发布）false(草稿)
publish: true
---

---

摘要: promise 异步总结
时间: 2020-12-29

---

<img src="/img/5.jpg" width="256px" height="144px">

<!-- more -->

## 异步请求

```javascript
const runA = function() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      console.log("2秒后 runA方法执行完毕");
      resolve(new Date());
    }, 2000);
  });
};
const runB = function() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      console.log("4秒后 runB方法执行完毕");
      resolve(new Date());
    }, 4000);
  });
};
const runC = function() {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      console.log("6秒后 runC方法执行完毕");
      resolve(new Date());
    }, 6000);
  });
};

async function awaitText() {
  console.log(new Date());
  await runA().then((res) => console.log(res));
  await runB().then((res) => console.log(res));
  await runC().then((res) => console.log(res));
}

awaitText();

// promise.all()异步函数并行执行
Promise.all([runA(), runB(), runC()]).then((res) => {
  console.log(res);
});
```

## 带回调函数异步方法

```javascript
/**
 * 回调函数
 * @param {*} params1 参数一
 * @param {*} params2 参数二
 * @param {*} callback 回调函数
 */
function callbackFun(params1, params2, callback) {
  console.log("开始", new Date());

  var params = params1 + ":" + params2;

  // 回调函数
  if (typeof callback === "function") {
    callback(params);
  }
  console.log("结束", new Date());
}

// 同步回调
// callbackFun(12, 29, (res) => {
//   console.log(res)
// })

// 同步不回调
// callbackFun(12, 29)
// ----------------------------------------------------------------------

const sleep = (timeout = 2000, flag = true) =>
  new Promise((resolve, reject) => {
    console.log("开启定时器", new Date());
    setTimeout(() => {
      if (flag) {
        resolve("模拟执行成功:" + new Date());
      } else {
        var reason = "模拟执行失败:" + new Date();
        reject(reason);
      }
    }, timeout);
  });

async function aysncCallbackFun(params1, params2, callback) {
  // 开启异步请求1
  await sleep(2000, false).then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  );
  // 开启异步请求1
  const p1 = sleep(2000, false).then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  );
  // 开启异步请求2
  const p2 = sleep(2000, false).then(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  );

  await Promise.all([p1, p2]);

  // 回调函数
  if (typeof callback === "function") {
    var params = "回调参数 " + params1 + ":" + params2;
    callback(params);
    console.log("回调结束", new Date());
  }
}

// 异步回调
aysncCallbackFun(12, 29, (res) => {
  console.log(res);
});
```

## mixin 配合 promise 使用

`Dict.js`

```javascript
import Vue from "vue";
import { get as getDictDetail } from "@/api/system/dictDetail";

export default class Dict {
  // 结构体
  constructor(dict) {
    this.dict = dict;
  }

  /**
   *
   * @param {*} names 参数
   * @param {*} completeCallback 回调函数
   */
  async init(names, completeCallback) {
    if (names === undefined || names === null) {
      throw new Error("need Dict names");
    }
    // 异步请求空数组
    const ps = [];
    names.forEach((n) => {
      Vue.set(this.dict.dict, n, {});
      Vue.set(this.dict.label, n, {});
      Vue.set(this.dict, n, []);

      // 添加异步请求对象
      ps.push(
        // 此处为一异步请求
        getDictDetail(n).then((data) => {
          // 在第一个位置0，新增，数据
          this.dict[n].splice(0, 0, ...data.content);
          data.content.forEach((d) => {
            Vue.set(this.dict.dict[n], d.value, d);
            Vue.set(this.dict.label[n], d.value, d.label);
          });
        })
      );
    });

    // 等待异步请求执行完毕
    await Promise.all(ps);
    // 回调函数
    completeCallback("执行成功");
  }
}
```

`index.js`

```javascript
import Dict from "./Dict";

const install = function(Vue) {
  Vue.mixin({
    data() {
      // 判断数据类型，新增数据对象
      if (this.$options.dicts instanceof Array) {
        const dict = {
          dict: {},
          label: {},
        };
        return {
          dict,
        };
      }
      return {};
    },
    created() {
      if (this.$options.dicts instanceof Array) {
        // 传入空对象dict
        new Dict(this.dict)
          // 传入初始值，调用初始化方法
          .init(this.$options.dicts, (res) => {
            console.log(res);
            // 渲染随数据变化dom
            this.$nextTick(() => {
              // 注册事件
              this.$emit("dictReady");
            });
          });
      }
    },
  });
};

export default { install };
```

## 🌈 彩蛋

:::tip

this.student['id'] = 1 // 新增属性或覆盖属性值，操作类似 map

delete this.student['id'] // 删除属性 id
:::
