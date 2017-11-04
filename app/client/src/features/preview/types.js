/**
 * @flow
 */

type PreviewState = {
  resumeURL?: string,
  status?: 'pending' | 'success' | 'failure'
}

type PreviewAction =
  | { type: 'GENERATE_RESUME_REQUEST' }
  | { type: 'GENERATE_RESUME_SUCCESS', resumeURL: string }
  | { type: 'GENERATE_RESUME_FAILURE' }

export type { PreviewState, PreviewAction }
