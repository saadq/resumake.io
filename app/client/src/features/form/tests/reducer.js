/**
 * @flow
 */

import { form as reducer, initialState } from '../reducer'
import {
  uploadJSONRequest,
  uploadJSONSuccess,
  uploadJSONFailure,
  selectTemplate,
  addSchool,
  removeSchool,
  addJob,
  removeJob,
  addJobHighlight,
  removeJobHighlight,
  addSkill,
  removeSkill,
  addSkillKeyword,
  removeSkillKeyword,
  addProject,
  removeProject,
  addProjectKeyword,
  removeProjectKeyword,
  addAward,
  removeAward
} from '../actions'
import type { FormState as State } from '../types'

describe('form reducer', () => {
  it('can handle uploadJSONRequest', () => {
    const state: State = { ...initialState }
    const action = uploadJSONRequest()
    const expected: State = { ...state, jsonUpload: { status: 'pending' } }
    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can handle uploadJSONSuccess', () => {
    const json = { ...initialState.values, selectedTemplate: 2 }
    const state: State = { ...initialState }
    const action = uploadJSONSuccess(json)

    const expected: State = {
      jsonUpload: {
        status: 'success'
      },
      values: {
        ...state.values,
        ...json
      }
    }

    const actual: State = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can handle uploadJSONFailure', () => {
    const state: State = { ...initialState }
    const action = uploadJSONFailure('Invalid JSON!')

    const expected: State = {
      ...state,
      jsonUpload: {
        status: 'failure',
        errMessage: 'Invalid JSON!'
      }
    }

    const actual: State = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can select a template', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        selectedTemplate: 3
      }
    }

    const action = selectTemplate(2)

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        selectedTemplate: 2
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can add a school', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        education: []
      }
    }

    const action = addSchool()

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        education: [{}]
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can remove a school', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        education: [{ institution: 'Rutgers' }, { institution: 'MCC' }]
      }
    }

    const action = removeSchool()

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        education: [{ institution: 'Rutgers' }]
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can add a job', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        work: []
      }
    }

    const action = addJob()

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        work: [{ highlights: [''] }]
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can remove a job', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        work: [
          { company: 'Mozilla', highlights: [''] },
          { company: 'Codecademy', highlights: [''] }
        ]
      }
    }

    const action = removeJob()

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        work: [{ company: 'Mozilla', highlights: [''] }]
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can add a job highlight', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        work: [{ company: 'Mozilla', highlights: ['Did cool stuff'] }]
      }
    }

    const action = addJobHighlight(0)

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        work: [{ company: 'Mozilla', highlights: ['Did cool stuff', ''] }]
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can remove a job highlight', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        work: [
          {
            company: 'Mozilla',
            highlights: ['Did cool stuff', 'Did really cool stuff']
          }
        ]
      }
    }

    const action = removeJobHighlight(0)

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        work: [
          {
            company: 'Mozilla',
            highlights: ['Did cool stuff']
          }
        ]
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can add a skill', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        skills: []
      }
    }

    const action = addSkill()

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        skills: [{ keywords: [''] }]
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can remove a skill', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        skills: [
          { name: 'Languages', keywords: ['JavaScript', 'Java'] },
          { name: 'Frameworks', keywords: ['React', 'Redux'] }
        ]
      }
    }

    const action = removeSkill()

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        skills: [{ name: 'Languages', keywords: ['JavaScript', 'Java'] }]
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can add a skill keyword', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        skills: [
          { name: 'Languages', keywords: ['JavaScript', 'Java'] },
          { name: 'Frameworks', keywords: ['React', 'Redux'] }
        ]
      }
    }

    const action = addSkillKeyword(1)

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        skills: [
          { name: 'Languages', keywords: ['JavaScript', 'Java'] },
          { name: 'Frameworks', keywords: ['React', 'Redux', ''] }
        ]
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can remove a skill keyword', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        skills: [
          { name: 'Languages', keywords: ['JavaScript', 'Java'] },
          { name: 'Frameworks', keywords: ['React', 'Redux'] }
        ]
      }
    }

    const action = removeSkillKeyword(0)

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        skills: [
          { name: 'Languages', keywords: ['JavaScript'] },
          { name: 'Frameworks', keywords: ['React', 'Redux'] }
        ]
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can add a project', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        projects: [
          {
            name: 'resumake',
            description: 'Awesome resume generator',
            keywords: ['Node.js', 'Koa', 'React', 'Redux']
          }
        ]
      }
    }

    const action = addProject()

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        projects: [
          {
            name: 'resumake',
            description: 'Awesome resume generator',
            keywords: ['Node.js', 'Koa', 'React', 'Redux']
          },
          {
            keywords: ['']
          }
        ]
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can remove a project', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        projects: [
          {
            name: 'resumake',
            description: 'Awesome resume generator',
            keywords: ['Node.js', 'Koa', 'React', 'Redux']
          },
          {
            name: 'zencuber',
            description: 'Awesome cube timer',
            keywords: ['Node.js', 'Koa', 'React', 'Redux']
          }
        ]
      }
    }

    const action = removeProject()

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        projects: [
          {
            name: 'resumake',
            description: 'Awesome resume generator',
            keywords: ['Node.js', 'Koa', 'React', 'Redux']
          }
        ]
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can add a project keyword', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        projects: [
          {
            name: 'resumake',
            description: 'Awesome resume generator',
            keywords: ['Node.js', 'Koa', 'React', 'Redux']
          },
          {
            name: 'zencuber',
            description: 'Awesome cube timer',
            keywords: ['Node.js', 'Koa', 'React', 'Redux']
          }
        ]
      }
    }

    const action = addProjectKeyword(1)

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        projects: [
          {
            name: 'resumake',
            description: 'Awesome resume generator',
            keywords: ['Node.js', 'Koa', 'React', 'Redux']
          },
          {
            name: 'zencuber',
            description: 'Awesome cube timer',
            keywords: ['Node.js', 'Koa', 'React', 'Redux', '']
          }
        ]
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can remove a project keyword', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        projects: [
          {
            name: 'resumake',
            description: 'Awesome resume generator',
            keywords: ['Node.js', 'Koa', 'React', 'Redux']
          },
          {
            name: 'zencuber',
            description: 'Awesome cube timer',
            keywords: ['Node.js', 'Koa', 'React', 'Redux']
          }
        ]
      }
    }

    const action = removeProjectKeyword(0)

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        projects: [
          {
            name: 'resumake',
            description: 'Awesome resume generator',
            keywords: ['Node.js', 'Koa', 'React']
          },
          {
            name: 'zencuber',
            description: 'Awesome cube timer',
            keywords: ['Node.js', 'Koa', 'React', 'Redux']
          }
        ]
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can add an award', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        awards: []
      }
    }

    const action = addAward()

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        awards: [{}]
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })

  it('can remove an award', () => {
    const state: State = {
      ...initialState,
      values: {
        ...initialState.values,
        awards: [
          { title: 'Coolest dude ever' },
          { title: 'Best resume generator' }
        ]
      }
    }

    const action = removeAward()

    const expected: State = {
      ...initialState,
      values: {
        ...state.values,
        awards: [{ title: 'Coolest dude ever' }]
      }
    }

    const actual = reducer(state, action)
    expect(actual).toEqual(expected)
  })
})
