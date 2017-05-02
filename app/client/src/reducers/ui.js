import {
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_SIDE_NAV,
  HIDE_SIDE_NAV
} from '../constants'

const initialState = {
  modal: {
    active: false
  },
  sideNav: {
    active: false
  }
}

function ui(state = initialState, action) {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        ...state,
        modal: {
          active: true,
          src: action.modalSrc
        }
      }

    case HIDE_MODAL:
      return {
        ...state,
        modal: {
          active: false,
          src: null
        }
      }

    case SHOW_SIDE_NAV:
      return {
        ...state,
        sideNav: {
          active: true
        }
      }

    case HIDE_SIDE_NAV:
      return {
        ...state,
        sideNav: {
          active: false
        }
      }

    default:
      return state
  }
}

export default ui
