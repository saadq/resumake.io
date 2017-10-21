/**
 * @flow
 */

import type { TemplatesAction as Action } from './types'

function loadImages(images: Array<string>): Action {
  return {
    type: 'LOAD_IMAGES',
    images
  }
}

function selectTemplate(templateId: number): Action {
  return {
    type: 'SELECT_TEMPLATE',
    templateId
  }
}

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

function nextImage(): Action {
  return {
    type: 'NEXT_IMAGE'
  }
}

function prevImage(): Action {
  return {
    type: 'PREV_IMAGE'
  }
}

export {
  loadImages,
  selectTemplate,
  showLightbox,
  hideLightbox,
  nextImage,
  prevImage
}
