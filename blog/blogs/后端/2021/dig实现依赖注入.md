---
# 文章标题
title: dig实现依赖注入
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2021-01-18 21:12:53
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

摘要: dig实现依赖注入
时间: 2021-01-18

---

<img src="/img/2.jpg" width="256px" height="144px">

<!-- more -->
## 安装
```sh
go get -v go.uber.org/dig
或
require go.uber.org/dig v1.10.0
```
## 使用
```go
package gfbean

import (
	"fmt"
	"testing"

	"github.com/gogf/gf/frame/g"
	"go.uber.org/dig"
)

// --------------------------------测试1--------------------------------
type Version struct {
	Id   string
	Name string
}

func (p *Version) getId() string {
	return p.Id
}

func newPerson() Version {
	return Version{
		Id:   "1.0.6",
		Name: "gf-extend",
	}
}

// 测试注入依赖
func TestDig(t *testing.T) {

	// 创建容器
	container := dig.New()
	// 注入依赖
	err := container.Provide(newPerson)

	if err != nil {
		fmt.Println(err)
	}

	// 使用依赖
	err = container.Invoke(func(p Version) {
		// 业务逻辑
		fmt.Println(p.getId())
	})

	if err != nil {
		fmt.Println(err)
	}
}

// --------------------------------测试2--------------------------------
// 参数对象
type needPerson1 struct {
	dig.In         // 打包依赖
	P      Version `name:"v"` // 命名依赖
}

// 注入命名依赖
func TestDigName(t *testing.T) {

	// 创建容器
	container := dig.New()
	// 注入命名依赖
	err := container.Provide(newPerson, dig.Name("v"))

	if err != nil {
		fmt.Println(err)
	}

	// 使用依赖
	err = container.Invoke(func(n needPerson1) {
		// 业务逻辑
		g.Dump(n)
	})

	if err != nil {
		fmt.Println(err)
	}

}

// --------------------------------测试4--------------------------------
// 参数对象
type needPerson2 struct {
	dig.In           // 打包依赖
	P      []Version `group:"v"` // 组依赖，必须是个切片
}

// 注入组依赖
func TestDigGroup(t *testing.T) {

	// 创建容器
	container := dig.New()
	// 注入命名依赖
	err := container.Provide(newPerson, dig.Group("v"))

	if err != nil {
		fmt.Println(err)
	}

	// 使用依赖
	err = container.Invoke(func(n needPerson2) {
		// 业务逻辑
		g.Dump(n)
	})

	if err != nil {
		fmt.Println(err)
	}

}

// --------------------------------测试5--------------------------------
// 结果对象
type outVersion struct {
	dig.Out
	Version Version `group:"version"`
}

// 参数对象
type inVersion struct {
	dig.In
	Versions []Version `group:"version"`
}

func newOut() outVersion {
	return outVersion{
		Version: Version{
			Id:   "2021",
			Name: "1.0.7",
		},
	}
}

// 构造容器Bean
func buildBeanContainer() *dig.Container {
	container := dig.New()
	err := container.Provide(newOut)
	if err != nil {
		fmt.Println(err)
	}
	return container
}

// 测试结果对象注入
func TestDigOut(t *testing.T) {

	container := buildBeanContainer()

	err := container.Invoke(func(in inVersion) {
		g.Dump(in)
	})

	if err != nil {
		fmt.Println(err)
	}
}

```