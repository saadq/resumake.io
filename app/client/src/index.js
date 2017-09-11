/**
 * @flow
 */

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'

function renderApp() {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.querySelector('#root')
  )
}

renderApp()

if (module.hot) {
  module.hot.accept('./App', () => renderApp())
}
