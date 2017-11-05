/**
 * @flow
 */

import type { FormValues } from '../form/types'

type PreviewState = {
  resumeURL?: string,
  resumeData?: FormValues,
  status?: 'pending' | 'success' | 'failure',
  isDownloading: boolean
}

type PreviewAction =
  | { type: 'GENERATE_RESUME_REQUEST' }
  | { type: 'GENERATE_RESUME_SUCCESS', resumeURL: string }
  | { type: 'GENERATE_RESUME_FAILURE' }
  | { type: 'SAVE_RESUME_DATA', resumeData: FormValues }
  | { type: 'DOWNLOAD_SOURCE_REQUEST' }
  | { type: 'DOWNLOAD_SOURCE_SUCCESS' }
  | { type: 'DOWNLOAD_SOURCE_FAILURE' }

export type { PreviewState, PreviewAction }
