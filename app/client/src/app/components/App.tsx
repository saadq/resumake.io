import React, { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { GlobalStyle } from './GlobalStyle'
import { ErrorPage404 } from './ErrorPage404'
import { createStore } from '../store'
import { Home } from '../../home/Home'
import { Generator } from '../../generator/Generator'
import { About } from '../../about/About'

const store = createStore()

export function App() {
  return (
    <StrictMode>
      <Provider store={store}>
        <GlobalStyle />
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/generator" component={Generator} />
            <Route exact path="/about" component={About} />
            <Route path="*" component={ErrorPage404} />
          </Switch>
        </Router>
      </Provider>
    </StrictMode>
  )
}
