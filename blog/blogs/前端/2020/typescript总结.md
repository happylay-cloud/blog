---
# 文章标题
title: typescript 总结
# 文章创建日期，格式 2020-12-18 或 2020-12-18 08:00:00。
date: 2020-12-31
# 所属标签（可以设置多个🏷）
tags:
  - 代码片段
  - typescript
# 所属分类（可以设置多个💖）
categories:
  - 前端
# 是否开启侧边栏
sidebar: "auto"
# 文章置顶（数字代表排序权重📚）
sticky: 0
# 文章是否发布 true（发布）false(草稿)
publish: true
---

---

摘要: typescript 总结
时间: 2020-12-31

---

<img src="/img/17.jpg" width="256px" height="144px">

<!-- more -->
## 接口
`IPerson.ts`

```typescript
interface IPerson {
  readonly id: number
  name: string
  age: number
  sex?: string
}

const person: IPerson = {
  id: 1,
  name: '嬴政',
  age: 18,
  // sex: '男' // 可以没有
}

console.log('%c 🍱 person: ', 'font-size:12px;background-color: #E41A6A;color:#fff;', person);

interface SearchFunc {
  (source: string, subString: string): number
}

const search: SearchFunc = (source, subString) => {
  return source.search(subString) == -1 ? -1 : source.search(subString) + 1
}

console.log(search('abcd', 'd'))

interface Light {
  lightOn(): void
  lightOff(): void
}

class Home implements Light {
  lightOn(): void {
    console.log('%c 🍎  开灯: ', 'font-size:12px;background-color: #2EAFB0;color:#fff;', '开灯');
  }
  lightOff(): void {
    console.log('%c 🥘  关灯: ', 'font-size:12px;background-color: #FFDD4D;color:#fff;', '关灯');
  }
}

const l1: Light = new Home()
l1.lightOn()
l1.lightOff()
```
## 元组

`Tuple.ts`

```typescript
let t1: [string, number, boolean]

t1 = ['hi', 2020, true]

t1.push('ts')

console.log('%c 🌭 t1: ', 'font-size:12px;background-color: #B03734;color:#fff;', t1);
```
## 回调函数

`CallbackFun.ts`

```typescript
class CallbackFun {

  /**
   * 结构体
   */
  constructor() {
    console.log('%c 🍵 初始化函数: ', 'font-size:12px;background-color: #FCA650;color:#fff;', '初始化函数');
    CallbackFun.callbackTest(2020, this, this.getCallResult.bind(this))
  }

  /**
   * 
   * @param arg 参数
   * @param clazz 调用域
   * @param callback  回调函数
   */
  public static callbackTest(arg: number, clazz: any, callback: Function): void {

    let result: number = ++arg;

    // 回调函数
    callback.call(clazz, result, '额外回调参数');

  }

  /**
   * 回调接受函数
   * @param res 结果
   */
  private getCallResult(res: any, res1: any): void {
    console.log('%c 🥓  回调结果:, res: ', 'font-size:12px;background-color: #FCA650;color:#fff;', "回调结果:", res);
    console.log('%c 🍷 res1: ', 'font-size:12px;background-color: #EA7E5C;color:#fff;', res1);
  }

}

// 调用回调函数
const f1 = new CallbackFun()
```