import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const middleware = []

if (process.env.NODE_ENV === 'development') {
  middleware.push(thunk)
  middleware.push(createLogger({
    predicate: (getState, action) => !action.type.startsWith('@@redux-form')
  }))
}

export default composeWithDevTools(
  applyMiddleware(...middleware)
)
