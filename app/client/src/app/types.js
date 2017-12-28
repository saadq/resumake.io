/**
 * @flow
 */

import type { Dispatch as ReduxDispatch } from 'redux'
import type { FormState, FormAction } from '../features/form/types'
import type { ProgressState, ProgressAction } from '../features/progress/types'
import type { PreviewState, PreviewAction } from '../features/preview/types'
import type {
  SectionOrderState,
  SectionOrderAction
} from '../features/section-order/types'

type State = {
  form: { resume: FormState },
  sectionOrder: SectionOrderState,
  progress: ProgressState,
  preview: PreviewState
}

type AppAction = { type: 'CLEAR_STATE' }

type GetState = () => State
type Action =
  | AppAction
  | FormAction
  | ProgressAction
  | PreviewAction
  | SectionOrderAction
type Dispatch = ReduxDispatch<Action>
type AsyncAction = (dispatch: Dispatch, getState: GetState) => any

export type { AppAction, State, Dispatch, Action, AsyncAction }
