const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const router = require('./routes')

const app = new Koa()

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(4000)

module.exports = app
