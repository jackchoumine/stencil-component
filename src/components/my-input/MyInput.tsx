/*
 * @Description :
 * @Date        : 2022-01-01 23:19:17 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-01-02 00:20:37 +0800
 * @LastEditors : JackChou
 */
import { Component, Prop, h, EventEmitter, Event } from '@stencil/core'

@Component({
  tag: 'app-input',
  styleUrl: 'index.scss',
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
