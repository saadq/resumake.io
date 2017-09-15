/**
 * @flow
 */

import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Generator from '../pages/Generator'

function Router() {
  return (
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/generator"
          render={() => <Redirect to="/generator/templates" />}
        />
        <Route exact path="/generator/templates" component={Generator} />
      </App>
    </BrowserRouter>
  )
}

export default Router
