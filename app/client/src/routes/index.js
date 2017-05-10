import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import RouteWithSubRoutes from './RouteWithSubRoutes'
import routeConfig from './config'

function Router() {
  return (
    <BrowserRouter>
      <div>
        {routeConfig.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      </div>
    </BrowserRouter>
  )
}

export default Router
