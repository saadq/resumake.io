/**
 * @flow
 */

import { reducer } from 'redux-form'
import type { FormState } from './types'
import type { Action } from '../../app/types'

const initialState = {
  isUploading: false,
  values: {
    selectedTemplate: 1,
    basics: {},
    education: [{}],
    work: [
      {
        highlights: ['']
      }
    ],
    skills: [
      {
        keywords: ['']
      }
    ],
    projects: [
      {
        keywords: ['']
      }
    ],
    awards: [{}]
  }
}

function form(state: FormState = initialState, action: Action): FormState {
  switch (action.type) {
    case 'CLEAR_STATE': {
      return initialState
    }

    case 'UPLOAD_JSON_REQUEST': {
      return {
        ...state,
        isUploading: true
      }
    }

    case 'UPLOAD_JSON_SUCCESS': {
      return {
        ...state,
        isUploading: false,
        values: {
          ...state.values,
          ...action.json
        }
      }
    }

    case 'UPLOAD_JSON_FAILURE': {
      return {
        ...state,
        isUploading: false
      }
    }

    case 'SELECT_TEMPLATE': {
      return {
        ...state,
        values: {
          ...state.values,
          selectedTemplate: action.templateId
        }
      }
    }

    case 'ADD_SCHOOL': {
      return {
        ...state,
        values: {
          ...state.values,
          education: [...state.values.education, {}]
        }
      }
    }

    case 'REMOVE_SCHOOL': {
      if (state.values.education.length <= 1) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          education: state.values.education.slice(0, -1)
        }
      }
    }

    case 'ADD_JOB': {
      return {
        ...state,
        values: {
          ...state.values,
          work: [
            ...state.values.work,
            {
              highlights: ['']
            }
          ]
        }
      }
    }

    case 'REMOVE_JOB': {
      if (state.values.work.length <= 1) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          work: state.values.work.slice(0, -1)
        }
      }
    }

    case 'ADD_JOB_HIGHLIGHT': {
      const { work } = (state.values: any)

      return {
        ...state,
        values: {
          ...state.values,
          work: [
            ...work.slice(0, action.index),
            {
              ...work[action.index],
              highlights: [...work[action.index].highlights, '']
            },
            ...work.slice(action.index + 1)
          ]
        }
      }
    }

    case 'REMOVE_JOB_HIGHLIGHT': {
      const { work } = (state.values: any)

      if (
        !work[action.index] ||
        !work[action.index].highlights ||
        work[action.index].highlights.length <= 1
      ) {
        return state
      }

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
    }

    case 'ADD_SKILL': {
      return {
        ...state,
        values: {
          ...state.values,
          skills: [
            ...state.values.skills,
            {
              keywords: ['']
            }
          ]
        }
      }
    }

    case 'REMOVE_SKILL': {
      if (state.values.skills.length <= 1) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          skills: state.values.skills.slice(0, -1)
        }
      }
    }

    case 'ADD_SKILL_KEYWORD': {
      const { skills } = (state.values: any)

      return {
        ...state,
        values: {
          ...state.values,
          skills: [
            ...skills.slice(0, action.index),
            {
              ...skills[action.index],
              keywords: [...skills[action.index].keywords, '']
            },
            ...skills.slice(action.index + 1)
          ]
        }
      }
    }

    case 'REMOVE_SKILL_KEYWORD': {
      const { skills } = (state.values: any)

      if (
        !skills[action.index] ||
        !skills[action.index].keywords ||
        skills[action.index].keywords.length <= 1
      ) {
        return state
      }

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
    }

    case 'ADD_PROJECT': {
      return {
        ...state,
        values: {
          ...state.values,
          projects: [
            ...state.values.projects,
            {
              keywords: ['']
            }
          ]
        }
      }
    }

    case 'REMOVE_PROJECT': {
      if (state.values.projects.length <= 1) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          projects: state.values.projects.slice(0, -1)
        }
      }
    }

    case 'ADD_PROJECT_KEYWORD': {
      const { projects } = (state.values: any)

      return {
        ...state,
        values: {
          ...state.values,
          projects: [
            ...projects.slice(0, action.index),
            {
              ...projects[action.index],
              keywords: [...projects[action.index].keywords, '']
            },
            ...projects.slice(action.index + 1)
          ]
        }
      }
    }

    case 'REMOVE_PROJECT_KEYWORD': {
      const { projects } = (state.values: any)

      if (
        !projects[action.index] ||
        !projects[action.index].keywords ||
        projects[action.index].keywords.length <= 1
      ) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          projects: [
            ...projects.slice(0, action.index),
            {
              ...projects[action.index],
              keywords: projects[action.index].keywords.slice(0, -1)
            },
            ...projects.slice(action.index + 1)
          ]
        }
      }
    }

    case 'ADD_AWARD': {
      return {
        ...state,
        values: {
          ...state.values,
          awards: [...state.values.awards, {}]
        }
      }
    }

    case 'REMOVE_AWARD': {
      if (state.values.awards.length <= 1) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          awards: state.values.awards.slice(0, -1)
        }
      }
    }

    default:
      return state
  }
}

export { form }
export default reducer.plugin({ resume: form })
