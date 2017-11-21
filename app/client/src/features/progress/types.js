/**
 * @flow
 */

type ProgressState = {
  section: string
}

type ProgressAction = { type: 'PREV_SECTION' } | { type: 'NEXT_SECTION' }

export type { ProgressState, ProgressAction }
