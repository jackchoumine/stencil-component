import { Component, Prop, h } from '@stencil/core'
import { MatchResults } from '@stencil/router'

@Component({
  tag: 'app-profile',
  styleUrl: 'app-profile.css',
  shadow: true,
})
export class AppProfile {
  @Prop() match: MatchResults

  normalize(name: string): string {
    if (name) {
      return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase()
    }
    return ''
  }

  render() {
    console.log(this.match)
    return (
      <div class='app-profile'>
        <p>dashboard {this.match.params.name ?? 'Hello'}</p>
      </div>
    )
  }
}
