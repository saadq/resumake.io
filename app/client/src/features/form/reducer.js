/**
 * @flow
 */

import { reducer } from 'redux-form'
import type { FormState } from './types'
import type { Action } from '../../shared/types'

const initialState = {
  schoolCount: 1,
  jobCount: 1,
  skillCount: 1,
  projectCount: 1,
  awardCount: 1
}

/**
 * redux-form is being used to handle form state, so whenever
 * input fields are changed the form stuff in our redux store
 * will auto-update. However, redux-form doesn't update the state
 * when input fields are removed, so we need to manually handle input
 * field removals with this reducer.
 */

function form(state: FormState = initialState, action: Action): FormState {
  switch (action.type) {
    case 'ADD_SCHOOL':
      return {
        ...state,
        schoolCount: state.schoolCount + 1
      }

    case 'REMOVE_SCHOOL':
      return {
        ...state,
        schoolCount: Math.max(state.schoolCount - 1, 1)
      }

    case 'CLEAR_SCHOOL_FIELD':
      if (
        !state.values ||
        !state.values.education ||
        state.values.education.length <= 1
      ) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          education: state.values.education.slice(0, -1)
        }
      }

    case 'ADD_JOB':
      return {
        ...state,
        jobCount: state.jobCount + 1
      }

    case 'REMOVE_JOB':
      return {
        ...state,
        jobCount: Math.max(state.jobCount - 1, 1)
      }

    case 'CLEAR_JOB_FIELD':
      if (
        !state.values ||
        !state.values.work ||
        state.values.work.length <= 1 ||
        state.values.work.length !== action.jobCount
      ) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          work: state.values.work.slice(0, -1)
        }
      }

    case 'CLEAR_PROJECT_FIELD':
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

    case 'CLEAR_SKILL_FIELD':
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

    case 'CLEAR_AWARD_FIELD':
      if (
        !state.values ||
        !state.values.awards ||
        state.values.awards.length <= 1 ||
        state.values.awards.length !== action.awardCount
      ) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          awards: state.values.awards.slice(0, -1)
        }
      }

    default:
      return state
  }
}

export { form }
export default reducer.plugin({ resume: form })
