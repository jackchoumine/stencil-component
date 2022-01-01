import { Component, h } from '@stencil/core'

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  renderChildren(name: string) {
    return <span style={{ color: 'red' }}>{name}</span>
  }
  render() {
    return (
      <div>
        <header>
          <app-nav renderChildren={this.renderChildren} />
        </header>

        <main>
          {/* 路由出口 */}
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url='/' component='app-home' exact={true} />
              <stencil-route url='/dashboard/:name' component='app-profile' />
              <stencil-route url='/custom-cube' component='app-custom-cube' />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    )
  }
}
