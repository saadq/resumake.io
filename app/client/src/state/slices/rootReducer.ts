import { combineReducers } from 'redux'
import { settingsReducer } from '../slices/settings'

export const rootReducer = combineReducers({
  settings: settingsReducer
})
