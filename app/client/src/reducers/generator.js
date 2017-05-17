import {
  SELECT_TEMPLATE,
  REQUEST_RESUME,
  RECEIVE_RESUME,
  SAVE_PREVIOUS_RESUME,
  REQUEST_SOURCE,
  RECEIVE_SOURCE
} from '../constants'

const initialState = {
  template: 1,
  isGenerating: false,
  isDownloading: false,
  prevResume: {},
  pdf: {
    url: null
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

    case SAVE_PREVIOUS_RESUME:
      return {
        ...state,
        prevResume: action.payload
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

    default:
      return state
  }
}

export default generator
