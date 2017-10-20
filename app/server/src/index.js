/**
 * @flow
 */

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import router from './routes'
import { errorHandler } from './middleware'
import { join } from 'path'

const app = new Koa()

if (app.env === 'development') {
  app.proxy = true
}

app.use(errorHandler())
app.use(serve(join(__dirname, '..', '..', 'client', 'dist')))
app.use(bodyParser())
app.use(router)

app.listen(3001)

export default app
