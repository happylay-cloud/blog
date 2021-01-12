---
# 文章标题
title: goframe框架总结
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2021-01-08 18:27:49
# 所属标签（可以设置多个🏷）
tags:
  - 代码片段
  - golang
  - idea
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

摘要: goframe框架总结
时间: 2021-01-08

---

<img src="/img/5.jpg" width="256px" height="144px">

<!-- more -->

## 编辑器推荐

> 1.开发工具推荐使用idea，不要问为什么，java。原先一直使用vscode，开发效率太低，代码提示不友好。

> 2.安装插件go、File Watchers。

### 安装go语法检查插件
> 通过vscode间接安装（File Watchers插件需要）

<img src="/分类/后端/goframe/vscode安装go插件1.png" style="border-radius:10px;margin:10px;box-shadow: 0px 0px 10px #aaa;" class="medium-zoom"/>

<img src="/分类/后端/goframe/vscode安装go插件2.png" style="border-radius:10px;margin:10px;box-shadow: 0px 0px 10px #aaa;" class="medium-zoom"/>

### 配置File Watchers插件
<img src="/分类/后端/goframe/配置FileWatchers插件.png" style="border-radius:10px;margin:10px;box-shadow: 0px 0px 10px #aaa;" class="medium-zoom"/>

导入`watchers.xml`配置
```xml
<TaskOptions>
  <TaskOptions>
    <option name="arguments" value="fmt $FilePath$" />
    <option name="checkSyntaxErrors" value="true" />
    <option name="description" />
    <option name="exitCodeBehavior" value="ERROR" />
    <option name="fileExtension" value="go" />
    <option name="immediateSync" value="false" />
    <option name="name" value="go fmt" />
    <option name="output" value="$FilePath$" />
    <option name="outputFilters">
      <array />
    </option>
    <option name="outputFromStdout" value="false" />
    <option name="program" value="$GoExecPath$" />
    <option name="runOnExternalChanges" value="false" />
    <option name="scopeName" value="Project Files" />
    <option name="trackOnlyRoot" value="true" />
    <option name="workingDir" value="$ProjectFileDir$" />
    <envs>
      <env name="GOROOT" value="$GOROOT$" />
      <env name="GOPATH" value="$GOPATH$" />
      <env name="PATH" value="$GoBinDirs$" />
    </envs>
  </TaskOptions>
  <TaskOptions>
    <option name="arguments" value="-w $FilePath$" />
    <option name="checkSyntaxErrors" value="true" />
    <option name="description" />
    <option name="exitCodeBehavior" value="ERROR" />
    <option name="fileExtension" value="go" />
    <option name="immediateSync" value="false" />
    <option name="name" value="goimports" />
    <option name="output" value="$FilePath$" />
    <option name="outputFilters">
      <array />
    </option>
    <option name="outputFromStdout" value="false" />
    <option name="program" value="goimports" />
    <option name="runOnExternalChanges" value="false" />
    <option name="scopeName" value="Project Files" />
    <option name="trackOnlyRoot" value="true" />
    <option name="workingDir" value="$ProjectFileDir$" />
    <envs>
      <env name="GOROOT" value="$GOROOT$" />
      <env name="GOPATH" value="$GOPATH$" />
      <env name="PATH" value="$GoBinDirs$" />
    </envs>
  </TaskOptions>
  <TaskOptions>
    <option name="arguments" value="run --disable=typecheck $FileDir$" />
    <option name="checkSyntaxErrors" value="true" />
    <option name="description" />
    <option name="exitCodeBehavior" value="ERROR" />
    <option name="fileExtension" value="go" />
    <option name="immediateSync" value="false" />
    <option name="name" value="golangci-lint" />
    <option name="output" value="" />
    <option name="outputFilters">
      <array />
    </option>
    <option name="outputFromStdout" value="false" />
    <option name="program" value="golangci-lint" />
    <option name="runOnExternalChanges" value="false" />
    <option name="scopeName" value="Project Files" />
    <option name="trackOnlyRoot" value="true" />
    <option name="workingDir" value="$ProjectFileDir$" />
    <envs>
      <env name="GOROOT" value="$GOROOT$" />
      <env name="GOPATH" value="$GOPATH$" />
      <env name="PATH" value="$GoBinDirs$" />
    </envs>
  </TaskOptions>
  <TaskOptions>
    <option name="arguments" value="-set_exit_status $FilePath$" />
    <option name="checkSyntaxErrors" value="true" />
    <option name="description" />
    <option name="exitCodeBehavior" value="ERROR" />
    <option name="fileExtension" value="go" />
    <option name="immediateSync" value="false" />
    <option name="name" value="golint" />
    <option name="output" value="$FilePath$" />
    <option name="outputFilters">
      <array />
    </option>
    <option name="outputFromStdout" value="false" />
    <option name="program" value="golint" />
    <option name="runOnExternalChanges" value="false" />
    <option name="scopeName" value="Project Files" />
    <option name="trackOnlyRoot" value="true" />
    <option name="workingDir" value="$ProjectFileDir$" />
    <envs>
      <env name="GOROOT" value="$GOROOT$" />
      <env name="GOPATH" value="$GOPATH$" />
      <env name="PATH" value="$GoBinDirs$" />
    </envs>
  </TaskOptions>
</TaskOptions>
```
## 框架文档

[修改默认配置](https://itician.org/pages/viewpage.action?pageId=1114668#id-配置管理-默认文件修改)

[ORM字段过滤（处理自增主键问题）](https://itician.org/pages/viewpage.action?pageId=1114229)

[ORM结果处理（json格式数据问题）](https://itician.org/pages/viewpage.action?pageId=1114378)

### yaml格式配置文件

**_springboot的味道 🐑_**

 `config.yaml` 

```yaml
# http服务器
server:
  Address: :8082
  ServerRoot: public
  ServerAgent: gf-app
  LogPath: ./log/gf-app/server

# 日志
logger:
  Path: ./log/gf-app
  Level: all
  Stdout: true

# 模板
viewer:
  Path: template
  DefaultFile: index.html
  Delimiters:
    - '${'
    - '}'

# 数据库
database:
  link: sqlite:./db/sqlite3.db
  debug: true
  logger:
    Path: ./log/gf-app/sql
    Level: all
    Stdout: true

```
## 对象封装
```go
// 分配一片内存，返回初始化为零的内存地址
var AskApi = new(askApi)

// Controller层结构体
type askApi struct{}

// 初始化结构体，返回内存地址
var User = &userService{
  
}

// Service层结构体
type userService struct {
}
```