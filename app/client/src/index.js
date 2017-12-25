/**
 * @flow
 */

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import App from './app/App'
import store from './app/store'

function renderApp(Component) {
  render(
    <AppContainer>
      <Router>
        <Provider store={store}>
          <Component />
        </Provider>
      </Router>
    </AppContainer>,
    document.querySelector('#app')
  )
}

renderApp(App)

if (module.hot) {
  module.hot.accept('./app/App', () => {
    const newRouter = require('./app/App').default
    renderApp(newRouter)
  })
}
