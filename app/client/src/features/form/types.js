/**
 * @flow
 */

type State = {
  templates: {
    images: Array<string>,
    selectedTemplate: number,
    lightbox: {
      mainSrc: string,
      prevSrc: string,
      nextSrc: string
    }
  }
}

export type {
  State
}
