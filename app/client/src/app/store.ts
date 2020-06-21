import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './root-reducer'

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}
