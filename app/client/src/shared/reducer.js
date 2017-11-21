/**
 * @flow
 */

import { combineReducers } from 'redux'
import form from '../features/form/reducer'
import progress from '../features/progress/reducer'
import preview from '../features/preview/reducer'
import ui from '../features/ui/reducer'

const reducer = combineReducers({
  progress,
  form,
  preview,
  ui
})

export default reducer
