import Koa from 'koa'
import { api } from './routes/api'
import { errorHandler } from './middleware/errorHandler'

const app = new Koa()
const port = 4001

app.use(errorHandler())
app.use(api.routes())
app.use(api.allowedMethods())

app.on('error', (error) => {
  console.error(error)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
