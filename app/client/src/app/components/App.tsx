import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import GithubCorner from 'react-github-corner'
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
      <GithubCorner
        href="https://github.com/saadq/resumake.io"
        bannerColor="#181B1F"
        octoColor="#2A2D33"
        size={60}
        direction="left"
        svgStyle={{ zIndex: 9999 }}
      />
    </ThemeProvider>
  )
}
