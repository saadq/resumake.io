/**
 * @flow
 */

import type { FormState, FormAction } from '../features/form/types'
import type { PreviewState, PreviewAction } from '../features/preview/types'
import type {
  SectionOrderState,
  SectionOrderAction
} from '../features/ordered-sections/types'

type State = {
  form: { resume: FormState },
  orderedSections: SectionOrderState,
  preview: PreviewState
}

type AppAction = { type: 'CLEAR_STATE' }

/* eslint-disable no-use-before-define */
type GetState = () => State
type Action = AppAction | FormAction | PreviewAction | SectionOrderAction
type AsyncAction = (dispatch: Dispatch, getState: GetState) => any
type PromiseAction = Promise<Action>
type Dispatch = (action: Action | AsyncAction | PromiseAction) => any;
/* eslint-enable no-use-before-define */

export type { AppAction, State, Dispatch, Action, AsyncAction }
