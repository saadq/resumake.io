/**
 * @flow
 */

import { combineReducers } from 'redux'
import form from '../features/form/reducer'
import sectionOrder from '../features/section-order/reducer'
import preview from '../features/preview/reducer'

const reducer = combineReducers({
  form,
  sectionOrder,
  preview
})

export default reducer
