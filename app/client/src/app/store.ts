import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer'

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}
