import {
  SELECT_TEMPLATE,
  REQUEST_RESUME,
  RECEIVE_RESUME,
  SAVE_RESUME_DATA,
  REQUEST_SOURCE,
  RECEIVE_SOURCE,
  SET_TOTAL_PAGES,
  SET_CURRENT_PAGE,
  PREV_PAGE,
  NEXT_PAGE
} from '../constants'

const initialState = {
  template: 1,
  isGenerating: false,
  isDownloading: false,
  resumeData: {},
  pdf: {
    url: null,
    page: null,
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
        isGenerating: true
      }

    case RECEIVE_RESUME:
      return {
        ...state,
        isGenerating: false,
        pdf: {
          ...state.pdf,
          url: action.url
        }
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

    case RECEIVE_SOURCE:
      return {
        ...state,
        isDownloading: false
      }

    case SET_TOTAL_PAGES:
      return {
        ...state,
        pdf: {
          ...state.pdf,
          pageCount: action.pageCount
        }
      }

    case SET_CURRENT_PAGE:
      return {
        ...state,
        pdf: {
          ...state.pdf,
          page: action.page
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
