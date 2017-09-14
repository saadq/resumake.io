/**
 * @flow
 */

type TemplatesState = {
  selectedTemplate: number,
  lightbox: {
    images: Array<string>,
    index: number,
    prevIndex: number,
    nextIndex: number,
    isOpen: boolean
  }
}

type TemplatesAction =
  | { type: 'LOAD_IMAGES', images: Array<string> }
  | { type: 'SHOW_LIGHTBOX', index: number }
  | { type: 'HIDE_LIGHTBOX' }
  | { type: 'PREV_IMAGE' }
  | { type: 'NEXT_IMAGE' }

export type { TemplatesState, TemplatesAction }
