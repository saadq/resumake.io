/**
 * @flow
 */

import type { AppAction as Action } from './types'

function clearState(): Action {
  return {
    type: 'CLEAR_STATE'
  }
}

export { clearState }
