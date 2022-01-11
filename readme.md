# Stencil App Starter

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool.  Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all. In many cases, Stencil can be used as a drop in replacement for traditional frontend frameworks given the capabilities now available in the browser, though using it as such is certainly not required.

Stencil also enables a number of key capabilities on top of Web Components, in particular Server Side Rendering (SSR) without the need to run a headless browser, pre-rendering, and objects-as-properties (instead of just strings).

## Getting Started

To start a new project using Stencil, clone this repo to a new directory:

```bash
npm init stencil app
```

and run:

```bash
npm start
```

To build the app for production, run:

```bash
npm run build
```

To run the unit tests once, run:

```
npm test
```

To run the unit tests and watch for file changes during development, run:

```
npm run test.watch
```
## vue2 如何引入 stencil web component

两种方式：

1. 通过 unpkg cnd 引入

index.html

```html
<script type="module" async src="https://unpkg.com/stencil-rating-component-test"></script>
```

2. 安装 npm

```bash
npm i stencil-rating-component-test
```

在 main.js

```js
import { defineCustomElements } from 'stencil-rating-component-test/loader'
defineCustomElements()
```

从 jsdelivr 引入不行：

```html
<!-- NOTE 不行 package 需要设置 jsdelivr browser main 没设置好 -->
<script type="module" src="https://cdn.jsdelivr.net/npm/stencil-rating-component-test@1.0.1/dist/esm/index.js"></script>
```
