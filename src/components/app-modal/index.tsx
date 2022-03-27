/*
 * @Description :
 * @Date        : 2022-01-02 22:08:02 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-03-27 16:48:51 +0800
 * @LastEditors : JackChou
 */

import { Component, Prop, h, Event, EventEmitter } from '@stencil/core'
@Component({
  tag: 'app-modal',
  styleUrl: 'index.css',
  shadow: true,
})
export class AppModal {
  @Prop() modalTitle: string = ''
  @Prop({ mutable: true, reflect: true }) visible: boolean = false
  @Event() cancel: EventEmitter
  @Event() ok: EventEmitter
  componentDidLoad() {
    console.log('this.componentDidLoad')
    console.log(this.visible)
  }
  render() {
    return (
      <div class={this.visible ? 'overlay visible' : 'overlay'}>
        <div class='modal'>
          <span class='title'>{this.modalTitle}</span>
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
    this.cancel.emit()
  }
  onOkHandler = () => {
    this.visible = false
    this.ok.emit()
  }
}

// https://www.carlrippon.com/creating-modal-dialog-web-component-stenciljs/
// 弹窗组件
