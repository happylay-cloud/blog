---
# 文章标题
title: vue2总结
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2020-12-23
# 所属标签（可以设置多个🏷）
tags:
  - 代码片段
  - vue2
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

摘要: vue2 总结
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

## axios 网络请求

```javascript
import axios from "axios";
import router from "./src/router/index";
import Vue from "vue";
const http = axios.create({
  baseURL: "http://127.0.0.1:8080/web/api",
});

// 添加请求拦截器
http.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    if (localStorage.getItem("token") && localStorage.getItem("id")) {
      config.headers.Authorization = "Bearer " + localStorage.getItem("token");
    }
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    return response;
  },
  function(error) {
    // 对响应错误做点什么
    console.dir(error);
    if (error.response.status === 401 || error.response.status === 402) {
      router.push("/login");
      Vue.prototype.$msg.fail(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default http;
```

## vant 组件库全局引用

```javascript
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/style.css";
// 样式库
import "tailwindcss/tailwind.css";

// 轻提示
import { Toast } from "vant";
Vue.prototype.$msg = Toast;

// 网络请求
import http from "../http";
Vue.prototype.$http = http;

// 前端组件库
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

## vue.config.js 基础配置

```javascript
module.exports = {
  // false加密代码，减少打包后大小
  productionSourceMap: false,
  publicPath: "./",

  devServer: {
    port: 8085,
    // host: "localhost",
    https: false,
    open: true,
  },
};
```

## slot 插槽

`子组件-默认插槽`

```html
<slot></slot>
```

`子组件-具名插槽`

```html
<!-- 具名插槽 -->
<div>
  <slot name="happylay" />
</div>
```

`父组件`

```html
<div slot="happylay" style="font-size:25px" @click="testClick"></div>
```

`子组件-作用域插槽`

```html
<div slot-scope="scope">
  {{ scope.rowData }}
</div>
```

`父组件`

```vue
<div @click="data = data + 1">
  <slot :rowData="data"></slot>
</div>

<script>
export default {
  name: "具名插槽",
  data() {
    return {
      data: 0,
    };
  },
};
</script>
```

## 父子组件间传值 `props $emit`

:::warning

1.父组件->子组件

通过 `props: ["len"],` 传值，父组件通过 `:len="length"` 传值

注意：组件库中，布尔属性通过 `:isActive="true"` 传值

2.子组件->父组件

通过 `this.$emit("PostPublish", id);` 注册事件，

父组件通过 `@PostPublish="执行方法，或方法名"`监听事件
:::

`子组件`

```html
<span class="publish" @click="PostItemcomment(item.comment_id)">回复</span>

<script>
  export default {
    props: ["componentChild"],
    name: "CommentItem",
    data() {
      return {
        temp: true,
      };
    },
    methods: {
      PostItemcomment(id) {
        this.$emit("PostPublish", id);
      },
    },
  };
</script>
```

`父组件`

```html
<comment-item
  v-if="item.child"
  :componentChild="item.child"
  @PostPublish="PostPublish"
></comment-item>

<script>
  import CommentItem from "@/components/article/CommentItem";
  export default {
    name: "comment",
    data() {
      return {
        componentList: null,
      };
    },
    components: {
      CommentItem,
    },
    methods: {
      async commentData() {
        const res = await this.$http.get("/comment/" + this.$route.params.id);
        this.$emit("comment-len", res.data.length);
        this.componentList = this.changCommentData(res.data);
      },
      changCommentData(data) {
        function fn(temp) {
          let arr1 = [];
          for (var i = 0; i < data.length; i++) {
            if (data[i].parent_id == temp) {
              arr1.push(data[i]);
              data[i].child = fn(data[i].comment_id);
            }
          }
          return arr1;
        }
        return fn(null);
      },
      PostPublish(id) {
        this.$emit("PostPublish", id);
      },
    },
    created() {
      this.commentData();
    },
  };
</script>
```

## v-for 及组件嵌套

```vue
<template>
  <div class="commentItems">
    <div v-for="(item, index) in componentChild" :key="index">
      <comment-item :componentChild="item.child"></comment-item>
    </div>
  </div>
</template>

<script>
export default {
  props: ["componentChild"],
  name: "CommentItem",
};
</script>
```

## 动态样式 `:class={类:布尔值}`

```html
<p
  @click="collectionClick"
  :class="{activeColor1: collectionActive,activeColor2: collectionActive}"
>
  <span class="icon-star-full"></span>
  <span>收藏</span>
</p>

<script>
  export default {
    name: "Article",
    components: {
      CommentTitle,
    },
    data() {
      return {
        collectionActive: false,
      };
    },
    methods: {
      collectionClick() {
        this.collectionActive = !this.collectionActive;
      },
    },
  };
</script>
<style lang="scss" scoped>
  .activeColor1 {
    span:nth-child(1) {
      color: red;
    }
  }
  .activeColor2 {
    span:nth-child(2) {
      color: #000;
      font-size: 2px !important;
    }
  }
</style>
```

## 路由跳转

```html
<img :src="imgurl" alt="" v-if="imgurl" @click="$router.push('/edit')" />

<script>
  export default {
    name: "Detail",
    props: ["detailItem"],
    data() {
      return {
        defaultImgae: 'this.src="' + require("../assets/user.jpg") + '"',
      };
    },
    methods: {
      pathPush() {
        if (this.$route.path != `/article/${this.detailItem.id}`) {
          this.$router.push(`/article/${this.detailItem.id}`);
        }
      },
    },
  };
</script>
```

## watch() created() 方法

:::tip
watch()：可以监听数据变化。

created()：组件实例创建完成，dom 还未生成，仅仅触发一次。
:::

```javascript
<script>
export default {
  name: "Home",
  components: {
    NavBar,
    Detail
  },
  data() {
    return {
      category: [],
      active: 0
    };
  },
  methods: {
    async selectCategory() {
      const res = await this.$http.get("/category");
      this.changeCategory(res.data);
    },
    changeCategory(data) {
      const category1 = data.map(item => {
        item.list = [];
        item.page = 0;
        item.finished = false;
        item.loading = false;
        item.pagesize = 10;
        return item;
      });
      console.log(category1);
      this.category = category1;
    },
    async selectArticle() {
      const categoryItem = this.categoryItem();
      const res = await this.$http.get("/detail/" + categoryItem._id, {
        params: {
          page: categoryItem.page,
          pagesize: categoryItem.pagesize
        }
      });
      categoryItem.list.push(...res.data);
      if (res.data.length < categoryItem.pagesize) {
        categoryItem.finished = true;
      }
    },
    categoryItem() {
      const categoryItem = this.category[this.active];
      console.log(categoryItem);
      return categoryItem;
    },
    onLoad() {
      const categoryItem = this.categoryItem();
      categoryItem.page += 1;
      categoryItem.loading = false;
      this.selectArticle();
    }
  },
  watch: {
    active() {
      this.selectArticle();
    }
  },
  created() {
    this.selectCategory();
  }
};
</script>

```

## ref 基本用法

:::tip
父组件可以通过 ref 控制 dom 元素及属性，例如：父组件可以调用子组件方法。

1.控制元素：
this.\$refs.postInput.focus();

2.调用方法：
this.\$refs.focusInput.focusIpt();
:::
`子组件`

```html
<input v-model="content" ref="postInput" />
<script>
  export default {
    props: ["dataLength"],
    name: "CommentTitle",
    data() {
      return {
        content: null,
      };
    },
    methods: {
      focusIpt() {
        this.$refs.postInput.focus();
      },
    },
  };
</script>
```

`父组件`

```html
<comment-title ref="focusInput"></comment-title>
<comment
  @comment-len="len => (lens = len)"
  @PostPublish="PostPublish"
></comment>

<script>
  import CommentTitle from "@/components/article/CommentTitle";
  export default {
    name: "Article",
    components: {
      CommentTitle,
    },
    data() {
      return {
          lens: null,
          model: {}
      };
    },
    methods: {
      PostPublish(id) {
        this.$refs.focusInput.focusIpt();
      }
  };
</script>
```

## 正则表达式使用

:::tip
const rue = new RegExp(this.rule);

rue.test(this.content)
:::

```html
<template>
  <div>
    <van-cell-group>
      <!-- 输入任意文本 -->
      <van-field
        :label="label"
        :type="type"
        :placeholder="placeholder"
        :rule="rule"
        v-model="content"
      />
    </van-cell-group>
  </div>
</template>

<script>
  export default {
    props: ["label", "type", "placeholder", "rule"],
    data() {
      return {
        content: "",
      };
    },
    methods: {
      handleulg() {
        const rue = new RegExp(this.rule);
        if (rue.test(this.content)) {
          this.$emit("inputChange", this.content);
        } else {
          this.$emit("inputChange");
        }
      },
    },
    watch: {
      content() {
        console.log("监听");
        this.handleulg();
      },
    },
  };
</script>

<style lang="scss"></style>
```

## dom 元素渲染

:::tip
created()方法 dom 未渲染

this.\$nextTick()方法 主要是用于随数据改变而改变的 dom

mounted()方法 dom 渲染完毕
:::

```vue
<template>
  <div class="about">
    <div ref="msgDiv">{{ msg }}</div>
    <div v-if="msg1">Message got outside $nextTick: {{ msg1 }}</div>
    <div v-if="msg2">Message got inside $nextTick: {{ msg2 }}</div>
    <div v-if="msg3">Message got outside $nextTick: {{ msg3 }}</div>
    <button @click="changeMsg">
      Change the Message
    </button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      msg: "Hello Vue.",
      msg1: "",
      msg2: "",
      msg3: "",
    };
  },
  methods: {
    changeMsg() {
      this.msg = "Hello world.";
      this.msg1 = this.$refs.msgDiv.innerHTML;
      // this.$nextTick()方法主要是用在随数据改变而改变的dom应用场景中，
      // vue中数据和dom渲染由于是异步的，
      // 所以，要让dom结构随数据改变这样的操作都应该放进this.$nextTick()的回调函数中
      // mounted()的钩子函数则是在dom完全渲染后才开始渲染数据，所以，在mounted()中操作dom基本不会存在渲染问题
      this.$nextTick(() => {
        this.msg2 = this.$refs.msgDiv.innerHTML;
      });
      this.msg3 = this.$refs.msgDiv.innerHTML;
    },
  },
};
</script>
```
