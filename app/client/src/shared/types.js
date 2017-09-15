/**
 * @flow
 */

import type { Dispatch as ReduxDispatch } from 'redux'
import type {
  TemplatesState,
  TemplatesAction
} from '../features/templates/types'

type State = {
  templates: TemplatesState
}

type GetState = () => State
type Action = TemplatesAction
type Dispatch = ReduxDispatch<Action>
type AsyncAction = (dispatch: Dispatch, getState: GetState) => any

export type { State, Dispatch, Action, AsyncAction }
