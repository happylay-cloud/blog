---
# 文章标题
title: vue3总结
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2020-12-31
# 所属标签（可以设置多个🏷）
tags:
  - 代码片段
  - vue3
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

摘要: vue3 总结
时间: 2020-12-23

---

<img src="/img/18.jpg" width="256px" height="144px">

<!-- more -->

## 模板

```vue
<template>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive, computed } from 'vue'
export default defineComponent({
  name: 'happylay',
  props: [],
  components: {},
  setup(props, context) {
    // 常用写法：setup(props, { attrs, slots, emit }) {
    console.log(props, context)
    function emitEvent() {
      context.emit('event', '注册事件')
    }
    const data = ref('基本类型数据，对象和数组会自动转为reactive代理对象')
    const obj = reactive({
      id: 1,
      name: '对象',
      msg: '递归深度响应式'
    })
    const computedValue = computed(() => {
      return '计算属性' + data.value
    })
    const computedMethods = computed({
      get() {
        return
      },
      set(val) {
        console.log('计算属性', val)
        return
      }
    })
    const getValue = () => {
      console.log('获取数据（用.value获取属性值）', data.value)
    }
    return {
      data,
      obj,
      ...toRefs(obj), // toRefs把响应式对象转换成普通对象，普通对象的每个属性都为ref
      emitEvent,
      getValue,
      computedValue,
      computedMethods
    }
  },
  beforeCreate() {
    console.log('数据初始化的生命周期回调')
  },
  mounted() {
    console.log(this)
  }
})
</script>

<style scoped lang="scss">
</style>
```

## ref其余用法
```vue
<template>
  <div>
    <h2>获取页面元素</h2>
    <input type="text" ref="inputRef" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
  setup() {
    console.log('初始化')

    // 默认为空，页面加载完毕，组件存在后，获取文本框元素
    const inputRef = ref<HTMLElement | null>(null)

    // 页面加载后
    onMounted(() => {
      inputRef.value && inputRef.value.focus()
    })

    return {
      inputRef
    }
  }
})
</script>

<style scoped lang="scss">
</style>
```