/**
 * @flow
 */

import combineRouters from 'koa-combine-routers'
import api from './api'
import root from './root'

const router = combineRouters(api, root)

export default router
