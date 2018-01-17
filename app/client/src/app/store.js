/**
 * @flow
 */

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import persistState from 'redux-localstorage'
import reducer from './reducer'

const middleware = [thunk]

if (process.env.NODE_ENV === 'development') {
  middleware.push(
    createLogger({
      predicate: (_, action) => !action.type.startsWith('@@redux-form')
    })
  )
}

const enhancer = composeWithDevTools(
  applyMiddleware(...middleware),
  persistState(['form', 'progress'], { key: 'resumake' })
)

const store = createStore(reducer, enhancer)

export default store
