const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./routes')

const app = new Koa()

if (app.env === 'development') {
  app.proxy = true
}

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3001)

module.exports = app
