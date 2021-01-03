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
## 常用命令
```
go mod init 项目名

go mod tidy    

go mod download
```
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
## 闭包结构
```go
package main

import "fmt"

// 闭包结构
func allFun() func(a, b int) int {

	// 闭包结构局部变量不会随外层函数结束而销毁，内层函数还在继续使用
	i := 0
	// 匿名函数
	fun := func(a, b int) int {
		i++
		return a + b + i
	}

	return fun
}

func main() {

	res := allFun()
	fmt.Println(res(1, 2))
	fmt.Println(res(1, 2))

}
```
## type定义类型
```go
package main

import "fmt"

// 1.定义新的类型myint（不是起别名）
type myint int

// 2.定义函数类型
type myfun func(int, int) int

// 3.定义类型别名
type myint2 = int

// 函数
func add() myfun {

	fun := func(a, b int) int {

		return a + b
	}

	return fun

}

func main() {

	// 新类型
	var t1 myint = 1
	fmt.Println(t1)

	// 类型别名
	var t2 myint2
	t3 := 2

	t2 = t3
	fmt.Println(t2)

	// 函数别名
	fmt.Println(add()(1, 2))
}
```
## errors错误
```go
package main

import (
	"errors"
	"fmt"
)

// 函数
func checkOk(age int) error {
	if age < 0 {
		// 返回error对象
		return errors.New("非法数据")
	}
	fmt.Println(age)
	return nil
}
func main() {

	// errors创建一个错误
	err := errors.New("创建错误")
	fmt.Printf("%T\n", err)

	// fmt创建一个错误方法
	err1 := fmt.Errorf("错误信息码：%d", 100)
	fmt.Println(err1)

	err2 := checkOk(-1)
	if err != nil {
		fmt.Println(err2)
		return
	}
}
```
### 获取错误类型
```go
package main

import (
	"fmt"
	"log"
	"os"
)

func main() {

	f, err := os.Open("go.mod")
	if err != nil {
		// 通过断言获取实现类
		if ins, ok := err.(*os.PathError); ok {
			fmt.Println("方式一")
			fmt.Println(ins.Op)
			fmt.Println(ins.Path)
			fmt.Println(ins.Err)
		}
		switch ins := err.(type) {
		case *os.PathError:
			fmt.Println("方式二")
			fmt.Println(ins)
		}

		log.Fatal(err)
	}
	fmt.Println(f.Name(), "打开文件成功")

}
```
### 判断错误类型
```go
package main

import (
	"fmt"
	"net"
	"path/filepath"
)

func main() {

	// 对某个主机名执行DNS查询,返回主机地址
	addr, err := net.LookupHost("www.baidu.com1")
	fmt.Println(addr, err)
	if ins, ok := err.(*net.DNSError); ok {
		if ins.Timeout() {
			fmt.Println("超时超时")
		} else if ins.Temporary() {
			fmt.Println("临时错误")
		} else {
			fmt.Println("一般错误")
		}
		fmt.Println(ins)
	}

	// 返回所有匹配的文件
	files, err := filepath.Glob("*.go")
	if err != nil && err == filepath.ErrBadPattern {
		fmt.Println(err)
	}
	fmt.Println(files)

	// 忽略错误
	files1, _ := filepath.Glob("[")
	fmt.Println(files1)
}
```
### 自定义错误
```go
package main

import "fmt"

// 定义错误结构体
type myError struct {
	msg  string
	code int
}

// 接口实现，实现Error()方法
func (e *myError) Error() string {
	return fmt.Sprintf("错误信息：%s,错误码：%d", e.msg, e.code)
}

// 函数
func checkOk(age int) (int, error) {

	if age < 0 {
		return 0, &myError{"自定义错误", 500}
	}
	return age, nil
}
func main() {

	res, err := checkOk(-1)
	if err != nil {
		// 使用断言获取自定义错误数据
		if ins, ok := err.(*myError); ok {
			fmt.Println(ins.msg)
		}
		fmt.Println(err)
	}
	fmt.Println(res)
}
```
## panic 恐慌 recover 恢复
```go
package main

import "fmt"

func main() {

	// recover 恢复
	defer func() {
		if msg := recover(); msg != nil {
			fmt.Println(msg)
		}
	}()

	var f = func() {
		fmt.Println("延迟执行")
	}
	defer f()
	// panic 恐慌，中断程序
	panic("发生恐慌")

}
```
## switch
```go
package main

import "fmt"

func main() {

	switch num := 3; num {
	case 1, 3:
		fmt.Println("1,3")
		// 必须放在最后一行
		fallthrough
	case 2:
		fmt.Println("2")
		break

	default:
		fmt.Println("默认")
	}
}
```
## 切片
### 创建新切片
```go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {

	// 数组
	arr := [...]string{"张三", "李四", "王五"}

	// 遍历数据
	for index, value := range arr {
		fmt.Println(index, value)
	}

	// 切片
	a1 := []int{1, 2, 3, 4, 5}
	a2 := make([]int, 0, 5)

	res11 := len(a1)
	res21 := len(a2)
	fmt.Println(res11, res21)

	res12 := cap(a1)
	res22 := cap(a2)
	fmt.Println(res12, res22)

	fmt.Println(a2)
	// 添加元素
	a2 = append(a2, 1, 2)
	fmt.Println(a2)

	// 添加元素（切片,切片...）
	a2 = append(a1, a2...)

	fmt.Println(a2)

	// 设置种子数（时间戳）
	rand.Seed(time.Now().UnixNano())
	// 生成随机数
	num := rand.Intn(100)

	fmt.Println(num)
}
```
### 从已有数组中创建切片
:::tip
从已有数组中创建切片，该切片底层数据指向当前数组，

切片一旦扩容，会重新指向一个新的底层数组。
:::
```go
package main

import "fmt"

func main() {

	// 创建切片类型{元素1,元素2}
	arr := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	fmt.Printf("arr地址：%p\n", &arr)

	s1 := arr[:10]
	fmt.Println("s1", s1)

	s2 := arr[2:5]
	fmt.Println("s2", s2)

	s1[2] = 100
	// 添加元素（切片,元素1,元素2）
	s1 = append(s1, 300)
	fmt.Println(arr, s1, s2)

	fmt.Printf("s1地址：%p\n", &s1)
}
```
## map使用
```go
package main

import (
	"fmt"
	"sort"
)

func main() {

	var m1 = make(map[string]string)

	m1["id"] = "1"
	fmt.Println(m1)

	var m2 = map[string]string{"id": "1", "name": "嬴政"}
	fmt.Println(m2)

	v1, ok := m2["name"]
	if ok {
		fmt.Println(v1)
	} else {
		fmt.Println("键不存在", v1)
	}
	// 删除数据
	delete(m2, "name")

	fmt.Println(m2)

	// 遍历
	for key, value := range m2 {
		fmt.Println(key, value)
	}

	var m3 = map[int]int{1: 1, 2: 2, 3: 3, 6: 6, 5: 5}

	// 创建切片（切片类型，长度，容量）
	arr := make([]int, 0, len(m3))

	for key := range m3 {
		// 添加元素（切片,元素1,元素2）
		arr = append(arr, key)
	}

	fmt.Println(arr)

	// 冒泡排序
	sort.Ints(arr)

	fmt.Println(arr)

}
```
## 字符串
```go
package main

import (
	"fmt"
	"strconv"
	"strings"
)

func main() {

	str :=
		`这是字符串模板
		哈哈哈`
	fmt.Println(str)

	// 是否包含指定内容
	res := strings.Contains(str, "字符串")
	fmt.Println(res)

	// 是否包含任意一个字符
	res1 := strings.ContainsAny(str, "a字b")
	fmt.Println(res1)

	// 统计字符串出现的次数
	res2 := strings.Count(str, "字符")
	fmt.Println(res2)

	// 是否以某个字符串开头
	res3 := strings.HasPrefix(str, "这是")
	fmt.Println(res3)

	// 是否以某个字符串结尾
	res4 := strings.HasSuffix(str, "哈哈")
	fmt.Println(res4)

	// 获取字符串下标
	res5 := strings.Index(str, "这")
	fmt.Println(res5)

	str2 := []string{"张三", "李四"}
	str3 := strings.Join(str2, "-")
	fmt.Println(str3)

	// 字符串切割
	str4 := "a,b,c,d"
	a4 := strings.Split(str4, ",")
	fmt.Println(a4)

	// 转换小写
	s1 := strings.ToLower(str4)
	fmt.Println(s1)

	// 转换大写
	s2 := strings.ToUpper(str4)
	fmt.Println(s2)

	ss1 := "true"

	// 字符串转布尔类型
	b1, err := strconv.ParseBool(ss1)
	fmt.Println(b1, err)

	// 布尔类型转字符串
	ss11 := strconv.FormatBool(b1)
	fmt.Println(ss11, err)

	ss2 := "100"
	// 字符串转数值 -> 字符串,进制,位数
	i2, err := strconv.ParseInt(ss2, 10, 64)
	fmt.Println(i2, err)

	// 数值转字符串 -> 数值,进制
	ss3 := strconv.FormatInt(i2, 10)
	fmt.Println(ss3)

	// 字符串转int
	i2020, err := strconv.Atoi("-2020")
	fmt.Println(i2020, err)

	// int转字符串
	str2020 := strconv.Itoa(i2020)
	fmt.Println(str2020)

}
```
## 并发
### 同步等待组
```go
package main

import (
	"fmt"
	"sync"
)

// 创建同步等待组对象
var wg sync.WaitGroup

func main() {

	// 设置等待组中要执行的子协程
	wg.Add(2)

	go func() {
		fmt.Println("执行一")
		// 等待组计数器减一
		wg.Done()
	}()

	go func() {
		fmt.Println("执行二")
		// 等待组计数器减一
		wg.Done()
	}()

	// 让主协程处于等待状态
	wg.Wait()

	fmt.Println("执行完成")
}
```
### 互斥锁
```go
// 创建互斥锁对象
var mutex sync.Mutex
// 上锁
mutex.Lock()
// 解锁
defer mutex.Unlock()
```
### 读写锁
```go
package main

import (
	"fmt"
	"sync"
	"time"
)

// 可以随便读，但是写操作，不能读也不能写
// 创建读写锁
var rwMutex *sync.RWMutex

// 创建同步等待组对象
var wg *sync.WaitGroup

func main() {
	// 实例化对象
	rwMutex = new(sync.RWMutex)
	wg = new(sync.WaitGroup)

	wg.Add(6)
	go readData(1)
	go readData(2)
	go readData(3)

	go writeData(1)
	go readData(2)
	go writeData(3)

	wg.Wait()

	fmt.Println("主函数结束")
}

// 函数
func readData(i int) {
	defer wg.Done()
	fmt.Println("开始读read")
	// 读操作上锁
	rwMutex.RLock()
	fmt.Println("正在读数据...", i)
	// 让程序进入休眠状态
	time.Sleep(time.Duration(2) * time.Second)
	// 读操作解锁
	rwMutex.RUnlock()
	fmt.Println("读结束", i)
}

// 函数
func writeData(i int) {
	defer wg.Done()
	fmt.Println("开始写write")
	// 写操作上锁
	rwMutex.Lock()
	fmt.Println("正在读数据...", i)
	// 让程序进入休眠状态
	time.Sleep(time.Duration(5) * time.Second)
	// 读操作解锁
	rwMutex.Unlock()
	fmt.Println("写结束", i)

}
```
### 通道
```go
package main

import "fmt"

func main() {

	// 定义一个通道
	var ch1 chan bool
	ch1 = make(chan bool)

	// 运行一个协程
	go func() {
		for i := 0; i < 10; i++ {
			fmt.Println(i)
		}
		// 程序结束，向通道中写数据
		ch1 <- true
		fmt.Println("协程结束")
	}()

	// 从通道中读数据，阻塞
	data := <-ch1
	fmt.Println("主函数读数据", data)
	fmt.Println("主函数结束")

}
```
```go
package main

import (
	"fmt"
	"time"
)

func main() {

	ch1 := make(chan int)

	// 运行一个协程
	go func() {

		fmt.Println("子协程开始执行")
		// 让程序进入休眠状态
		time.Sleep(time.Duration(5) * time.Second)
		data := <-ch1

		fmt.Println("读取数据", data)
	}()

	ch1 <- 100
	fmt.Println("主函数结束")
}
```
```go
package main

import (
	"fmt"
	"time"
)

func main() {

	// 创建一个通道main
	ch1 := make(chan int)

	go sendData(ch1)
	for {
		// 让程序进入休眠状态
		time.Sleep(time.Duration(1) * time.Second)
		v, ok := <-ch1
		if !ok {
			fmt.Println("已经读取所有数据", v, ok)
			break
		}
		fmt.Println("读取数据", v, ok)
	}

	fmt.Println("主程序结束")
}

// 函数
func sendData(ch1 chan int) {

	// 发送数据
	for i := 0; i < 10; i++ {
		// 将数据写入通道
		ch1 <- i
	}
	// 关闭通道
	close(ch1)
}
```