/**
 * @flow
 */

import { combineReducers } from 'redux'
import form from '../features/form/reducer'
import progress from '../features/progress/reducer'
import preview from '../features/preview/reducer'

const reducer = combineReducers({
  progress,
  form,
  preview
})

export default reducer
