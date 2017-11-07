/**
 * @flow
 */

type UIState = {
  lightbox: {
    index: number,
    isOpen: boolean
  },
  isPrinting: boolean
}

type UIAction =
  | { type: 'SHOW_LIGHTBOX', index: number }
  | { type: 'HIDE_LIGHTBOX' }
  | { type: 'START_PRINT' }
  | { type: 'STOP_PRINT' }

export type { UIState, UIAction }
