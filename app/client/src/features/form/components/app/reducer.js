/**
 * @flow
 */

import { combineReducers } from 'redux'
import form from '../features/form/reducer'
import orderedSections from '../features/ordered-sections/reducer'
import preview from '../features/preview/reducer'

const reducer = combineReducers({
  form,
  orderedSections,
  preview
})

export default reducer
