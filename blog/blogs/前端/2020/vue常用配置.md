---
# 文章标题
title: vue 常用配置
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2020-12-26
# 所属标签（可以设置多个🏷）
tags:
  - 代码片段
  - vscode
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

## 嵌套路由

`index.js`

```javascript
const router = new VueRouter({
  routes: [
    {
      path: "/user/:id",
      component: Layout,
      children: [
        // 当'/user/:id'匹配成功，UserHome会被渲染在Layout的<router-view>中
        // 空子路由，可以渲染未匹配路由
        { path: "", component: UserHome },
        // ...其他子路由
      ],
    },
  ],
});
```

`Layout.vue`

```vue
<template>
  <div>
    <h1>框架</h1>
    <router-view></router-view>
  </div>
</template>
```

## [跨域配置](https://www.webpackjs.com/configuration/dev-server/#devserver-proxy)

:::tip
可以通过 process.env.VUE_APP_BASE_API 区分开发环境
:::
`vue.config.js`

```javascript
module.exports = {
  productionSourceMap: false,
  publicPath: "./",
  devServer: {
    port: 8085,
    https: false,
    open: true,
    proxy: {
      "/good": {
        target: "http://localhost:9090",
        changeOrigin: true,
        pathRewrite: { "^/good": "api1" },
      },
      "/order": {
        target: "http://localhost:9091",
        changeOrigin: true,
        pathRewrite: { "^/order": "api2" },
      },
    },
  },
};
```

`http.js`

```javascript
import axios from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
});

export default http;
```

## 动态路由

`router/index.js`

```javascript
import router from "./routers";
import store from "@/store";
import Config from "@/settings";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // 进度条样式
import { getToken } from "@/utils/auth"; // 从cookie中获取token
import { buildMenus } from "@/api/system/menu";
import { filterAsyncRouter } from "@/store/modules/permission";

// NProgress配置
NProgress.configure({ showSpinner: false });

// 没有重定向白名单
const whiteList = ["/login"];

// 在跳转之前执行
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    // 设置网页标题
    document.title = to.meta.title + " - " + Config.title;
  }
  // 显示进度条
  NProgress.start();

  // 存在token说明已经登录
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      // TODO 判断当前用户是否已获取user_info信息（如果执行了刷新操作，则store里的roles为空，此时需要重新添加user_info）
      if (store.getters.roles.length === 0) {
        // 获取user_info
        store
          .dispatch("GetInfo")
          .then(() => {
            // 动态路由，获取菜单
            loadMenus(next, to);
          })
          .catch(() => {
            store.dispatch("LogOut").then(() => {
              // TODO 页面刷新，为了重新实例化vue-router对象 避免bug
              location.reload();
            });
          });
        // 登录时未获取菜单，在此处获取
      } else if (store.getters.loadMenus) {
        // 修改成false，防止死循环
        store.dispatch("updateLoadMenus");
        // 动态路由，获取菜单
        loadMenus(next, to);
      } else {
        next();
      }
    }
  } else {
    // 没有令牌
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      // 否则全部重定向到登录页，登录后会重定向上级页面
      next(`/login?redirect=${to.fullPath}`);

      // 完成进度条
      NProgress.done();
    }
  }
});

// TODO 动态路由，拉取菜单
export const loadMenus = (next, to) => {
  buildMenus().then((res) => {
    const asyncRouter = filterAsyncRouter(res);
    // 404页面必须放路由最后
    asyncRouter.push({ path: "*", redirect: "/404", hidden: true });
    // 生成路由
    store.dispatch("GenerateRoutes", asyncRouter).then(() => {
      // TODO 异步添加动态路由状态后，动态添加可访问路由表
      router.addRoutes(asyncRouter);
      // 如果addRoutes并未完成，路由守卫会一层一层的执行执行，直到addRoutes完成，找到对应的路由
      next({ ...to, replace: true });
    });
  });
};

// 在跳转之后判断
router.afterEach((to, from) => {
  NProgress.done(); // finish progress bar
});
```

`登录后重定向上级路由`

```javascript
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      // TODO 立即执行 :当刷新页面时会立即执行一次handler函数
      immediate: true
    }
  },
```

`store/modules/permission.js`

```javascript
import { constantRouterMap } from "@/router/routers";
import Layout from "@/layout/index";

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: [],
  },
  mutations: {
    /**
     *
     * @param {*} state 属性
     * @param {*} routers 路由
     */
    SET_ROUTERS: (state, routers) => {
      // 动态路由
      state.addRouters = routers;
      // 添加路由实例
      state.routers = constantRouterMap.concat(routers);
    },
  },
  actions: {
    /**
     * 生成路由
     * @param {*} param0 解构出commit方法
     * @param {*} asyncRouter 动态路由
     */
    GenerateRoutes({ commit }, asyncRouter) {
      commit("SET_ROUTERS", asyncRouter);
    },
  },
};

/**
   遍历后台传来的路由字符串，转换为组件对象
 * @param {*} routers 路由
 */
export const filterAsyncRouter = (routers) => {
  // TODO 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter((router) => {
    if (router.component) {
      if (router.component === "Layout") {
        // Layout组件特殊处理
        router.component = Layout;
      } else {
        // 获取组件路径
        const component = router.component;
        // TODO 加载动态路由
        router.component = loadView(component);
      }
    }

    // 处理子菜单
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children);
    }
    return true;
  });
};

export const loadView = (view) => {
  // TODO 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve);
};

export default permission;
```

## 自定义权限指令

:::tip
v-permission
:::
`permission.js`

```javascript
import store from "@/store";

export default {
  /**
   * v-permission 验证权限自定义指令，在对象插入父级元素时验证
   * @param {*} el 绑定指令的element
   * @param {*} binding 指令的表达式对象
   * @param {*} vnode
   */
  inserted(el, binding, vnode) {
    // TODO 自定义 v-permission
    const { value } = binding;

    // 获取用户权限
    const roles = store.getters && store.getters.roles;
    if (value && value instanceof Array && value.length > 0) {
      const permissionRoles = value;

      // 检查数组中元素是否满足条件
      const hasPermission = roles.some((role) => {
        return permissionRoles.includes(role);
      });

      // 没有权限，删除节点
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`使用方式： v-permission="['admin','editor']"`);
    }
  },
};
```

`index.js`

```javascript
import permission from "./permission";

/**
 * install 是默认的方法
 * @param {*} Vue 当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
 */
const install = function(Vue, opts = {}) {
  Vue.directive("permission", permission);
};

/**
 * https://www.cnblogs.com/max-tlp/p/9338855.html
 * 支持使用标签的方式引入Vue是全局变量时，自动install
 */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

permission.install = install;

export default permission;
```

`注册全局指令`

```
// 权限指令
import permission from './components/Permission'

Vue.use(permission)
```

## src 方式引入 vue , 注册全局指令

`demo.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script
      src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"
      type="text/javascript"
    ></script>
  </head>

  <body>
    <div id="app">
      {{ message }}
      <input type="text" v-red />
    </div>
  </body>

  <!-- 引用自定义指令 -->
  <script src="./demo.js" type="text/javascript"></script>

  <script>
    console.log(
      "%c 🥃 window: ",
      "font-size:12px;background-color: #F5CE50;color:#fff;",
      window
    );

    // 自定义指令（会覆盖相同指令）
    // Vue.directive("red", {
    //   // 当被绑定的元素插入到dom中时
    //   inserted: function(el) {
    //     // 改变背景颜色
    //     el.style.background = "green";
    //   },
    // });

    var app = new Vue({
      el: "#app",
      data: {
        message: "Hello Vue!",
      },
    });
  </script>
</html>
```

`demo.js`

```javascript
const install = function(Vue, opts = {}) {
  Vue.directive("red", {
    // 当被绑定的元素插入到dom中时
    inserted: function(el) {
      // 改变背景颜色
      el.style.background = "red";
    },
  });
};

// 自动注册全局指令
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
```

## mixin（混入）

:::tip
mixin 的作用：多个组件可以共享数据和方法
:::

`mixin.js`

```javascript
let MIXIN = {
  data() {
    return {
      name: "mixin",
    };
  },
  created() {
    console.log("mixin...", this.name);
  },
  mounted() {},
  methods: {},
};
export default MIXIN;
```

`引用mixin`

```javascript
// 全局引用
import mixin from "./mixin";
Vue.mixin(mixin);

// 在vue文件中引用
import "@/mixin"; // 引入mixin文件
export default {
  mixins: [mixin],
};
```

## `$options属性`

:::tip

\$options：用来获取 data 外面的数据和方法

:::

```javascript
<script>
export default {
  name: "Test",
  data() {
    return {
    };
  },
  // 在data外面定义的属性和方法通过$options可以获取和调用
  name: "happylay",
  age: 18,
  test() {
    console.log("方法");
  },
  created() {
    console.log(this.$options.name);  // happylay
    console.log(this.$options.age);  // 18
    this.$options.test();  // 方法
  },
</script>
```

:::tip

- 获取额外属性、方法

this.\$options.xxx

- 重置自定义表单

this.form = this.\$options.data().form;

- 重置 data()数据

this.\$options.data()

- 获取 data()数据

this.\$data

- 获取 data()数据

this.\$options.data.call(this)

:::

```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" v-model="form.input" />
    <button @click="retset">重置</button>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      // 表单
      form: {
        input: "",
      },
    };
  },
  methods: {
    // 重置表单方法
    retset() {
      console.log(this.$options);
      this.form = this.$options.data().form;
      // 重置data()
      console.log(
        "%c 🌽 this.$options.data(): ",
        "font-size:12px;background-color: #ED9EC7;color:#fff;",
        this.$options.data()
      );
      // 通过this获取data数据
      console.log(
        "%c 🍰 this.$options.data.call(this): ",
        "font-size:12px;background-color: #4b4b4b;color:#fff;",
        this.$options.data.call(this)
      );
      // 获取data数据
      console.log(
        "%c 🥒 this.$data: ",
        "font-size:12px;background-color: #ED9EC7;color:#fff;",
        this.$data
      );
      // 重置data()中自定义数据
      console.log(
        "%c 🍫 this.$options.data().form: ",
        "font-size:12px;background-color: #465975;color:#fff;",
        this.$options.data().form
      );
    },
  },
};
</script>

<style scoped lang="scss"></style>
```

## 🌈 彩蛋

:::tip
vscode 常用配置 settings.json 记录
:::
`settings.json`

```json
{
  "terminal.integrated.fontFamily": "Hack Nerd Font",
  "go.formatTool": "goimports",
  // 主题
  "workbench.colorTheme": "Material Theme High Contrast",
  // 图标
  "workbench.iconTheme": "eq-material-theme-icons-palenight",
  "window.zoomLevel": 0,
  // 设置字体
  "editor.fontSize": 12,
  "editor.tabSize": 2,
  "[jsonc]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[vue]": {
    "editor.defaultFormatter": "hikerpig.vetur"
  },
  // 显示对齐点
  //"editor.renderWhitespace": "all",
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  // 标签不换行
  //"vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "auto"
    }
  },
  // 自动格式化代码
  "editor.formatOnPaste": true,
  "editor.formatOnSave": true,
  "editor.formatOnType": true,
  "eslint.format.enable": true,
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.quickSuggestions": {
    "other": true,
    "comments": true,
    "strings": true
  },
  "px-to-vw.viewportWidth": 360,
  "tabnine.experimentalAutoImports": true,
  // emmet语法，参考文档：https://www.cnblogs.com/shanzhiming/p/10354873.html
  "emmet.includeLanguages": {
    "vue-html": "html",
    "vue": "html",
    "javascript": "html"
  },
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  },
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  // 设置默认浏览器
  "open-in-browser.default": "Chrome",
  "liveServer.settings.CustomBrowser": "chrome",
  "indenticator.color.dark": "#7D8E92",
  "indenticator.color.light": "#FA7399",
  // java开发环境
  "java.configuration.maven.userSettings": "/Users/happylay/Documents/java/maven/apache-maven-3.6.3/conf/settings.xml",
  "editor.suggestSelection": "first",
  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
  "files.exclude": {
    "**/.classpath": true,
    "**/.project": true,
    "**/.settings": true,
    "**/.factorypath": true
  },
  "java.jdt.ls.vmargs": "-XX:+UseParallelGC -XX:GCTimeRatio=4 -XX:AdaptiveSizePolicyWeight=90 -Dsun.zip.disableMemoryMapping=true -Xmx1G -Xms100m -javaagent:\"/Users/happylay/.vscode/extensions/gabrielbb.vscode-lombok-1.0.1/server/lombok.jar\"",
  "java.project.importOnFirstTimeStartup": "automatic",
  "java.semanticHighlighting.enabled": true,
  "java.home": "/Library/Java/JavaVirtualMachines/jdk-11.0.8.jdk/Contents/Home",
  "java.configuration.runtimes": [
    {
      "name": "JavaSE-1.8",
      "path": "/Library/Java/JavaVirtualMachines/jdk1.8.0_261.jdk/Contents/Home",
      "default": true
    },
    {
      "name": "JavaSE-11",
      "path": "/Library/Java/JavaVirtualMachines/jdk-11.0.8.jdk/Contents/Home"
    }
  ],
  // 保存后自动修复格式
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  // 添加vue支持
  "eslint.validate": ["javascript", "javascriptreact", "vue"],
  // 让函数(名)和后面的括号之间加个空格
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "todo-tree.tree.showScanModeButton": false,
  "[typescript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  }
}
```
