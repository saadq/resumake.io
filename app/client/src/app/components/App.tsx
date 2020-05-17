import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from 'home/Home'
import { Generator } from 'generator/Generator'
import { About } from 'about/About'
import { GlobalStyle } from './GlobalStyle'
import { ErrorPage404 } from './ErrorPage404'
import { createStore } from '../store'

const store = createStore()

if (process.env.NODE_ENV === 'development') {
  module.hot?.accept('../rootReducer', () => {
    const newRootReducer = require('../rootReducer').default
    store.replaceReducer(newRootReducer)
  })
}

export function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/generator" component={Generator} />
          <Route path="/about" component={About} />
          <Route path="*" component={ErrorPage404} />
        </Switch>
      </Router>
    </Provider>
  )
}
