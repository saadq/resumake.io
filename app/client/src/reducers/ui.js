import {
  SET_WINDOW_DIMENSIONS,
  ZOOM_IN,
  ZOOM_OUT,
  START_PRINT,
  STOP_PRINT,
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_SIDE_NAV,
  HIDE_SIDE_NAV,
  ADD_SCHOOL,
  REMOVE_SCHOOL,
  ADD_JOB,
  REMOVE_JOB,
  INCREMENT_JOB_DUTY,
  DECREMENT_JOB_DUTY,
  ADD_PROJECT,
  REMOVE_PROJECT,
  ADD_SKILL,
  REMOVE_SKILL,
  ADD_AWARD,
  REMOVE_AWARD,
  SET_SECTION_NAVIGATION
} from '../constants'

const initialState = {
  section: {
    prev: 'templates',
    curr: 'templates',
    next: 'profile'
  },
  dimensions: {
    width: 0,
    height: 0
  },
  scale: 1.5,
  isPrinting: false,
  schoolCount: 1,
  jobCount: 1,
  jobDuties: [1],
  projectCount: 1,
  skillCount: 1,
  awardCount: 1,
  modal: {
    active: false,
    src: null
  },
  sideNav: {
    active: false
  }
}

function ui(state = initialState, action) {
  switch (action.type) {
    case SET_WINDOW_DIMENSIONS:
      return {
        ...state,
        dimensions: {
          width: action.width,
          height: action.height
        }
      }

    case ZOOM_IN:
      return {
        ...state,
        scale: Math.max(state.scale - 0.5, 1)
      }

    case ZOOM_OUT:
      return {
        ...state,
        scale: Math.min(state.scale + 0.5, 5)
      }

    case START_PRINT:
      return {
        ...state,
        isPrinting: true
      }

    case STOP_PRINT:
      return {
        ...state,
        isPrinting: false
      }

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

    case ADD_SCHOOL:
      return {
        ...state,
        schoolCount: state.schoolCount + 1
      }

    case REMOVE_SCHOOL:
      return {
        ...state,
        schoolCount: state.schoolCount > 1 ? state.schoolCount - 1 : 1
      }

    case ADD_JOB:
      return {
        ...state,
        jobCount: state.jobCount + 1,
        jobDuties: [...state.jobDuties, 1]
      }

    case REMOVE_JOB:
      return {
        ...state,
        jobCount: state.jobCount > 1 ? state.jobCount - 1 : 1,
        jobDuties: state.jobCount > 1
          ? state.jobDuties.slice(0, state.jobDuties.length - 1)
          : [1]
      }

    case INCREMENT_JOB_DUTY:
      return {
        ...state,
        jobDuties: [
          ...state.jobDuties.slice(0, action.index),
          state.jobDuties[action.index] + 1,
          ...state.jobDuties.slice(action.index + 1)
        ]
      }

    case DECREMENT_JOB_DUTY:
      return {
        ...state,
        jobDuties: [
          ...state.jobDuties.slice(0, action.index),
          state.jobDuties[action.index] > 1
            ? state.jobDuties[action.index] - 1
            : 1,
          ...state.jobDuties.slice(action.index + 1)
        ]
      }

    case ADD_PROJECT:
      return {
        ...state,
        projectCount: state.projectCount + 1
      }

    case REMOVE_PROJECT:
      return {
        ...state,
        projectCount: state.projectCount > 1 ? state.projectCount - 1 : 1
      }

    case ADD_SKILL:
      return {
        ...state,
        skillCount: state.skillCount + 1
      }

    case REMOVE_SKILL:
      return {
        ...state,
        skillCount: state.skillCount > 1 ? state.skillCount - 1 : 1
      }

    case ADD_AWARD:
      return {
        ...state,
        awardCount: state.awardCount + 1
      }

    case REMOVE_AWARD:
      return {
        ...state,
        awardCount: state.awardCount > 1 ? state.awardCount - 1 : 1
      }

    case SET_SECTION_NAVIGATION:
      return {
        ...state,
        section: {
          prev: action.prev,
          curr: action.curr,
          next: action.next
        }
      }

    default:
      return state
  }
}

export default ui
