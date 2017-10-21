/**
 * @flow
 */

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { injectGlobal } from 'styled-components'
import { Home, Generator, About } from './pages'

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    font-family: Lato;
    font-size: 0.95em;
    background: black;
    color: #ababab;
  }
`

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/generator" component={Generator} />
        <Route path="/about" component={About} />
        <Route path="*" render={() => <h1>ono 404</h1>} />
      </Switch>
    </Router>
  )
}

export default App
