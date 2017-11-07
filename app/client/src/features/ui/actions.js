/**
 * @flow
 */

import type { UIAction as Action } from './types'
import type { AsyncAction } from '../../shared/types'

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

function startPrint() {
  return {
    type: 'START_PRINT'
  }
}

function stopPrint(): Action {
  return {
    type: 'STOP_PRINT'
  }
}

function print(url: string): AsyncAction {
  return async (dispatch, getState) => {
    if (/Android/i.test(navigator.userAgent) || getState().ui.isPrinting) {
      return // Don't run on Android or if already printing
    }

    dispatch(startPrint())

    const frame = document.createElement('iframe')

    frame.addEventListener('load', () => {
      const win = frame.contentWindow

      win.focus()
      win.print()
      win.addEventListener('focus', () => {
        ;(document.body: any).removeChild(frame)
        dispatch(stopPrint())
      })
    })

    Object.assign(frame.style, {
      visibility: 'hidden',
      position: 'fixed',
      right: '0',
      bottom: '0'
    })

    frame.src = url
    ;(document.body: any).appendChild(frame)
  }
}

export { showLightbox, hideLightbox, print }
