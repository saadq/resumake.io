/**
 * @flow
 */

type ProgressState = {
  progress: number,
  prev: string,
  curr: string,
  next: string
}

type ProgressAction = {
  type: 'SET_PROGRESS',
  progress: number,
  prev: string,
  curr: string,
  next: string
}

export type { ProgressState, ProgressAction }
