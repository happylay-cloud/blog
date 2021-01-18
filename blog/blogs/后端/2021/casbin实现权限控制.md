---
# 文章标题
title: casbin实现权限控制
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2021-01-18 21:19:12
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

摘要: casbin实现权限控制
时间: 2021-01-18

---

<img src="/img/16.jpg" width="256px" height="144px">

<!-- more -->
## [安装](https://casbin.org/docs/zh-CN/get-started)
```sh
go get github.com/casbin/casbin/v2
或
require github.com/casbin/casbin/v2 v2.20.1
```
## 配置文件解读
### `rabc_model.conf`
```ini
# 请求定义
# sub 想要访问资源的用户
# obj 要访问的资源
# act 用户对资源执行的操作，act可以是read、write、print等等你想要自定义的操作
[request_definition]
r = sub, obj, act

# 策略定义，也就是*.cvs文件，p定义的格式
[policy_definition]
p = sub, obj, act

# 组定义，也就是*.cvs文件，g定义的格式。g是用户组或角色
# g表示不同的RBAC体系，_, _表示用户、角色，_, _, _表示用户、角色、域
[role_definition]
g = _, _

# 定义多个策略的结果，allow/deny
# 任意一条策略满足，则最终结果为allow
[policy_effect]
e = some(where (p.eft == allow))

# 定义请求和策略匹配的方式
# p.eft是allow还是deny，基于此来决定
[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act

```
### `rbac_policy.csv`
```ini
# 策略
p, 张三, A数据, read
p, 李四, B数据, write
p, 超级管理员, B数据, read
p, 超级管理员, B数据, write

# 组
g, 张三, 超级管理员
```
## 使用
```go
package gfcasbin

import (
	"fmt"
	"testing"

	"github.com/casbin/casbin/v2"
	"github.com/casbin/casbin/v2/model"
	fileadapter "github.com/casbin/casbin/v2/persist/file-adapter"
	"github.com/gogf/gf/frame/g"
)

// TestCasbin 权限测试
//  文档：
//  https://casbin.org/docs/zh-CN/get-started
//  适配器：
//  https://casbin.org/docs/zh-CN/adapters
//  示例：
//  https://github.com/casbin/casbin/tree/master/examples
func TestCasbin(t *testing.T) {

	rbacModelText :=
		`
[request_definition]
r = sub, obj, act

[policy_definition]
p = sub, obj, act

[role_definition]
g = _, _

[policy_effect]
e = some(where (p.eft == allow))

[matchers]
m = g(r.sub, p.sub) && r.obj == p.obj && r.act == p.act
`
	// enforcer, _ := casbin.NewEnforcer("./config/rbac_model.conf", "./config/rbac_policy.csv")

	// 从字符串中加载模型
	modelFromString, err := model.NewModelFromString(rbacModelText)

	if err != nil {
		fmt.Println(err)
	}
	g.Dump(modelFromString)

	// 从文件中创建一个适配器
	newAdapter := fileadapter.NewAdapter("./config/rbac_policy.csv")

	enforcer, _ := casbin.NewEnforcer(modelFromString, newAdapter)

	// 添加策略
	if ok, _ := enforcer.AddPolicy("admin", "/api/v1/hello", "GET"); !ok {
		fmt.Println("策略已经存在")
	} else {
		fmt.Println("增加成功")
	}

	// 删除策略
	if ok, _ := enforcer.RemovePolicy("admin", "/api/v1/hello", "GET"); !ok {
		fmt.Println("策略不存在")
	} else {
		fmt.Println("删除成功")
	}

	// 获取策略
	list := enforcer.GetPolicy()
	for _, vList := range list {
		fmt.Print("策略：")
		for _, v := range vList {
			fmt.Printf("%s, ", v)
		}
		fmt.Print("\n")
	}

	// 检查权限
	if ok, _ := enforcer.Enforce("李四", "B数据", "write"); ok {
		fmt.Println("权限正常")
	} else {
		fmt.Println("没有权限")
	}

	g.Dump(enforcer.GetAllSubjects())
	g.Dump(enforcer.GetAllRoles())
	g.Dump(enforcer.GetAllObjects())
	g.Dump(enforcer.GetAllActions())

}
```