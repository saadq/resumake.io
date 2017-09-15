/**
 * @flow
 */

import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Generator from '../pages/Generator'

function Router() {
  return (
    <BrowserRouter>
      <App>
        <Route exact path="/" component={Home} />
        <Route path="/generator" component={Generator} />
      </App>
    </BrowserRouter>
  )
}

export default Router
