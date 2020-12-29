---
# 文章标题
title: dom渲染总结
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2020-12-29
# 所属标签（可以设置多个🏷）
tags:
  - 代码片段
  - dom
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

摘要: dom 渲染总结
时间: 2020-12-29

---

<img src="/img/11.jpg" width="256px" height="144px">

<!-- more -->

## vue dom 渲染

:::tip
对对象中属性操作会被渲染，对集合操作不会被渲染，

可以使用 Vue.set(target, key, value) 或者 this.\$set(target, key, value)方法修改数据

- target:要更改的数据源（可以是对象或者数组）
- key:要更改的具体数据
- value:重新赋的值

:::

```html
<!DOCTYPE html>
<html>
  <head lang="en">
    <meta charset="UTF-8" />
    <title></title>
  </head>

  <body>
    <div id="app2">
      <p v-for="item in items" :key="item.id">
        {{item.message}}
      </p>
      <p v-for="(item,index) in student.list" :key="index">
        {{item}}
      </p>
      <pre>{{items}}</pre>
      <pre>{{student}}</pre>
      <button class="btn" @click="btn2Click()">动态赋值</button><br />
      <button class="btn" @click="btn2errorClick()">
        动态赋值（不会立即渲染）</button
      ><br />
      <button class="btn" @click="btn2pushClick()">动态赋值（push）</button
      ><br />
      <button class="btn" @click="btn2deleteClick()">动态赋值（splice）</button
      ><br />
      <button class="btn" @click="btn3Click()">为data新增属性</button>
    </div>
    <!-- 开发环境版本，包含了有帮助的命令行警告 -->
    <script
      src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"
      type="text/javascript"
    ></script>
    <script>
      var vm2 = new Vue({
        el: "#app2",
        data: {
          items: [
            { message: "Test one", id: "1" },
            { message: "Test two", id: "2" },
            { message: "Test three", id: "3" },
          ],
          student: {
            id: 1,
            name: "李华",
            list: [
              {
                id: 1,
                name: "张三",
              },
            ],
          },
        },
        methods: {
          // Vue.set(target, key, value)
          // target：要更改的数据源（可以是对象或者数组）
          // key：要更改的具体数据
          // value ：重新赋的值
          btn2Click: function() {
            Vue.set(this.items, 0, { message: "Change Test", id: "10" });
            //this.$set(this.items, 0, { message: "Change Test", id: '10' })
          },
          // 数据不会立即渲染
          btn2errorClick: function() {
            const data = [
              { message: "数据", id: "10" },
              { message: "数据", id: "20" },
              { message: "数据", id: "30" },
            ];
            // 会渲染
            this.items = data;

            // 不会渲染
            this.items[0] = { message: "Change Test", id: "10" };

            // 备注：只要有一个数据渲染就会被同时渲染

            // 会渲染
            //this.student.name = '大秦赋'
            // 会渲染
            //this.student.list[0].name = '大秦赋'
            // 会渲染
            //this.student.list[0].name = { name: "大秦赋", id: '2' }
            // 不会渲染
            this.student.list[0] = { name: "大秦赋", id: "2" };
          },
          // 数据会被渲染
          btn2pushClick: function() {
            const l1 = { message: "Change Test", id: "10" };
            this.items.push(l1);
          },
          btn2deleteClick: function() {
            // delete 操作符会从某个对象上移除指定属性。成功删除的时候会返回 true，否则返回 false
            // delete this.items[0]

            // 获取删除下标序列
            const index = this.items.findIndex((x) => x.id === "3");
            if (index != -1) {
              // 删除下标元素
              this.items.splice(index, 1);
            }
          },
          // 新增对象
          btn3Click: function() {
            var itemLen = this.items.length;
            Vue.set(this.items, itemLen, {
              message: "Test add attr",
              id: itemLen,
            });
          },
        },
      });
    </script>
  </body>
  <!-- https://www.jianshu.com/p/e6e8c45e7fd6 -->
</html>
```
