### 学习笔记 📒

##### 部署流程

```
npm install

npm run docs:dev

npm run docs:build

npm run docs:deploy
```

##### 安装音乐播放器

```
npm i zw-player --save

```

##### 使用音乐播放器

```html
<template>
  <div id="app">
    <Player></Player>
  </div>
</template>

<script>
  import Player from "zw-player";

  export default {
    name: "App",
    components: {
      Player,
    },
  };
</script>

<style></style>
```
