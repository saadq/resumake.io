const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const router = require('./routes')
const { errorHandler } = require('./middleware')

const app = new Koa()

if (app.env === 'development') {
  app.proxy = true
}

app.use(errorHandler())
app.use(serve('/Users/squadri/Desktop/dist'))
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3001)

module.exports = app
