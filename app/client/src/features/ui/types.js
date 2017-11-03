/**
 * @flow
 */

type UIState = {
  lightbox: {
    index: number,
    isOpen: boolean
  }
}

type UIAction =
  | { type: 'SHOW_LIGHTBOX', index: number }
  | { type: 'HIDE_LIGHTBOX' }

export type { UIState, UIAction }
