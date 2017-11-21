/**
 * @flow
 */

type ProgressState = {
  sections: Array<string>,
  progress: number,
  prev: string,
  curr: string,
  next: string
}

type ProgressAction =
  | { type: 'PREV_SECTION' }
  | { type: 'NEXT_SECTION' }
  | { type: 'SET_PROGRESS', progress: number }

export type { ProgressState, ProgressAction }
