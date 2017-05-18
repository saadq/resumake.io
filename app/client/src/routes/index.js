import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import RouteWithSubRoutes from './RouteWithSubRoutes'
import routeConfig from './config'

function Router() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <div>
          {routeConfig.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </div>
      </ScrollToTop>
    </BrowserRouter>
  )
}

export default Router
