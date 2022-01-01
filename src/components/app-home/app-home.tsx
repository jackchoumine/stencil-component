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
      <Host>
        <app-input
          title='input'
          value={this.input}
          onInput={e => this.onInput(e)}
          onInputChanged={this.onChange}
          onChange={this.onNativeChange}
        >
          {/* 不指定名字，无法处理 */}
          {/* <h1>header one</h1> */}
          <h2 slot='prepend'> append slot</h2>
          {/* <div slot='append'> */}
          <span slot='append'>append</span>
          <span slot='append'>append one</span>
          <span slot='append'>append another</span>
          {/* </div> */}
        </app-input>
        <div class='app-home'>
          <stencil-route-link url='/dashboard/stencil'>
            <button>Profile page</button>
          </stencil-route-link>
        </div>
      </Host>
    )
  }
}
