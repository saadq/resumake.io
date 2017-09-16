/**
 * @flow
 */

import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Generator from '../pages/Generator'

function Router() {
  return (
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/generator" component={Generator} />
          <Route path="*" render={() => <h1>ono 404</h1>} />
        </Switch>
      </App>
    </BrowserRouter>
  )
}

export default Router
