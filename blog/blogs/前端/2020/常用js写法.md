---
# 文章标题
title: 常用js写法
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

摘要: 常用 js 写法
时间: 2020-12-26

---

<img src="/img/17.jpg" width="256px" height="144px">

<!-- more -->

## 异步请求改同步

`异步`

```javascript
open () {
  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this.$message({
      type: 'success',
      message: '删除成功!'
    })
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '已取消删除'
    })
  })
}
```

`同步`

```javascript
async open () {
  const res = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).catch(err => err)

  console.log(res)
}
```

:::tip
vscode 代码块左移 cmd + [ ，代码块右移 cmd +]
:::
