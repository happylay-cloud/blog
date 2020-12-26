---
# 文章标题
title: vue 常用配置
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2020-12-26
# 所属标签（可以设置多个🏷）
tags:
  - 代码片段

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

摘要: vue 常用配置
时间: 2020-12-26

---

<img src="/img/19.jpg" width="256px" height="144px">

<!-- more -->

## 环境配置[dev,test,prod]

:::tip

调用方式 `process.env.VUE_APP_xxx`

`const env = process.env`

`const common = env.VUE_APP_COMMON`

`console.log('所有环境变量', env, '自定义环境变量', common)`

:::
`.env`

```
// 全局默认配置文件，不论什么环境都会加载合并
VUE_APP_COMMON='happylay'
```

`.env.development`

```
// 默认开发环境下的配置文件
// npm run serve 默认加载.env .env.development 文件，两个文件有相同项，则后加载的文件会覆盖掉第一个文件
// 属性名必须以VUE_APP_开头

NODE_ENV = 'development'

// 系统变量
outputDir = dev
```

`.env.production`

```
// 默认生产环境下的配置文件
// npm run build 默认加载 .env .env.production 文件，两个文件有相同项，则后加载的文件会覆盖掉第一个文件
// 属性名必须以VUE_APP_开头

NODE_ENV = 'production'

// 系统变量
outputDir = prod
```

`.env.test`

```
// 通过 --mode test 指定环境
NODE_ENV = 'test'

// 系统变量
outputDir = test
```

`package.json`

```json
  "scripts": {
    "serve": "vue-cli-service serve",
    "serve:test": "vue-cli-service serve --mode prod",
    "serve:prod": "vue-cli-service serve --mode production",
    "build": "vue-cli-service build",
    "build:dev": "vue-cli-service build --mode development",
    "build:test": "vue-cli-service build --mode test",
    "lint": "vue-cli-service lint"
  },
```

`vue.config.js`

```javascript
module.exports = {
  productionSourceMap: false,
  publicPath: "./",
  outputDir: process.env.outputDir,
  devServer: {
    port: 2020,
    https: false,
    open: true,
  },
};
```
