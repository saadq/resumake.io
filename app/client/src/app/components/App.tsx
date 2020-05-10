import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ErrorPage404 } from './ErrorPage404'
import { createStore } from '../store'
import { Home } from '../../home/components/Home'
import { Generator } from '../../generator/components/Generator'

const store = createStore()

export function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/generator" component={Generator} />
          <Route path="*" component={ErrorPage404} />
        </Switch>
      </Router>
    </Provider>
  )
}
