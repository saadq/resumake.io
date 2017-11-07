/**
 * @flow
 */

import type { FormValues } from '../form/types'

type PreviewState = {
  resume: {
    pageCount: number,
    page: number,
    status?: 'pending' | 'success' | 'failure',
    url?: string,
    data?: FormValues
  },
  isDownloading: boolean
}

type PreviewAction =
  | { type: 'SAVE_RESUME_DATA', resumeData: FormValues }
  | { type: 'GENERATE_RESUME_REQUEST' }
  | { type: 'GENERATE_RESUME_SUCCESS', resumeURL: string }
  | { type: 'GENERATE_RESUME_FAILURE' }
  | { type: 'SET_PAGE_COUNT', pageCount: number }
  | { type: 'PREV_PAGE' }
  | { type: 'NEXT_PAGE' }
  | { type: 'DOWNLOAD_SOURCE_REQUEST' }
  | { type: 'DOWNLOAD_SOURCE_SUCCESS' }
  | { type: 'DOWNLOAD_SOURCE_FAILURE' }

export type { PreviewState, PreviewAction }
