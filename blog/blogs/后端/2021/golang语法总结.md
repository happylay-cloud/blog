---
# 文章标题
title: golang语法总结
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2021-01-02 17:32:25
# 所属标签（可以设置多个🏷）
tags:
  - 代码片段
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

摘要: golang语法总结
时间: 2021-01-02

---

<img src="/img/12.jpg" width="256px" height="144px" />

<!-- more -->
## 结构体
```go
package main

import (
	"fmt"
	"strconv"
)

// Book 结构体
type Book struct {
	id   int
	name string
}

// 类似java toString()
func (b Book) String() string {
	if b.id == 0 && b.name == "" {
		return ""
	}
	return "重写toString():[" + strconv.Itoa(b.id) + "," + b.name + "]"
}

// Test1 方法1
func (b Book) Test1() {
	// 原值不会改变
	b.name = "大秦赋"
	fmt.Println("方法一")
}

// Test2 指针方法二
func (b *Book) Test2() {
	b.name = "大秦赋"
	fmt.Println("方法二")
}

// Add 函数
func Add(a, b int) interface{} {
	return a + b
}

func main() {

	// 默认调用String()方法
	fmt.Println(Book{})

	book := Book{id: 1, name: "hi"}
	fmt.Println(book)

	// 不会改变值
	book.Test1()
	fmt.Println(book)

	// 会改变值
	book.Test2()
	fmt.Println(book)

	fmt.Println(Add(2020, 2021))
}
```