import { combineReducers } from 'redux'
import { settingsReducer } from '../generator/settings/slice'

export const rootReducer = combineReducers({
  settings: settingsReducer
})
