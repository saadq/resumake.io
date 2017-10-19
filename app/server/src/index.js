/**
 * @flow
 */

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const router = require('./routes')
const { errorHandler } = require('./middleware')
const { join } = require('path')

const app = new Koa()

if (app.env === 'development') {
  app.proxy = true
}

app.use(errorHandler())
app.use(serve(join(__dirname, '..', '..', 'client', 'dist')))
app.use(bodyParser())
app.use(router)

app.listen(3001)

module.exports = app
