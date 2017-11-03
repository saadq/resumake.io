/**
 * @flow
 */

import type { UIAction as Action } from './types'

function showLightbox(index: number): Action {
  return {
    type: 'SHOW_LIGHTBOX',
    index
  }
}

function hideLightbox(): Action {
  return {
    type: 'HIDE_LIGHTBOX'
  }
}

export { showLightbox, hideLightbox }
