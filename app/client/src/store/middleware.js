import { applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'

const middleware = [thunk]

if (process.env.NODE_ENV === 'development') {
  middleware.push(
    createLogger({
      predicate: (getState, action) =>
        !action.type.startsWith('@@redux-form') &&
        !action.type.startsWith('HIDE_SIDE')
    })
  )
}

export default composeWithDevTools(applyMiddleware(...middleware))
