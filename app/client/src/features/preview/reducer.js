/**
 * @flow
 */

import type { PreviewState as State } from './types'
import type { Action } from '../../shared/types'

const initialState = {
  isDownloading: false
}

function preview(state: State = initialState, action: Action) {
  switch (action.type) {
    case 'GENERATE_RESUME_REQUEST':
      return {
        ...state,
        status: 'pending'
      }

    case 'GENERATE_RESUME_SUCCESS':
      return {
        ...state,
        status: 'success',
        resumeURL: action.resumeURL
      }

    case 'GENERATE_RESUME_FAILURE':
      return {
        ...state,
        status: 'failure'
      }

    case 'SAVE_RESUME_DATA':
      return {
        ...state,
        resumeData: action.resumeData
      }

    case 'DOWNLOAD_SOURCE_REQUEST':
      return {
        ...state,
        isDownloading: true
      }

    case 'DOWNLOAD_SOURCE_SUCCESS':
    case 'DOWNLOAD_SOURCE_FAILURE':
      return {
        ...state,
        isDownloading: false
      }

    default:
      return state
  }
}

export default preview
