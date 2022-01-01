/*
 * @Description : 导航栏
 * @Date        : 2021-12-30 21:48:01 +0800
 * @Author      : JackChou
 * @LastEditTime: 2022-01-02 04:17:15 +0800
 * @LastEditors : JackChou
 */
import { Component, h, State, Prop, VNode } from '@stencil/core'
type Path = { path: string; name: string }
export type RenderChildren = (name: string) => VNode
@Component({
  tag: 'app-nav',
  styleUrl: './index.scss',
  shadow: true,
})
export class AppNav {
  @Prop() renderChildren: RenderChildren = undefined
  @State() currentPath: string = window.location.pathname
  // @Prop() path: string = this.currentPath
  setClass(path) {
    return path === window.location.pathname ? 'is-active' : ''
  }

  pathList: Path[] = [
    { path: '/', name: '主页' },
    { path: '/dashboard/stencil', name: 'dashboard' },
    { path: '/custom-cube', name: 'custom-cube' },
  ]

  render() {
    return (
      <nav class='app-nav'>
        {this.renderChildren('render-children')}
        <ul>
          {this.pathList.map(item => (
            <li>
              <stencil-route-link url={item.path} activeClass={this.setClass(item.path)}>
                {item.name}
              </stencil-route-link>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
}
