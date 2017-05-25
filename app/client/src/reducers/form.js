import { reducer } from 'redux-form'
import {
  CLEAR_SCHOOL_FIELD,
  CLEAR_JOB_FIELD,
  CLEAR_JOB_DUTY_FIELD,
  CLEAR_PROJECT_FIELD,
  CLEAR_SKILL_FIELD
} from '../constants'

function form(state = {}, action) {
  switch (action.type) {
    case CLEAR_SCHOOL_FIELD:
      if (
        !state.values ||
        !state.values.schools ||
        state.values.schools.length <= 1 ||
        state.values.schools.length !== action.schoolCount
      ) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          schools: state.values.schools.slice(0, -1)
        }
      }

    case CLEAR_JOB_FIELD:
      if (
        !state.values ||
        !state.values.jobs ||
        state.values.jobs.length <= 1 ||
        state.values.jobs.length !== action.jobCount
      ) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          jobs: state.values.jobs.slice(0, -1)
        }
      }

    case CLEAR_JOB_DUTY_FIELD:
      if (
        !state.values ||
        !state.values.jobs ||
        !state.values.jobs[action.index] ||
        !state.values.jobs[action.index].duties ||
        state.values.jobs[action.index].duties.length <= 1 ||
        action.jobDutyCount !== state.values.jobs[action.index].duties.length
      ) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          jobs: [
            ...state.values.jobs.slice(0, action.index),
            {
              ...state.values.jobs[action.index],
              duties: state.values.jobs[action.index].duties.slice(0, -1)
            },
            ...state.values.jobs.slice(action.index + 1)
          ]
        }
      }

    case CLEAR_PROJECT_FIELD:
      if (
        !state.values ||
        !state.values.projects ||
        state.values.projects.length <= 1 ||
        state.values.projects.length !== action.projectCount
      ) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          projects: state.values.projects.slice(0, -1)
        }
      }

    case CLEAR_SKILL_FIELD:
      if (
        !state.values ||
        !state.values.skills ||
        state.values.skills.length <= 1 ||
        state.values.skills.length !== action.skillCount
      ) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          skills: state.values.skills.slice(0, -1)
        }
      }

    default:
      return state
  }
}

export { form }
export default reducer.plugin({ resume: form })
