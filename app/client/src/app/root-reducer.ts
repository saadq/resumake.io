import { combineReducers } from 'redux'
import { formReducer } from 'generator/resume-form/slice'
import { previewReducer } from 'generator/resume-preview/slice'

export const rootReducer = combineReducers({
  form: formReducer,
  preview: previewReducer
})
