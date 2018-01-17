/**
 * @flow
 */

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Loadable from 'react-loadable'
import { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'
import { ScrollToTop, Loader } from '../common/components'
import { colors } from '../common/theme'
import Nexa from './assets/nexa.otf'

injectGlobal`
  * {
    box-sizing: border-box;
  }

  html, body, #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 0.95em;
    background: ${colors.background};
    color: ${colors.foreground};
  }

  ::selection {
    background: ${colors.primary};
    color: white;
  }

  ::-moz-selection {
    background: ${colors.primary};
    color: white;
  }

  .grabbing {
    cursor: move; /* fallback */
    cursor: grabbing;
  }

  @font-face {
    font-family: Nexa;
    src: url('${Nexa}') format('opentype');
  }
`

const LoadableHome = Loadable({
  loader: () => import('./pages/Home'),
  loading: Loader
})

const LoadableGenerator = Loadable({
  loader: () => import('./pages/Generator'),
  loading: Loader
})

const LoadableAbout = Loadable({
  loader: () => import('./pages/About'),
  loading: Loader
})

function App() {
  return (
    <ScrollToTop>
      <Switch>
        <Route exact path="/" component={LoadableHome} />
        <Route path="/generator" component={LoadableGenerator} />
        <Route path="/about" component={LoadableAbout} />
        <Route path="*" render={() => <h1>ono 404</h1>} />
      </Switch>
    </ScrollToTop>
  )
}

export default hot(module)(App)
