---
# 文章标题
title: api 接口服务
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2020-12-27
# 所属标签（可以设置多个🏷）
tags:
  - 代码片段
  - node
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

摘要: api 接口服务
时间: 2020-12-27

---

<img src="/img/4.jpg" width="256px" height="144px">

<!-- more -->

## expres 接口服务搭建

`api.js`

```javascript
/**
 * 安装express模块
 * npm install express --save
 *
 * 获取post请求的参数
 * npm install body-parser --save
 */

// 引入模块
const express = require("express");
const bodyParser = require("body-parser");

// 创建实例
const app = express();

// 中间件处理post请求
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 处理url请求
app.get("/", (req, res) => {
  const data = {
    code: 200,
    msg: "请求成功",
    data: {
      id: 1,
      name: "happylay",
    },
  };
  res.send(data);
});

/**
 * http://localhost:9090/login?username=happylay&password=12344321
 */
app.get("/login", (req, res) => {
  const { username, password } = req.query;
  res.send(`请求参数：${username} ${password}`);
});

// 接收post请求
app.post("/login", (req, res) => {
  // 使用中间件处理的数据会存放到req.body中
  console.log(req.body);
  res.send(req.body);
});

/**
 * 获取post请求的参数
 * npm install body-parser --save
 */

// 启动服务开始监听
var server = app.listen(9090, () => {
  var port = server.address().port;
  console.log("本地接口地址→", "http://localhost:" + port);
});
```

`启动接口服务`

```
node api.js
```
