import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Router from './routes'
import store from './store'
import './styles/index.styl'

function renderApp(Component) {
  render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.querySelector('#root')
  )
}

renderApp(Router)

if (module.hot) {
  module.hot.accept('./routes', () => renderApp(Router))
}
