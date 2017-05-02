import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import RouteWithSubRoutes from './RouteWithSubRoutes'
import routeConfig from './config'

const Router = () => (
  <BrowserRouter>
    <div>
      {routeConfig.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </div>
  </BrowserRouter>
)

export default Router
