---
# 文章标题
title: protobuf安装与使用
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2021-01-30 18:16:52
# 所属标签（可以设置多个🏷）
tags:
  - golang
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

摘要: protobuf安装与使用
时间: 2021-01-30

---

<img src="/img/5.jpg" width="256px" height="144px">

<!-- more -->

## [安装protoc](https://github.com/protocolbuffers/protobuf/releases)

## [安装protoc-gen-go](https://github.com/golang/protobuf)

```shell
git clone https://github.com/golang/protobuf.git

cd protobuf/protoc-gen-go

go install
```
## [安装protoc-gen-validate](https://github.com/envoyproxy/protoc-gen-validate)
_**`用来生成pb的校验规则文件，即*.pb.validate.go`**_

```shell
go get -u -v github.com/envoyproxy/protoc-gen-validate
```

## [安装protoc-gen-doc](https://github.com/pseudomuto/protoc-gen-doc/releases)

