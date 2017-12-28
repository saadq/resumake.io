/**
 * @flow
 */

import { combineReducers } from 'redux'
import form from '../features/form/reducer'
import sectionOrder from '../features/section-order/reducer'
import progress from '../features/progress/reducer'
import preview from '../features/preview/reducer'

const reducer = combineReducers({
  form,
  sectionOrder,
  progress,
  preview
})

export default reducer
