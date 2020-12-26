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

:::tip
vscode 代码块左移 cmd + [ ，代码块右移 cmd +]
:::
