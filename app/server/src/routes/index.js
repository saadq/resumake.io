const combineRouters = require('koa-combine-routers')
const api = require('./api')
const root = require('./root')

const router = combineRouters(api, root)

module.exports = router
