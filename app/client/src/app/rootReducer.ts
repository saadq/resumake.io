import { combineReducers } from 'redux'
import { formReducer } from 'generator/resume-form/slice'

export const rootReducer = combineReducers({
  form: formReducer
})
