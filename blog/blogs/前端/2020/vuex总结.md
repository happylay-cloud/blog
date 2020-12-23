---
# 文章标题
title: vuex总结
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

摘要: vuex 总结
时间: 2020-12-23

---

<img src="/img/9.jpg" width="256px" height="144px">

<!-- more -->

## APP.vue

```vue
<template>
  <div>
    <my-addition></my-addition>

    <p>---------------------------------</p>

    <my-subtraction></my-subtraction>
  </div>
</template>

<script>
import Addition from "./components/Addition.vue";
import Subtraction from "./components/Subtraction.vue";

export default {
  data() {
    return {};
  },
  components: {
    "my-addition": Addition,
    "my-subtraction": Subtraction,
  },
};
</script>
```

## main.js

```javascript
import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
```

## store.js

```javascript
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
  },
  // 只有 mutations 中定义的函数，才有权利修改 state 中的数据
  mutations: {
    add(state) {
      // 不要在 mutations 函数中，执行异步操作
      // setTimeout(() => {
      //   state.count++
      // }, 1000)
      state.count++;
    },
    addN(state, step) {
      state.count += step;
    },
    sub(state) {
      state.count--;
    },
    subN(state, step) {
      state.count -= step;
    },
  },
  actions: {
    addAsync(context) {
      setTimeout(() => {
        // 在 actions 中，不能直接修改 state 中的数据；
        // 必须通过 context.commit() 触发某个 mutation 才行
        context.commit("add");
      }, 1000);
    },
    addNAsync(context, step) {
      setTimeout(() => {
        context.commit("addN", step);
      }, 1000);
    },
    subAsync(context) {
      setTimeout(() => {
        context.commit("sub");
      }, 1000);
    },
    subNAsync(context, step) {
      setTimeout(() => {
        context.commit("subN", step);
      }, 1000);
    },
  },
  getters: {
    showNum(state) {
      return "当前最新的数量是【" + state.count + "】";
    },
  },
});
```

## Addition.vue

```vue
<template>
  <div>
    <!-- <h3>当前最新的count值为：{{$store.state.count}}</h3> -->
    <h3>{{ $store.getters.showNum }}</h3>
    <button @click="btnHandler1">+1</button>
    <button @click="btnHandler2">+N</button>
    <button @click="btnHandler3">+1 Async</button>
    <button @click="btnHandler4">+N Async</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    btnHandler1() {
      this.$store.commit("add");
    },
    btnHandler2() {
      // commit 的作用，就是调用 某个 mutation 函数
      this.$store.commit("addN", 3);
    },
    // 异步地让 count 自增 +1
    btnHandler3() {
      // 这里的 dispatch 函数，专门用来触发 action
      this.$store.dispatch("addAsync");
    },
    btnHandler4() {
      this.$store.dispatch("addNAsync", 5);
    },
  },
};
</script>
```

## Subtraction.vue

```vue
<template>
  <div>
    <!-- <h3>当前最新的count值为：{{count}}</h3> -->
    <h3>{{ showNum }}</h3>
    <button @click="btnHandler1">-1</button>
    <button @click="subN(3)">-N</button>
    <button @click="subAsync">-1 Async</button>
    <button @click="subNAsync(5)">-N Async</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["count"]),
    ...mapGetters(["showNum"]),
  },
  methods: {
    ...mapMutations(["sub", "subN"]),
    ...mapActions(["subAsync", "subNAsync"]),
    btnHandler1() {
      this.sub();
    },
  },
};
</script>
```

## 总结

:::tip
A.state

state 提供唯一的公共数据源，所有共享的数据都要统一放到 store 中的 state 中存储

:::

```javascript
在组件中访问 state 的方式：

1).this.$store.state.全局数据名称  如：this.$store.state.count

2).先按需导入 mapState 函数： import { mapState } from 'vuex'

然后数据映射为计算属性： computed:{ ...mapState(['全局数据名称']) }
```

:::tip
B.mutation

mutation 用于修改变更\$store 中的数
:::

```javascript
1).声明
mutations: {
    add(state,step){
      //第一个形参永远都是state也就是$state对象
      //第二个形参是调用add时传递的参数
      state.count+=step;
    }
  }

2).使用：方式一

methods:{
  Add(){
    //使用commit函数调用mutations中的对应函数，
    //第一个参数就是我们要调用的mutations中的函数名
    //第二个参数就是传递给add函数的参数
    this.$store.commit('add',10)
  }
}

3).使用：方式二
import { mapMutations } from 'vuex'

methods:{
  ...mapMutations(['add'])
}
```

:::tip
C.action

在 mutations 中不能编写异步的代码，会导致 vue 调试器的显示出错。

在 vuex 中使用 action 来执行异步操作。

:::

```javascript
3).声明
actions: {
  addAsync(context,step){
    setTimeout(()=>{
      context.commit('add',step);
    },2000)
  }
}

2).使用：方式一
<button @click="AddAsync">...+1</button>

methods:{
  AddAsync(){
    this.$store.dispatch('addAsync',5)
  }
}

3).使用：方式二
import { mapActions } from 'vuex'

methods:{
  ...mapMutations(['subAsync'])
}
```

:::tip
D.getter

getter 用于对 store 中的数据进行加工处理形成新的数据

它只会包装 store 中保存的数据，并不会修改 store 中保存的数据，当 store 中的数据发生变化时，getter 生成的内容也会随之变化

:::

```javascript

2).声明
export default new Vuex.Store({
  .......
  getters:{
    //添加了一个showNum的属性
    showNum : state =>{
      return '最新的count值为：'+state.count;
    }
  }
})

2).使用：方式一
{{$store.getters.showNum}}

3).使用：方式二
import { mapGetters } from 'vuex'
computed:{
  ...mapGetters(['showNum'])
}
```
