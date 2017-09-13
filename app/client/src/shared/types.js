/**
 * @flow
 */

import type { Dispatch as ReduxDispatch } from 'redux'

type State = {}
type GetState = () => State
type Action = {}
type Dispatch = ReduxDispatch<Action>
type AsyncAction = (dispatch: Dispatch, getState: GetState) => any

export type {
  State,
  Dispatch,
  Action,
  AsyncAction
}
