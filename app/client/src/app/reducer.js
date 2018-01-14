/**
 * @flow
 */

import { combineReducers } from 'redux'
import form from '../features/form/reducer'
import orderedSections from '../features/progress/reducer'
import preview from '../features/preview/reducer'
import type { State, Action } from './types'

const appReducer = combineReducers({
  form,
  orderedSections,
  preview
})

function rootReducer(state?: State, action: Action) {
  if (action.type === 'CLEAR_STATE') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
