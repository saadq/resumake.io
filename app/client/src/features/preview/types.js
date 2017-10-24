/**
 * @flow
 */

type PreviewState = {
  resumeURL?: string
}

type PreviewAction = {
  type: 'SET_RESUME_URL',
  resumeURL: string
}

export type { PreviewState, PreviewAction }
