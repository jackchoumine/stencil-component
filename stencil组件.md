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

![stencil组件生命周期](https://tva1.sinaimg.cn/large/008i3skNgy1gxyq0ishibj30u0147418.jpg)

> 第一次挂载

```bash
connectedCallback
⬇️
componentWillLoad
⬇️
componentWillRender
⬇️
render
⬇️
componentDidRender
⬇️
componentDidLoad
⬇️
disconnectedCallback # 组件被移除
```

prop 或者 state 更新：

```bash
@Watch
⬇️
componentShouldUpdate
⬇️
componentWillUpdate
⬇️
componentWillRender
⬇️
render
⬇️
componentDidRender
⬇️
componentDidUpdate
⬇️
disconnectedCallback # 组件被移除
```

常用的：

`connectedCallback`会调用多次：首次和移除后在添加到 DOM 都会调用，可设置定时器、监听原生事件等。

```js
const el = document.createElement('my-cmp')
document.body.appendChild(el)
// connectedCallback() called
// componentWillLoad() called (first time)

el.remove()
// disconnectedCallback()

document.body.appendChild(el)
// connectedCallback() called again, but `componentWillLoad()` is not.
```

`disconnectedCallback` 组件从 DOM 中移除时调用，可在此做一些收尾工作。

`componentWillLoad` 在 render 之前调用，`调用一次`。
可再次发送 ajax 请求获取数据。

`componentShouldUpdate(newValue,oldValue,property)`

返回布尔值，决定组件是否重新渲染。

可以更新状态的钩子有：

```bash
componentWillLoad
@Watch
componentWillUpdate
componentWillRender
```

`componentDidLoad(), componentDidUpdate() and componentDidRender()`更新状态，会导致再次渲染。

`componentDidUpdate()、componentDidRender()` 可能导致无限渲染。

父子组件的生命周期：

```html
<cmp-a>
  <cmp-b>
    <cmp-c></cmp-c>
  </cmp-b>
</cmp-a>
```

```bash
cmp-a - componentWillLoad()
cmp-b - componentWillLoad()
cmp-c - componentWillLoad()

cmp-c - componentDidLoad()
cmp-b - componentDidLoad()
cmp-a - componentDidLoad()
```

[Component Lifecycle Methods](https://stenciljs.com/docs/component-lifecycle)

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

tag 属性必需，[更多参数](https://stenciljs.com/docs/component)

- `@Prop`声明组件的属性

> 如何处理原生属性？

添加到**自定义标签**上。

> 如何传递对象、数组等复杂数据？

在 stencil 组件中，和 jsx 一样。

在 html 中，

<!-- TODO -->

- `@Event`声明组件触发的事件，后面是事件名称

`this.eventName.emit(data)` 触发自定义事件，data 是发送到父组件的数据，监听 eventName 事件时通过 `event.detail` 获取到 `data`。

> 在自定义标签上仍然能监听到原生事件，如何避免监听到原生事件呢？

阻止事件冒泡，必要时取消默认行为。

> 如何监听？

- `@Listen(eventName)`监听事件，绑定到组件上，可通过第二个参数配置绑定的元素。
  `@Listen`监听全局事件很有用。

- 在 jsx 中，通过`onXxx`监听

- html 中通过`addEventListener`

[更多事件信息](https://stenciljs.com/docs/events#listen-decorator)

### 组件如何响应数据变化

当 props 和 state 改变，stencil 重新渲染，比较变化时，比较的时引用，所以数组和对象，引用不变，不会更新。

[Reactive Data](https://stenciljs.com/docs/reactive-data)

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

### 如何暴露组件内部的方法供外部使用？

通过`@Method`暴露方法，`ref`获取组件实例，调用组件方法。

```tsx
  @Method() // @Method 装饰器要求方法返回Promise
  async getValue() {
    return this.value
  }
```

在父组件通过`ref`调用组件方法

```tsx
@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
  shadow: true,
})
export class AppHome {
  person: Person = { name: 'John', age: 23 }
  appInput!: HTMLAppInputElement
  componentWillLoad() {
    console.log('Component is about to be rendered', this.appInput)
  }
  componentDidLoad() {
    console.log(this.appInput) // 组件实例
    this.appInput.getValue().then(console.log)
    console.log(this.appInput.person) // 拿到自定义属性
    console.log(this.appInput.title) // 拿到原生属性
    // console.log(this.appInput?.onInput)// 拿不到没有暴露的方法
  }
  render() {
    return <app-input ref={refInput => (this.appInput = refInput)} person={this.person} title='input' />
  }
}
```

通过函数的方式绑定 ref 到组件上，组件挂载后，ref 是组件实例。

### `@Element` 装饰器

在组件内部获取自组件实例。

和在组件外部通过`ref`获取组件实例，值是同一个。

## Host 组件

Host 组件一个内置组件，不会渲染到页面上。

常用的场景：

- 在组件内部设置自定义标签的属性

```tsx
import { Component, Host, h } from '@stencil/core'

@Component({ tag: 'todo-list' })
export class TodoList {
  @Prop() open = false
  render() {
    return (
      <Host
        aria-hidden={this.open ? 'false' : 'true'}
        class={{
          'todo-list': true,
          'is-open': this.open,
        }}
      />
    )
  }
}
```

- 作为`Fragment`
