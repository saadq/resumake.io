/**
 * @flow
 */

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import App from './App'
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

renderApp(App)

if (module.hot) {
  module.hot.accept('./App', () => {
    const newApp = require('./App').default
    renderApp(newApp)
  })
}
