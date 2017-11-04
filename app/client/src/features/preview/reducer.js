/**
 * @flow
 */

import type { PreviewState as State } from './types'
import type { Action } from '../../shared/types'

const initialState = {}

function preview(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'GENERATE_RESUME_REQUEST':
      return {
        ...state,
        status: 'pending'
      }

    case 'GENERATE_RESUME_SUCCESS':
      return {
        ...state,
        status: 'success',
        resumeURL: action.resumeURL
      }

    case 'GENERATE_RESUME_FAILURE':
      return {
        ...state,
        status: 'failure'
      }

    default:
      return state
  }
}

export default preview
