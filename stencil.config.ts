import { Config } from '@stencil/core'

// https://stenciljs.com/docs/config
import { sass } from '@stencil/sass'

export const config: Config = {
  namespace: 'jack',
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  hashFileNames: false,
  buildEs5: false,
  outputTargets: [
    {
      type: 'dist',
    },
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: null,
      baseUrl: 'https://myapp.local/',
    },
  ],
  plugins: [sass()],
}
