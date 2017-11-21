/**
 * @flow
 */

import type { ProgressState as State } from './types'
import type { Action } from '../../shared/types'

const initialState = {
  section: 'profile'
}

function progress(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'PREV_SECTION':
      return state

    case 'NEXT_SECTION':
      return state

    default:
      return state
  }
}

export default progress
