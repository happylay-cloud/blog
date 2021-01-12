---
# 文章标题
title: gcc编译环境配置
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2021-01-12 16:17:49
# 所属标签（可以设置多个🏷）
tags:
  - windows
  - gcc
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

摘要: gcc编译环境配置
时间: 2021-01-12

---

<img src="/img/9.jpg" width="256px" height="144px">

<!-- more -->
## [windows编译环境安装包下载](https://sourceforge.net) 

### 在线安装gcc等编译环境（mingw-w64包含make）

* [mingw-w64在线安装-地址1](https://jaist.dl.sourceforge.net/project/mingw-w64/Toolchains%20targetting%20Win32/Personal%20Builds/mingw-builds/installer/mingw-w64-install.exe)

* [mingw-w64在线安装-地址2](https://nchc.dl.sourceforge.net/project/mingw-w64/Toolchains%20targetting%20Win32/Personal%20Builds/mingw-builds/installer/mingw-w64-install.exe)

### 离线安装gcc等编译环境（mingw-w64包含make）

 * [mingw-w64离线安装-地址1](https://nchc.dl.sourceforge.net/project/mingw-w64/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/8.1.0/threads-posix/seh/x86_64-8.1.0-release-posix-seh-rt_v6-rev0.7z)

 * [mingw-w64离线安装-地址2](https://jaist.dl.sourceforge.net/project/mingw-w64/Toolchains%20targetting%20Win64/Personal%20Builds/mingw-builds/8.1.0/threads-posix/seh/x86_64-8.1.0-release-posix-seh-rt_v6-rev0.7z)

> _**解压`x86_64-8.1.0-release-posix-seh-rt_v6-rev0.7z`文件，进入`bin`文件夹，重命名`mingw32-make.exe`为`make.exe`。**_

> _**设置环境变量，鼠标点击此电脑，右键属性，高级系统设置，环境变量，系统变量，Path下添加`C:\mingw64\bin`。**_

### 安装make（可选）
* [mingw仓库地址](https://jaist.dl.sourceforge.net/project/mingw/)

* [make安装-地址1](https://jaist.dl.sourceforge.net/project/mingw/MinGW/Extension/make/mingw32-make-3.80-3/mingw32-make-3.80.0-3.exe) 

* [make安装-地址2](https://udomain.dl.sourceforge.net/project/mingw/MinGW/Extension/make/mingw32-make-3.80-3/mingw32-make-3.80.0-3.exe)


### [安装tdm-gcc（可选）](https://jmeubank.github.io/tdm-gcc/)

### [安装cygwin（可选）](http://www.cygwin.com)
`镜像站点`
```
http://mirrors.163.com/cygwin/

http://mirrors.aliyun.com/cygwin/
```
## mac编译环境安装
### 安装交叉编译工具
```shell
brew install mingw-w64

brew install FiloSottile/musl-cross/musl-cross
```
### 交叉编译命令
```shell
# 编译linux
CGO_ENABLED=1 GOOS=linux GOARCH=amd64 CC=x86_64-linux-musl-gcc CGO_LDFLAGS="-static" go build -a -v -o app-linux-amd64

# 编译windows
CGO_ENABLED=1 GOOS=windows GOARCH=amd64 CC=x86_64-w64-mingw32-gcc go build -v -o app-windows-amd64.exe

# 编译mac
CGO_ENABLED=1 GOOS=darwin GOARCH=amd64 go build -o app-darwin-amd64
```