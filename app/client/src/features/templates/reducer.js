/**
 * @flow
 */

import type { TemplatesState as State } from './types'
import type { Action } from '../../shared/types'

const initialState = {
  selectedTemplate: 1,
  lightbox: {
    images: [],
    index: 0,
    prevIndex: 0,
    nextIndex: 0,
    isOpen: false
  }
}

function getPrevIndex(images, index) {
  return (index + images.length - 1) % images.length
}

function getNextIndex(images, index) {
  return (index + 1) % images.length
}

function templates(state: State = initialState, action: Action): State {
  switch (action.type) {
    case 'LOAD_IMAGES':
      return {
        ...state,
        lightbox: {
          ...state.lightbox,
          images: action.images,
          index: 0,
          prevIndex: getPrevIndex(action.images, 0),
          nextIndex: getNextIndex(action.images, 0)
        }
      }

    case 'SHOW_LIGHTBOX':
      return {
        ...state,
        lightbox: {
          ...state.lightbox,
          isOpen: true,
          index: action.index,
          prevIndex: getPrevIndex(state.lightbox.images, action.index),
          nextIndex: getNextIndex(state.lightbox.images, action.index)
        }
      }

    case 'HIDE_LIGHTBOX':
      return {
        ...state,
        lightbox: {
          ...state.lightbox,
          isOpen: false,
          index: 0
        }
      }

    case 'PREV_IMAGE':
      return {
        ...state,
        lightbox: {
          ...state.lightbox,
          index: state.lightbox.prevIndex,
          prevIndex: getPrevIndex(
            state.lightbox.images,
            state.lightbox.prevIndex
          ),
          nextIndex: getNextIndex(
            state.lightbox.images,
            state.lightbox.prevIndex
          )
        }
      }

    case 'NEXT_IMAGE':
      return {
        ...state,
        lightbox: {
          ...state.lightbox,
          index: state.lightbox.nextIndex,
          prevIndex: getPrevIndex(
            state.lightbox.images,
            state.lightbox.nextIndex
          ),
          nextIndex: getNextIndex(
            state.lightbox.images,
            state.lightbox.nextIndex
          )
        }
      }

    default:
      return state
  }
}

export default templates
