import { Component, h, Host, State, Watch, Listen } from '@stencil/core'
import { Hello } from '../fun-component/Hello'
import { Person } from '../my-input/MyInput'

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

  @Watch('input')
  inputChanged(newValue: string, oldValue: string) {
    console.log(newValue, oldValue)
  }
  person: Person = { name: 'John', age: 23 }

  appInput!: HTMLAppInputElement
  componentWillLoad() {
    console.log('Component is about to be rendered')
  }
  componentDidLoad() {
    console.log(this.appInput)
    this.appInput.getValue().then(console.log)
    // console.log(this.appInput.person) // 拿到自定义属性
    // console.log(this.appInput.title) // 拿到原生属性
    // console.log(this.appInput?.onInput)// 拿不到没有暴露的方法
  }
  @Listen('change')
  onChange(e: CustomEvent<HTMLAppInputElement>) {
    console.log('监听组件自定义事件 onChange')
    console.log(e.detail)
  }
  @Listen('click')
  onClick(e: CustomEvent<HTMLAppInputElement>) {
    console.log('监听组件自定义事件')
    // console.log(e.target)
    // console.log(e.currentTarget)
    console.log(e.detail)
  }
  render() {
    return (
      <Host>
        <app-input
          ref={refInput => (this.appInput = refInput)}
          person={this.person}
          title='input'
          value={this.input}
          onInput={e => this.onInput(e)}
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
        <button>button</button>
        <h2>h2 app-home</h2>
        <Hello name='stencil' />
        <div class='app-home'>
          <stencil-route-link url='/dashboard/stencil'>
            <button>Profile page</button>
          </stencil-route-link>
        </div>
      </Host>
    )
  }
}
