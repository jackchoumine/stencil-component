/*
 * @Description : 
 * @Date        : 2021-12-30 21:58:15 +0800
 * @Author      : JackChou
 * @LastEditTime: 2021-12-30 22:01:35 +0800
 * @LastEditors : JackChou
 */
import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-custom-cube',
  styleUrl: '',
  shadow: true,
})
export class AppNav {
  render() {
    return (
      <nav class="app-nav">
       <p>custom cube</p>
      </nav>
    );
  }
}