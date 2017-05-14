import {
  SELECT_TEMPLATE,
  REQUEST_RESUME,
  RECEIVE_RESUME,
  SAVE_PREVIOUS_RESUME
} from '../constants'

const initialState = {
  template: 7,
  isGenerating: false,
  resumeURL: null,
  prevResume: {}
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
        resumeURL: action.url,
        isGenerating: false
      }

    case SAVE_PREVIOUS_RESUME:
      return {
        ...state,
        prevResume: action.payload
      }

    default:
      return state
  }
}

export default generator
