/**
 * @flow
 */

import combineRouters from 'koa-combine-routers'
import api from './api'
import root from './root'

const routers = [api]

if (process.env.NODE_ENV === 'production') {
  routers.push(root)
}

const router = combineRouters(routers)

export default router
