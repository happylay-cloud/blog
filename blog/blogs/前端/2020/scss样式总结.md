---
# 文章标题
title: scss总结
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2020-12-30
# 所属标签（可以设置多个🏷）
tags:
  - 代码片段
  - scss
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

摘要: scss总结
时间: 2020-12-30

---

<img src="/img/19.jpg" width="256px" height="144px">

<!-- more -->

## scss语法
```vue
<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div class="box">
      <h1 class="title">你好</h1>
      <h2 class="box-center">2020</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  height: 100%;
}
// -----------------------------scss----------------------------------
/* 这种注释内容会出现在生成的css文件中 */
// 这种注释内容不会出现在生成的css文件中
// 导入scss样式表，在sass中以下划线开头的文件不会被编译
@import './base_css';

// 全局变量
$base-color: #aaa;

// 插值
$name: '.title';
$attr: 'font-size';

// 混入
@mixin function-base-css($color) {
  border: 2px solid $color;
}

// 继承类（使用时才会被编译）
%base-css {
  border-radius: 50%;
}

// 继承类（无论是否使用都会被编译）
.base-css {
  border-radius: 10%;
}

.box {
  //background-color: $base-color;
  height: 100%;

  // 等同于 .box-center
  &-center {
    font-size: 50px;
  }
  #{$name} {
    #{$attr}: 100px;
    // &父选择器
    &:hover {
      color: red;
    }
    // 引入混入
    @include function-base-css(#e97b99);
    // 继承类（方式一）
    @extend %base-css;
    // 继承类（方式二）
    //@extend .base-css;
  }
}
</style>
```