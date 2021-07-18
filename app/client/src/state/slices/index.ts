import { combineReducers } from 'redux'
import { formReducer } from './form'
import { settingsReducer } from './settings'

export const rootReducer = combineReducers({
  form: formReducer,
  settings: settingsReducer
})
