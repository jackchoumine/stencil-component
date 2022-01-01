# stencil 组件

stencil 提供一些装饰器、生命周期钩子和渲染函数去编写一个组件。

## 装饰器

装饰器是一组用于声明组件元数据的函数，会在构建产物中移除，所以不会有运行时开销。

- @Component() 声明一个类是组件
- @Prop() 声明一个组件的特性或者属性
- @State() 声明组件内部状态
- @Watch() 监听 prop 或者 state 的改变，然后执行副作用
- @Listen() 监听组件内部的 DOM 事件
- @Event() 声明自定义事件
- @Method() 暴露组件方法
- @Element() 声明组件变化的自定义标签

### 生命周期

### 应用加载事件

一个特殊的生命周期钩子，在**整个应用加载完成**后触发。

```js
window.addEventListener('appload', event => {
  console.log(event.detail.namespace)
})
```

## 组件定义

```tsx
import { Component, Prop, h, EventEmitter, Event } from '@stencil/core'

// 组件装饰器
@Component({
  tag: 'app-input', // 名字全局唯一
  styleUrl: 'index.scss', // 组件的样式
  shadow: true, // 开启 shadow root 封装组件样式
})
export class MyInput {
  @Prop() value: string | number = ''
  @Event({ eventName: 'input' }) input: EventEmitter
  // 直接使用属性名称作为事件名称
  @Event() inputChanged: EventEmitter

  onInput(e: Event) {
    //TODO 如何覆盖原生的 input 事件？ 阻止事件冒泡
    // e.preventDefault() // 默认行为不行
    e.stopPropagation()
    const inputEle = e.target as HTMLInputElement
    this.input.emit(inputEle.value)
  }

  onChange(e: Event) {
    const inputEle = e.target as HTMLInputElement
    this.inputChanged.emit(inputEle.value)
  }

  render() {
    return <input value={this.value} onInput={e => this.onInput(e)} onChange={e => this.onChange(e)} />
  }
}
```

解读：

- `@Component`装饰器声明该类是一个组件，传递一些元数据，比如组件的标签，标签必须`全局唯一，且含有-`，样式，是否开启 shadow 等。

- `@Prop`声明组件的属性

> 如何处理原生属性？

添加到自定义标签上。

- `@Event`声明组件触发的事件，后面是事件名称

`this.eventName.emit(data)` 触发自定义事件，data 是发送到父组件的数据，监听 eventName 事件时通过 `event.detail` 获取到 `data`。

> 在自定义标签上仍然能监听到原生事件，如何避免监听到原生事件呢？

阻止事件冒泡，必要时取消默认行为。

### 如何传递 slot

```tsx
<Host>
  <slot name='prepend'></slot>
  <input value={this.value} onInput={e => this.onInput(e)} onChange={e => this.onChange(e)} />
  <slot name='append'>hello</slot>
</Host>
```

从父组件传递：

```tsx
<app-input>
  {/* 不指定slot名字，无法处理 */}
  {/* <h1>header one</h1> */}
  <h2 slot='prepend'> append slot</h2>
  {/* <div slot='append'> */}
  <span slot='append'>append</span>
  <span slot='append'>append one</span>
  <span slot='append'>append another</span>
  {/* </div> */}
</app-input>
```

> 如何通过 slot 传递数据到父组件？

<!-- TODO -->

## 组件使用

通过自定义标签 `app-input` 在 stencil 组件中使用：

```tsx
import { Component, h, Host, State, Watch } from '@stencil/core'

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  @State() input = 'hello world'

  onInput(e: CustomEvent<HTMLAppInputElement>) {
    this.input = e.detail as unknown as string
  }
  // NOTE 监听原生事件
  // 被组件内阻止事件冒泡后，监听不到
  onNativeChange(e: Event) {
    const inputEle = e.target as HTMLInputElement
    console.log('原生事件', inputEle.value)
  }

  onChange(e: CustomEvent<HTMLAppInputElement>) {
    console.log(e.detail)
  }

  @Watch('input')
  inputChanged(newValue: string, oldValue: string) {
    console.log(newValue, oldValue)
  }
  render() {
    return (
      <app-input
        value={this.input}
        onInput={e => this.onInput(e)}
        onInputChanged={this.onChange}
        onChange={this.onNativeChange}
      />
    )
  }
}
```
