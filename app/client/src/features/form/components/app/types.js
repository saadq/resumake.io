/**
 * @flow
 */

import type { Dispatch as ReduxDispatch } from 'redux'
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

type GetState = () => State
type Action = AppAction | FormAction | PreviewAction | SectionOrderAction
type Dispatch = ReduxDispatch<Action>
type AsyncAction = (dispatch: Dispatch, getState: GetState) => any

export type { AppAction, State, Dispatch, Action, AsyncAction }
