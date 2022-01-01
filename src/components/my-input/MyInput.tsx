/*
 * @Description :
 * @Date        : 2022-01-01 23:19:17 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-01-02 07:44:12 +0800
 * @LastEditors : JackChou
 */
import { Component, Prop, h, Element, EventEmitter, Event, Host, Method } from '@stencil/core'

export type Person = {
  name: string
  age: number
}
@Component({
  tag: 'app-input',
  styleUrl: 'index.scss',
  shadow: true,
})
export class MyInput {
  @Element() el: HTMLElement
  @Prop({ attribute: 'person' }) person: Person = null
  @Prop({ mutable: true, reflect: true }) value: string | number = ''
  @Event({ eventName: 'myInput' }) input: EventEmitter
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

  @Method()
  async getValue() {
    return this.value
  }
  componentWillLoad() {
    this.value = 'change'
  }
  componentDidLoad() {
    console.log('this.el')
    // console.log(this.el)
    // console.log(this.el.shadowRoot.querySelector('div'))
  }
  changeValue() {
    this.value = 'change eeeee'
  }
  render() {
    return (
      <Host>
        <div id='divContainer'>
          name:{this.person.name},age:{this.person.age}
        </div>
        <h2>h2 app-input</h2>
        <slot name='prepend'></slot>
        <input value={this.value} onInput={e => this.onInput(e)} onChange={e => this.onChange(e)} />
        <slot name='append'>hello</slot>
        <button onClick={() => this.changeValue()}>change value</button>
      </Host>
    )
  }
}
