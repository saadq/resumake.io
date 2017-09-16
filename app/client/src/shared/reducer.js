/**
 * @flow
 */

import { combineReducers } from 'redux'
import form from '../features/form/reducer'
import templates from '../features/templates/reducer'

const reducer = combineReducers({
  form,
  templates
})

export default reducer
