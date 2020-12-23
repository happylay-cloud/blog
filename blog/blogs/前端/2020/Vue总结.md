---
# 文章标题
title: Vue总结
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2020-12-23
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

摘要: vue 总结
时间: 2020-12-23

---

<img src="/img/7.jpg" width="256px" height="144px">

<!-- more -->

## route 路由说明

:::warning
meta 中可以自定义属性，
通过 \$route.meta.自定义属性获取，例如\$route.meta.keepalive
:::

```javascript
const routes = [
  {
    path: "/",
    component: home,
    meta: {
      keepalive: true,
    },
  },
  {
    path: "/edit",
    component: edit,
    meta: {
      istoken: true,
    },
  },
];
```

## route 路由守卫

:::warning
获取自定义元数据 to.meta.istoken
:::

```javascript
router.beforeEach((to, from, next) => {
  if (
    !localStorage.getItem("token") &&
    !localStorage.getItem("id") &&
    to.meta.istoken
  ) {
    router.push("/login");
    Vue.prototype.$msg.fail("请重新登录");
    return;
  }
  next();
});
```

## keep-alive 缓存

:::warning
添加标签 <keep-alive></keep-alive>
:::

```vue
<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepalive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepalive" />
  </div>
</template>
```
