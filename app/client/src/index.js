/**
 * @flow
 */

import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './app/App'
import store from './app/store'

render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.querySelector('#app')
)
