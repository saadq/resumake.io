import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { App } from './app/components/App'
import { createStore } from 'app/store'

const store = createStore()

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
