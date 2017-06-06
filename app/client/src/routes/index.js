import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { App } from '../components'
import ScrollToTop from './ScrollToTop'
import RouteWithSubRoutes from './RouteWithSubRoutes'
import routeConfig from './config'

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <App>
          {routeConfig.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </App>
      </ScrollToTop>
    </BrowserRouter>
  )
}

export default Router
