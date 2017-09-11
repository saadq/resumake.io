import React from 'react'
import { Provider } from 'react-redux'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'
import store from './store'

function renderApp() {
  render(
    <AppContainer>
      <Provider store={store}>
        <App />
      </Provider>
    </AppContainer>,
    document.querySelector('#root')
  )
}

renderApp()

if (module.hot) {
  module.hot.accept('./components/App', () => renderApp())
}
