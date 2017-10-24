/**
 * @flow
 */

import type { PreviewState as State } from './types'
import type { Action } from '../../shared/types'

const initialState = {}

function preview(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'SET_RESUME_URL':
      return {
        ...state,
        resumeURL: action.resumeURL
      }

    default:
      return state
  }
}

export default preview
