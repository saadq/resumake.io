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
    basics: {
      name: '',
      email: '',
      phone: '',
      website: '',
      location: {
        address: ''
      }
    },
    education: {
      heading: '',
      schools: [
        {
          institution: '',
          location: '',
          area: '',
          studyType: '',
          startDate: '',
          endDate: '',
          gpa: ''
        }
      ]
    },
    work: {
      heading: '',
      jobs: [
        {
          company: '',
          location: '',
          position: '',
          website: '',
          startDate: '',
          endDate: '',
          highlights: ['']
        }
      ]
    },
    skills: {
      heading: '',
      skills: [
        {
          name: '',
          level: '',
          keywords: ['']
        }
      ]
    },
    projects: {
      heading: '',
      projects: [
        {
          name: '',
          description: '',
          url: '',
          keywords: ['']
        }
      ]
    },
    awards: {
      heading: '',
      awards: [
        {
          title: '',
          date: '',
          awarder: '',
          summary: ''
        }
      ]
    }
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
          education: {
            ...state.values.education,
            schools: [...state.values.education.schools, {}]
          }
        }
      }
    }

    case 'REMOVE_SCHOOL': {
      if (state.values.education.schools.length <= 1) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          education: {
            ...state.values.education,
            schools: state.values.education.schools.slice(0, -1)
          }
        }
      }
    }

    case 'ADD_JOB': {
      return {
        ...state,
        values: {
          ...state.values,
          work: {
            ...state.values.work,
            jobs: [...state.values.work.jobs, { highlights: [''] }]
          }
        }
      }
    }

    case 'REMOVE_JOB': {
      if (state.values.work.jobs.length <= 1) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          work: {
            ...state.values.work,
            jobs: state.values.work.jobs.slice(0, -1)
          }
        }
      }
    }

    case 'ADD_JOB_HIGHLIGHT': {
      return {
        ...state,
        values: {
          ...state.values,
          work: {
            ...state.values.work,
            jobs: [
              ...state.values.work.jobs.slice(0, action.index),
              {
                ...state.values.work.jobs[action.index],
                highlights: [
                  ...state.values.work.jobs[action.index].highlights,
                  ''
                ]
              },
              ...state.values.work.jobs.slice(action.index + 1)
            ]
          }
        }
      }
    }

    case 'REMOVE_JOB_HIGHLIGHT': {
      if (
        !state.values.work.jobs[action.index] ||
        !state.values.work.jobs[action.index].highlights ||
        state.values.work.jobs[action.index].highlights.length <= 1
      ) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          work: {
            ...state.values.work,
            jobs: [
              ...state.values.work.jobs.slice(0, action.index),
              {
                ...state.values.work.jobs[action.index],
                highlights: state.values.work.jobs[
                  action.index
                ].highlights.slice(0, -1)
              }
            ]
          }
        }
      }
    }

    case 'ADD_SKILL': {
      return {
        ...state,
        values: {
          ...state.values,
          skills: {
            ...state.values.skills,
            skills: [
              ...state.values.skills.skills,
              {
                keywords: ['']
              }
            ]
          }
        }
      }
    }

    case 'REMOVE_SKILL': {
      if (state.values.skills.skills.length <= 1) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          skills: {
            ...state.values.skills,
            skills: state.values.skills.skills.slice(0, -1)
          }
        }
      }
    }

    case 'ADD_SKILL_KEYWORD': {
      return {
        ...state,
        values: {
          ...state.values,
          skills: {
            ...state.values.skills,
            skills: [
              ...state.values.skills.skills.slice(0, action.index),
              {
                ...state.values.skills.skills[action.index],
                keywords: [
                  ...state.values.skills.skills[action.index].keywords,
                  ''
                ]
              },
              ...state.values.skills.skills.slice(action.index + 1)
            ]
          }
        }
      }
    }

    case 'REMOVE_SKILL_KEYWORD': {
      if (
        !state.values.skills.skills[action.index] ||
        !state.values.skills.skills[action.index].keywords ||
        state.values.skills.skills[action.index].keywords.length <= 1
      ) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          skills: {
            ...state.values.skills,
            skills: [
              ...state.values.skills.skills.slice(0, action.index),
              {
                ...state.values.skills.skills[action.index],
                keywords: state.values.skills.skills[
                  action.index
                ].keywords.slice(0, -1)
              },
              ...state.values.skills.skills.slice(action.index + 1)
            ]
          }
        }
      }
    }

    case 'ADD_PROJECT': {
      return {
        ...state,
        values: {
          ...state.values,
          projects: {
            ...state.values.projects,
            projects: [
              ...state.values.projects.projects,
              {
                keywords: ['']
              }
            ]
          }
        }
      }
    }

    case 'REMOVE_PROJECT': {
      if (state.values.projects.projects.length <= 1) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          projects: {
            ...state.values.projects,
            projects: state.values.projects.projects.slice(0, -1)
          }
        }
      }
    }

    case 'ADD_PROJECT_KEYWORD': {
      return {
        ...state,
        values: {
          ...state.values,
          projects: {
            ...state.values.projects,
            projects: [
              ...state.values.projects.projects.slice(0, action.index),
              {
                ...state.values.projects.projects[action.index],
                keywords: [
                  ...state.values.projects.projects[action.index].keywords,
                  ''
                ]
              },
              ...state.values.projects.projects.slice(action.index + 1)
            ]
          }
        }
      }
    }

    case 'REMOVE_PROJECT_KEYWORD': {
      if (
        !state.values.projects.projects[action.index] ||
        !state.values.projects.projects[action.index].keywords ||
        state.values.projects.projects[action.index].keywords.length <= 1
      ) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          projects: {
            ...state.values.projects,
            projects: [
              ...state.values.projects.projects.slice(0, action.index),
              {
                ...state.values.projects.projects[action.index],
                keywords: state.values.projects.projects[
                  action.index
                ].keywords.slice(0, -1)
              },
              ...state.values.projects.projects.slice(action.index + 1)
            ]
          }
        }
      }
    }

    case 'ADD_AWARD': {
      return {
        ...state,
        values: {
          ...state.values,
          awards: {
            ...state.values.awards,
            awards: [...state.values.awards.awards, {}]
          }
        }
      }
    }

    case 'REMOVE_AWARD': {
      if (state.values.awards.awards.length <= 1) {
        return state
      }

      return {
        ...state,
        values: {
          ...state.values,
          awards: {
            ...state.values.awards,
            awards: state.values.awards.awards.slice(0, -1)
          }
        }
      }
    }

    default:
      return state
  }
}

export { form }
export default reducer.plugin({ resume: form })
