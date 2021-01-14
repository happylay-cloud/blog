---
# 文章标题
title: goframe常见问题总结
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2021-01-14 17:12:28
# 所属标签（可以设置多个🏷）
tags:
  - 代码片段
  - golang
  - goframe
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

摘要: goframe常见问题总结
时间: 2021-01-14

---

<img src="/img/8.jpg" width="256px" height="144px">

<!-- more -->
## sqlite3打二进制后无法读取解决方案
:::tip
_**由于`goframe`不会从`内存`中读取`sqlite3`文件，所以可以采取折中的方式，从内存中加载文件到本地。**_
:::
```go
package main

import (
	_ "github.com/gogf/gf-gen/boot"
	_ "github.com/gogf/gf-gen/router"

	"io/ioutil"

	"github.com/gogf/gf/frame/g"
	"github.com/gogf/gf/os/gfile"
	"github.com/gogf/gf/os/gres"
)

func main() {

	// 搜索文件路径-(源码加载文件方式)
	if absPath, err := gfile.Search("./db/sqlite3.db"); err == nil {
		g.Log().Info("绝对路径", absPath)
	} else {
		g.Log().Error("错误信息", err)
	}

	// sqlite3数据库所在路径
	path := "./db"

	// sqlite3数据库名称
	fileName := "sqlite3.db"

	// 内存文件路径（不能以./开头）
	memoryPath := "db/sqlite3.db"

	// 判断文件夹是否为空
	if empty := gfile.IsEmpty(path); empty {
		// 文件夹为空则创建文件夹
		if err := gfile.Mkdir(path); err == nil {
			// 从内存中获取资源文件
			file := gres.Get(memoryPath)
			// 将资源文件写入本地
			if err := ioutil.WriteFile(path+"/"+fileName, file.Content(), 0666); err != nil {
				// 记录错误日志
				g.Log().Error(err)
			}
			// 打印文件信息
			g.Dump(file)
		} else {
			// 记录错误日志
			g.Log().Error(err)
		}

	}

	g.Server().Run()

}
```