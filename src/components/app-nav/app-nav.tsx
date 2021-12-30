/*
 * @Description : 导航栏
 * @Date        : 2021-12-30 21:48:01 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-12-30 22:03:57 +0800
 * @LastEditors : JackChou
 */
import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-nav',
  styleUrl: './index.scss',
  shadow: true,
})
export class AppNav {
  render() {
    return (
      <nav class="app-nav">
        <ul>
         <li><a href="/">主页</a></li>
         <li><a href="/dashboard/hell-dashboard">dashboard</a></li>
         <li><a href="/custom-cube">custom-cube</a></li>
        </ul>
      </nav>
    );
  }
}
