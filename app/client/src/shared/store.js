/**
 * @flow
 */

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducer'

const middleware = [thunk]

if (process.env.NODE_ENV === 'development') {
  middleware.push(createLogger())
}

const composedMiddleware = composeWithDevTools(applyMiddleware(...middleware))
const store = createStore(reducer, composedMiddleware)

export default store
