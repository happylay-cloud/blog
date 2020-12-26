---
# 文章标题
title: 常用js写法
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2020-12-26
# 所属标签（可以设置多个🏷）
tags:
  - 代码片段
  - 模块化
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

## vuex 模块化

```javascript
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";

Vue.use(Vuex);

// 读取文件的路径，读取文件的路径，匹配文件的正则
const modulesFiles = require.context("./modules", true, /\.js$/);

// -----------------------参数解析-------------------------------
console.dir(modulesFiles);
console.log(modulesFiles);
console.log("1.id：", modulesFiles.id);
console.log("2.数组[模块名]：", modulesFiles.keys());
console.log("3.解析：", modulesFiles.resolve(modulesFiles.keys()[0]));
console.log("4.模块：", modulesFiles(modulesFiles.keys()[0]));

// 它将自动从模块文件中导入所有的vuex模块
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  console.log("原始模块", modules, "模块路径", modulePath);

  // 获取模块名称 './app.js' => 'app'模块名
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");

  // 传入模块相对路径，返回一个模块 './app.js' => app模块
  const value = modulesFiles(modulePath);

  // 获取模块内容 state，actions 等等
  modules[moduleName] = value.default;

  return modules;
}, {});

console.log("数组[完整模块内容]", modules);

const store = new Vuex.Store({
  modules,
  getters,
});

export default store;
```

## require.context()使用

`目录结构`

```text
├── App.vue
├── assets
│   └── logo.png
├── components
│   ├── common.vue
│   └── global
│       ├── demo.vue
│       └── index.js
├── main.js
├── router
│   ├── common.js
│   ├── index.js
│   └── modules
│       ├── demo.js
│       ├── home.js
│       └── index.js
└── views
    ├── 403.vue
    ├── 404.vue
    ├── Frame.vue
    ├── demo.vue
    └── index.vue
```

### 自动导入路由

`router/index.js`

```javascript
import Vue from "vue";
import VueRouter from "vue-router";
import RouterConfig from "./modules"; // 引入业务逻辑模块
import CommonRouters from "./common"; // 引入通用模块

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history", // 需要服务端支持
  scrollBehavior: () => ({ y: 0 }),
  routes: RouterConfig.concat(CommonRouters),
});

console.log(router);

router.beforeEach((to, from, next) => {
  console.log(to);
  next();
});

export default router;
```

`router/common.js`

```javascript
export default [
  // 默认页面
  {
    path: "/",
    redirect: "/index",
    hidden: true,
  },
  // 无权限页面
  {
    path: "/nopermission",
    name: "nopermission",
    component: () => import("@/views/403"),
  },
  // 404
  {
    path: "*",
    name: "lost",
    component: () => import("@/views/404"),
  },
];
```

`router/modules/index.js`

```javascript
const files = require.context(".", true, /\.js$/);

// ["./home.js"] 返回一个数组
console.log(files.keys());
let configRouters = [];

files.keys().forEach((key) => {
  if (key === "./index.js") {
    return;
  }
  // 读取出文件中的default模块
  configRouters = configRouters.concat(files(key).default);
});

// 模块排序
configRouters.sort((a, b) => a.sort - b.sort);

console.log(configRouters);

// 抛出一个Vue-router期待的结构的数组
export default configRouters;
```

`router/modules/home.js`

```javascript
import Frame from "@/views/Frame";
import Home from "@/views/index";
export default [
  // 首页
  {
    path: "/index",
    name: "首页",
    redirect: "/index",
    component: Frame,
    sort: 1,
    children: [
      // 嵌套路由
      {
        path: "",
        component: Home,
      },
    ],
  },
];
```

`router/modules/demo.js`

```javascript
import demo from "@/views/demo";
export default [
  // 首页
  {
    path: "/demo",
    name: "测试",
    redirect: "/demo",
    component: demo,
    sort: 2,
  },
];
```

### 自动导入全局组件

`components/global/index.js`

```javascript
import Vue from "vue";
const contexts = require.context(".", false, /\.vue$/);
contexts.keys().forEach((component) => {
  const componentEntity = contexts(component).default;
  console.log("组件名称", componentEntity.name);
  // 使用内置的组件名称 进行全局组件注册
  Vue.component(componentEntity.name, componentEntity);
});
```

`components/global/demo.vue`

```vue
<template>
  <div>
    <h1>我是组件</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "demo",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
```

`src/main.js`

```javascript
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/components/global";

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
```

## 标准树结构

```vue
<template>
  <div>
    <el-tree
      :data="data"
      show-checkbox
      default-expand-all
      node-key="id"
      highlight-current
      :default-expanded-keys="[1]"
      :default-checked-keys="defaultChecked"
      :props="defaultProps"
      draggable
      @node-drag-end="dragEnd"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click="() => append(data)">
            新增
          </el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  methods: {
    dragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("自身id", draggingNode.key, "父节点id", dropNode.parent.key);
    },
    append(data) {
      console.log(data);
    },
    remove(node, data) {
      console.log(node, data);
    },
  },

  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级菜单",
          children: [
            {
              id: 2,
              label: "二级菜单",
              children: [
                {
                  id: 3,
                  label: "三级菜单",
                },
                {
                  id: 4,
                  label: "三级菜单",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      defaultChecked: [4],
    };
  },
};
</script>

<style lang="scss" scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  justify-content: space-between;
}
</style>
```

## 🌈 彩蛋

:::tip
vscode 代码块左移 cmd + [ ，代码块右移 cmd +]

vscode 取消撤销 shift + cmd + z

npm、yarn 更新项目依赖

| 说明                   | yarn                                     | npm-check       |
| ---------------------- | ---------------------------------------- | --------------- |
| 更新项目依赖，没有交互 | yarn upgrade --latest                    | npm-check -y    |
| 更新项目依赖，有交互   | yarn upgrade-interactive --latest        | npm-check -u    |
| 更新全局依赖，没有交互 | yarn global upgrade --latest             | npm-check -g -y |
| 更新全局依赖，有交互   | yarn global upgrade-interactive --latest | npm-check -g -u |

:::
