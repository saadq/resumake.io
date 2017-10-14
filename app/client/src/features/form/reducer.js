/**
 * @flow
 */

import { reducer } from 'redux-form'
import type { FormState } from './types'
import type { Action } from '../../shared/types'

// Keep track of fragment counts so that we know how many to render in our view.
// This state will be merged with redux-form's form values state.
const initialState = {
  schoolCount: 1,
  jobCount: 1,
  jobHighlights: [1],
  skillCount: 1,
  skillKeywords: [1],
  projectCount: 1,
  awardCount: 1
}

/**
 * redux-form is being used to handle form state, so whenever
 * input fields are changed the form stuff in our redux store
 * will auto-update. However, redux-form doesn't update the state
 * when input fields are removed from the view, so we need to
 * manually handle input field removals with this reducer.
 * That is what the 'CLEAR_X' cases are for.
 *
 * We are also keeping counts of the fragments in our state so that we know
 * how many to render in our view (redux-form will automatically set
 * the values inside those fragments, we just need to keep track of how many to render).
 * That is what the ADD_X and REMOVE_X cases for.
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
        jobCount: state.jobCount + 1,
        jobHighlights: [...state.jobHighlights, 1]
      }

    case 'REMOVE_JOB':
      return {
        ...state,
        jobCount: Math.max(state.jobCount - 1, 1),
        jobHighlights:
          state.jobCount > 1 ? state.jobHighlights.slice(0, -1) : [1]
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

    case 'ADD_JOB_HIGHLIGHT':
      return {
        ...state,
        jobHighlights: [
          ...state.jobHighlights.slice(0, action.index),
          state.jobHighlights[action.index] + 1,
          ...state.jobHighlights.slice(action.index + 1)
        ]
      }

    case 'REMOVE_JOB_HIGHLIGHT':
      return {
        ...state,
        jobHighlights: [
          ...state.jobHighlights.slice(0, action.index),
          state.jobHighlights[action.index] > 1
            ? state.jobHighlights[action.index] - 1
            : 1,
          ...state.jobHighlights.slice(action.index + 1)
        ]
      }

    case 'CLEAR_JOB_HIGHLIGHT_FIELD':
      if (
        !state.values ||
        !state.values.work ||
        !state.values.work[action.index] ||
        !state.values.work[action.index].highlights ||
        state.values.work[action.index].highlights.length <= 1 ||
        action.highlightCount !==
          state.values.work[action.index].highlights.length
      ) {
        return state
      }

      const { work } = (state.values: any)

      return {
        ...state,
        values: {
          ...state.values,
          work: [
            ...work.slice(0, action.index),
            {
              ...work[action.index],
              highlights: work[action.index].highlights.slice(0, -1)
            },
            ...work.slice(action.index + 1)
          ]
        }
      }

    case 'ADD_SKILL':
      return {
        ...state,
        skillCount: state.skillCount + 1,
        skillKeywords: [...state.skillKeywords, 1]
      }

    case 'REMOVE_SKILL':
      return {
        ...state,
        skillCount: Math.max(state.skillCount - 1, 1),
        skillKeywords:
          state.skillCount > 1 ? state.skillKeywords.slice(0, -1) : [1]
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

    case 'ADD_SKILL_KEYWORD':
      return {
        ...state,
        skillKeywords: [
          ...state.skillKeywords.slice(0, action.index),
          state.skillKeywords[action.index] + 1,
          ...state.skillKeywords.slice(action.index + 1)
        ]
      }

    case 'REMOVE_SKILL_KEYWORD':
      return {
        ...state,
        skillKeywords: [
          ...state.skillKeywords.slice(0, action.index),
          state.skillKeywords[action.index] > 1
            ? state.skillKeywords[action.index] - 1
            : 1,
          ...state.skillKeywords.slice(action.index + 1)
        ]
      }

    case 'CLEAR_SKILL_KEYWORD_FIELD':
      if (
        !state.values ||
        !state.values.skills ||
        !state.values.skills[action.index] ||
        !state.values.skills[action.index].keywords ||
        state.values.skills[action.index].keywords.length <= 1 ||
        action.keywordCount !==
          state.values.skills[action.index].keywords.length
      ) {
        return state
      }

      const { skills } = (state.values: any)

      return {
        ...state,
        values: {
          ...state.values,
          skills: [
            ...skills.slice(0, action.index),
            {
              ...skills[action.index],
              keywords: skills[action.index].keywords.slice(0, -1)
            },
            ...skills.slice(action.index + 1)
          ]
        }
      }

    default:
      return state
  }
}

export { form }
export default reducer.plugin({ resume: form })
