import { configureStore } from '@reduxjs/toolkit'
import rootReduceur from '../slice'

export const store = configureStore({
  reducer: rootReduceur,
})