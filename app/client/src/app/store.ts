import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducer'

export function createStore() {
  return configureStore({
    reducer: rootReducer
  })
}
