import {
  configureStore,
  getDefaultMiddleware,
  Middleware
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from './slices'
import { rootSaga } from './sagas'

export function createStore() {
  const sagaMiddleware = createSagaMiddleware()

  const middleware: Middleware[] = [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware
  ]

  const store = configureStore({
    reducer: rootReducer,
    middleware
  })

  sagaMiddleware.run(rootSaga)

  return store
}
