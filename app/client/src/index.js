/**
 * @flow
 */

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import Router from './shared/routes'
import store from './shared/store'

function renderApp(Component) {
  render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.querySelector('#app')
  )
}

renderApp(Router)

if (module.hot) {
  module.hot.accept('./shared/routes', () => {
    const newRouter = require('./shared/routes').default
    renderApp(newRouter)
  })
}
