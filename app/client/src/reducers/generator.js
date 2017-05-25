import {
  SELECT_TEMPLATE,
  REQUEST_RESUME,
  RESUME_SUCCESS,
  RESUME_FAILURE,
  SAVE_RESUME_DATA,
  REQUEST_SOURCE,
  DOWNLOAD_SOURCE_SUCCESS,
  DOWNLOAD_SOURCE_FAILURE,
  SET_PAGE_COUNT,
  SET_PAGE,
  PREV_PAGE,
  NEXT_PAGE
} from '../constants'

const initialState = {
  template: 9,
  isDownloading: false,
  resumeData: {},
  pdf: {
    url: null,
    pageCount: 0
  }
}

function generator(state = initialState, action) {
  switch (action.type) {
    case SELECT_TEMPLATE:
      return {
        ...state,
        template: action.templateId
      }

    case REQUEST_RESUME:
      return {
        ...state,
        status: 'pending'
      }

    case RESUME_SUCCESS:
      return {
        ...state,
        status: 'success',
        pdf: {
          ...state.pdf,
          url: action.url
        }
      }

    case RESUME_FAILURE:
      return {
        ...state,
        status: 'failure'
      }

    case SAVE_RESUME_DATA:
      return {
        ...state,
        resumeData: action.payload
      }

    case REQUEST_SOURCE:
      return {
        ...state,
        isDownloading: true
      }

    case DOWNLOAD_SOURCE_SUCCESS:
    case DOWNLOAD_SOURCE_FAILURE:
      return {
        ...state,
        isDownloading: false
      }

    case SET_PAGE_COUNT:
      return {
        ...state,
        pdf: {
          ...state.pdf,
          pageCount: action.pageCount
        }
      }

    case SET_PAGE:
      return {
        ...state,
        pdf: {
          ...state.pdf,
          page: action.page > 0 && action.page <= state.pdf.pageCount
            ? action.page
            : 1
        }
      }

    case PREV_PAGE:
      return {
        ...state,
        pdf: {
          ...state.pdf,
          page: Math.max(state.pdf.page - 1, 1)
        }
      }

    case NEXT_PAGE:
      return {
        ...state,
        pdf: {
          ...state.pdf,
          page: Math.min(state.pdf.page + 1, state.pdf.pageCount)
        }
      }

    default:
      return state
  }
}

export default generator
