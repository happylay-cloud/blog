---
# 文章标题
title: ffmpeg视频推流总结
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2021-02-01 21:44:46
# 所属标签（可以设置多个🏷）
tags:
  - golang
  - 直播
# 所属分类（可以设置多个💖）
categories:
  - 后端
# 是否开启侧边栏
sidebar: "auto"
# 文章置顶（数字代表排序权重📚）
sticky: 0
# 文章是否发布 true（发布）false(草稿)
publish: true
---

---

摘要: ffmpeg视频推流总结
时间: 2021-02-01

---

<img src="/img/7.jpg" width="256px" height="144px">

<!-- more -->

## 准备环境

### _[安装ffmpeg客户端](https://www.ffmpeg.org/download.html)_

> [mac下载地址](https://evermeet.cx/ffmpeg/)
> [linux下载地址](https://johnvansickle.com/ffmpeg/)
> [windows下载地址](https://www.gyan.dev/ffmpeg/builds/)

### _[安装livego服务端](https://github.com/gwuhaolin/livego)_
> _[视频素材demo.flv下载](https://s3plus.meituan.net/v1/mss_7e425c4d9dcb4bb4918bbfa2779e6de1/mpack/default/demo.flv)_

## 视频推流

### 启动livego服务
```shell
# linux 或 mac 环境下
# 赋予可执行权限
chomd 755 livego

# 启动服务
./livego

# windows 环境下
# 启动服务
livego.exe 
```

### 获取密钥
`请求`
```http
http://localhost:8090/control/get?room=movie
```
`响应`
```json
{
    "status": 200,
    "data": "rfBd56ti2SMtYvSgD5xAV0YU99zampta7Z7S575KLkIZ9PYk" // 密钥
}
```
### 视频推流
`命令行输入以下命令`
> 格式：ffmpeg -re -i 视频文件 -c copy -f flv rtmp://localhost:1935/live/密钥

```shell
ffmpeg -re -i demo.flv -c copy -f flv rtmp://localhost:1935/live/rfBd56ti2SMtYvSgD5xAV0YU99zampta7Z7S575KLkIZ9PYk
```

### 视频播放
```
RTMP:rtmp://localhost:1935/live/movie

FLV:http://127.0.0.1:7001/live/movie.flv

HLS:http://127.0.0.1:7002/live/movie.m3u8
```
## 第三方库
> [goffmpeg](https://github.com/xfrr/goffmpeg)
> [go-libav](https://github.com/imkira/go-libav)
> [flv.js](https://github.com/bilibili/flv.js)