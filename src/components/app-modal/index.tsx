/*
 * @Description :
 * @Date        : 2022-01-02 22:08:02 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-01-02 22:26:15 +0800
 * @LastEditors : JackChou
 */

import { Component, Prop, h, Event, EventEmitter } from '@stencil/core'
@Component({
  tag: 'app-modal',
  styleUrl: 'index.css',
  shadow: true,
})
export class AppModal {
  @Prop() title: string = ''
  @Prop({ mutable: true, reflect: true }) visible: boolean = false
  @Event() onCancel: EventEmitter
  @Event() onOk: EventEmitter
  componentDidLoad() {
    console.log(this.visible)
  }
  render() {
    return (
      <div class={this.visible ? 'wrapper visible' : 'wrapper'}>
        <div class='modal'>
          <span class='title'>{this.title}</span>
          <div class='content'>
            <slot />
          </div>
          <div class='button-container'>
            <button class='cancel' onClick={this.onCancelHandler}>
              Cancel
            </button>
            <button class='ok' onClick={this.onOkHandler}>
              Okay
            </button>
          </div>
        </div>
      </div>
    )
  }
  onCancelHandler = () => {
    this.visible = false
    this.onCancel.emit()
  }
  onOkHandler = () => {
    this.visible = false
    this.onOk.emit()
  }
}

// https://www.carlrippon.com/creating-modal-dialog-web-component-stenciljs/
// 弹窗组件
