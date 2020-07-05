import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from 'home/Home'
import { Generator } from 'generator/Generator'
import { About } from 'about/About'
import { GlobalStyle } from './GlobalStyle'
import { ErrorPage404 } from './ErrorPage404'
import { ThemeProvider } from 'styled-components'
import { AppState } from '../types'

export function App() {
  const { theme } = useSelector((state: AppState) => state.settings)
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/generator" component={Generator} />
          <Route path="/about" component={About} />
          <Route path="*" component={ErrorPage404} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}
