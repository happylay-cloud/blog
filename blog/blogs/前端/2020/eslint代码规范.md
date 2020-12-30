---
# 文章标题
title: eslint代码规范
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2020-12-30
# 所属标签（可以设置多个🏷）
tags:
  - 代码片段
  - eslint
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

摘要: eslint代码规范
时间: 2020-12-30

---

<img src="/img/3.jpg" width="256px" height="144px">

<!-- more -->
:::tip
[ESLint可组装的JavaScript和JSX检查工具](https://eslint.bootcss.com/)
:::

## eslint常用规则配置

`.eslintrc.js`

```javascript
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 关闭shims-vue.d.ts警告（处理any可能报错）
    '@typescript-eslint/no-explicit-any': ['off'],
    // 处理{}可能报错
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: true
    }],
    // 处理img标签可能报错
    'no-unused-vars': 'off',
    'vue/html-self-closing': ['error', {
      'html': {
        'void': 'always',
        'normal': 'never',
        'component': 'always'
      },
      'svg': 'always',
      'math': 'always'
    }],
  }
}
```