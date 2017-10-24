/**
 * @flow
 */

import { combineReducers } from 'redux'
import form from '../features/form/reducer'
import templates from '../features/templates/reducer'
import preview from '../features/preview/reducer'

const reducer = combineReducers({
  form,
  templates,
  preview
})

export default reducer
