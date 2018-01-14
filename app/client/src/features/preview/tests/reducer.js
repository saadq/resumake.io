/**
 * @flow
 */

import reducer from '../reducer'
import {
  clearPreview,
  generateResumeRequest,
  generateResumeSuccess,
  generateResumeFailure,
  downloadSourceRequest,
  downloadSourceSuccess,
  downloadSourceFailure
} from '../actions'
import type { PreviewState as State } from '../types'

describe('preview reducer', () => {
  it('should handle clearPreview', () => {
    const state: State = {
      isDownloading: false,
      data: {
        json: {
          basics: {
            fullName: 'Saad Quadri'
          }
        }
      },
      resume: {
        pageCount: 1,
        page: 1
      }
    }

    const action = clearPreview()

    const expected: State = {
      isDownloading: false,
      data: {},
      resume: {
        pageCount: 1,
        page: 1
      }
    }

    const actual: State = reducer(state, action)

    expect(actual).toEqual(expected)
  })

  it('should handle GENERATE_RESUME_REQUEST', () => {
    const state: State = {
      isDownloading: false,
      data: {},
      resume: {
        pageCount: 1,
        page: 1
      }
    }

    const action = generateResumeRequest()

    const expected: State = {
      ...state,
      resume: {
        ...state.resume,
        status: 'pending'
      }
    }

    const actual: State = reducer(state, action)

    expect(actual).toEqual(expected)
  })

  it('should handle GENERATE_RESUME_SUCCESS', () => {
    const state: State = {
      isDownloading: false,
      data: {},
      resume: {
        pageCount: 1,
        page: 1
      }
    }

    const action = generateResumeSuccess('/fake/resume.pdf')

    const expected: State = {
      ...state,
      resume: {
        ...state.resume,
        status: 'success',
        url: '/fake/resume.pdf'
      }
    }

    const actual: State = reducer(state, action)

    expect(actual).toEqual(expected)
  })

  it('should handle GENERATE_RESUME_FAILURE', () => {
    const state: State = {
      isDownloading: false,
      data: {},
      resume: {
        pageCount: 1,
        page: 1
      }
    }

    const action = generateResumeFailure()

    const expected: State = {
      ...state,
      resume: {
        ...state.resume,
        status: 'failure'
      }
    }

    const actual: State = reducer(state, action)

    expect(actual).toEqual(expected)
  })

  it('should handle DOWNLOAD_SOURCE_REQUEST', () => {
    const state: State = {
      isDownloading: false,
      data: {},
      resume: {
        pageCount: 1,
        page: 1
      }
    }

    const action = downloadSourceRequest()

    const expected: State = {
      ...state,
      isDownloading: true
    }

    const actual: State = reducer(state, action)

    expect(actual).toEqual(expected)
  })

  it('should handle DOWNLOAD_SOURCE_SUCCESS', () => {
    const state: State = {
      isDownloading: false,
      data: {},
      resume: {
        pageCount: 1,
        page: 1
      }
    }

    const action = downloadSourceSuccess()

    const expected: State = {
      ...state,
      isDownloading: false
    }

    const actual: State = reducer(state, action)

    expect(actual).toEqual(expected)
  })

  it('should handle DOWNLOAD_SOURCE_FAILURE', () => {
    const state: State = {
      isDownloading: false,
      data: {},
      resume: {
        pageCount: 1,
        page: 1
      }
    }

    const action = downloadSourceFailure()

    const expected: State = {
      ...state,
      isDownloading: false
    }

    const actual: State = reducer(state, action)

    expect(actual).toEqual(expected)
  })
})
