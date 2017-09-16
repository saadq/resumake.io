/**
 * @flow
 */

import type { FormState as State } from './types'
import type { Action } from '../../shared/types'

const initialState = {
  basics: {},
  work: [],
  education: [],
  awards: [],
  skills: []
}

function form(state: State = initialState, action: Action): State {
  switch (action.type) {
    default: return state
  }
}

export default form
