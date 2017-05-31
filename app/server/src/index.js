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
app.use(serve('/Users/squadri/Projects/latexresu.me/app/client/dist'))
app.use(bodyParser())
app.use(router)

app.listen(3001)

module.exports = app
