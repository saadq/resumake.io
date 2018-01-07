/**
 * @flow
 */

import { isEqual } from 'lodash'
import { initialState } from '../features/form/reducer'
import type { State } from './types'

function hasPrevSession(state: State) {
  return !isEqual(state.form.resume.values, initialState.values)
}

export { hasPrevSession }
