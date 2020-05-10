import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from '../../home/components/Home'
import { Generator } from '../../generator/components/Generator'
import { ErrorPage404 } from './ErrorPage404'

export function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/generator" component={Generator} />
        <Route path="*" component={ErrorPage404} />
      </Switch>
    </Router>
  )
}
