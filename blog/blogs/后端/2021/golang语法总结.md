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
## 变量提升

```go
package main

import "fmt"

// User 用户
type User struct {
	// 匿名字段
	string
	int
}

// Worker 打工人
type Worker struct {
	id   int
	name string
	user User
}

// Worker1 打工人
type Worker1 struct {
	id   int
	name string
	// 匿名变量
	User
}

func main() {

	// 匿名字段
	u1 := User{"大秦赋", 150}
	fmt.Println(u1.string, u1.int)

	// 匿名结构体
	u2 := struct {
		name string
		age  int
	}{"快乐的小绵羊", 18}

	fmt.Println(u2.name, u2.age)

	// 结构体嵌套
	w := Worker{id: 1, name: "快乐的小绵羊", user: User{"打工人", 18}}
	fmt.Println(w)

	// 结构体嵌套（变量提升）
	w1 := Worker1{1, "快乐的小绵羊", User{"打工人", 18}}
	fmt.Println(w1)
	// 变量提升
	fmt.Println(w1.string)
	fmt.Println(w1.User.string)

	// 匿名函数
	var f1 = func() {
		fmt.Println("匿名函数")
	}

	f1()
}
```
## 接口
```go
package main

import "fmt"

func main() {

	// 接口实现值类型
	var s1 UserService = User1{}
	s1.getName()

	// 接口实现指针类型
	var s2 UserService = &User2{}
	s2.getName()

  s3 := User1{}
	s3.getName()

	s4 := User2{}
	s4.getName()

}

// UserService 接口服务
type UserService interface {
	getName()
}

// User1 实体类
type User1 struct {
	name string
	age  int
}

// User2 实体类
type User2 struct {
	name string
	age  int
}

// 方法接收者是个值类型
func (u User1) getName() {
	fmt.Println("接口实现1")
}

// 方法接受者是个指针类型
func (u *User2) getName() {
	fmt.Println("接口实现2")
}
```
## 接口断言
```go
package main

import "fmt"

// DoorService 接口服务
type DoorService interface {
	open()
}

// DoorServiceImpl 实体类
type DoorServiceImpl struct {
}

// 接口实现
func (d DoorServiceImpl) open() {
	fmt.Println("开门")
}

// 函数
func getType(t DoorService) {

	// 接口断言 实际类型,断言返回值(true或false) := 接口对象.(实现类型)
	if ins, ok := t.(DoorServiceImpl); ok {
		fmt.Println("断言一", ins)
	}

	// 实际类型:=接口对象.(type)
	switch ins := t.(type) {
	case DoorServiceImpl:
		fmt.Println("断言二", ins)
	}
}

func main() {

	var d DoorService = DoorServiceImpl{}

	d.open()

	getType(d)

}
```
## 回调函数
```go
package main

// callback 高级函数，回调函数
func callback(a, b int, fun func(int, int) int) int {

	println(a, b, fun)

	res := fun(a, b)

	println(res)

	return res
}

// add 加法函数
func add(a, b int) int {
	return a + b
}

// sub 减法函数
func sub(a, b int) int {
	return a - b
}
func main() {

	callback(1, 2, add)

	callback(1, 2, sub)
}

```