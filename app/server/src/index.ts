import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { api } from './routes/api'
import { errorHandler } from './middleware/error-handler'

const app = new Koa()
const port = process.env.PORT || 4001

app.use(errorHandler())
app.use(bodyParser())
app.use(api.routes())
app.use(api.allowedMethods())

app.on('error', (error) => {
  console.error(error)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
