/**
 * @flow
 */

import type { FormValues } from '../form/types'

type PreviewState = {
  data: {
    json?: FormValues,
    url?: string
  },
  resume: {
    pageCount: number,
    page: number,
    status?: 'pending' | 'success' | 'failure',
    url?: string
  },
  isDownloading: boolean
}

type PreviewAction =
  | { type: 'CLEAR_PREVIEW' }
  | { type: 'SAVE_RESUME_DATA', data: FormValues, url: string }
  | { type: 'DOWNLOAD_RESUME_DATA' }
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
