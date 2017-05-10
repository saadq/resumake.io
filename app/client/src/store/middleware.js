import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

const middleware = []

if (process.env.NODE_ENV === 'development') {
  middleware.push(thunk)
  middleware.push(logger)
}

export default composeWithDevTools(
  applyMiddleware(...middleware)
)
