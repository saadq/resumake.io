/**
 * @flow
 */

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
import type { FormAction as Action } from '../types'

describe('actions', () => {
  it('can request json upload', () => {
    const expected: Action = { type: 'UPLOAD_JSON_REQUEST' }
    const actual: Action = uploadJSONRequest()
    expect(actual).toEqual(expected)
  })

  it('can succeed at json upload', () => {
    const json = {
      selectedTemplate: 1,
      headings: {
        work: '',
        education: '',
        skills: '',
        projects: '',
        awards: ''
      },
      basics: {
        name: 'Fake User',
        email: 'user@fake.com',
        phone: '555',
        website: '',
        location: {
          address: ''
        }
      },
      education: [
        {
          institution: '',
          location: '',
          area: '',
          studyType: '',
          startDate: '',
          endDate: '',
          gpa: ''
        }
      ],
      work: [
        {
          company: '',
          location: '',
          position: '',
          website: '',
          startDate: '',
          endDate: '',
          highlights: ['']
        }
      ],
      skills: [
        {
          name: '',
          level: '',
          keywords: ['']
        }
      ],
      projects: [
        {
          name: '',
          description: '',
          url: '',
          keywords: ['']
        }
      ],
      awards: [
        {
          title: '',
          date: '',
          awarder: '',
          summary: ''
        }
      ]
    }

    const expected: Action = { type: 'UPLOAD_JSON_SUCCESS', json }
    const actual: Action = uploadJSONSuccess(json)
    expect(actual).toEqual(expected)
  })

  it('can fail at json upload', () => {
    const expected: Action = {
      type: 'UPLOAD_JSON_FAILURE',
      errMessage: 'Invalid JSON'
    }
    const actual: Action = uploadJSONFailure('Invalid JSON')
    expect(actual).toEqual(expected)
  })

  it('can select a template', () => {
    const expected: Action = { type: 'SELECT_TEMPLATE', templateId: 3 }
    const actual: Action = selectTemplate(3)
    expect(actual).toEqual(expected)
  })

  it('can add a school', () => {
    const expected: Action = { type: 'ADD_SCHOOL' }
    const actual: Action = addSchool()
    expect(actual).toEqual(expected)
  })

  it('can remove a school', () => {
    const expected: Action = { type: 'REMOVE_SCHOOL' }
    const actual: Action = removeSchool()
    expect(actual).toEqual(expected)
  })

  it('can add a job', () => {
    const expected: Action = { type: 'ADD_JOB' }
    const actual: Action = addJob()
    expect(actual).toEqual(expected)
  })

  it('can remove a job', () => {
    const expected: Action = { type: 'REMOVE_JOB' }
    const actual: Action = removeJob()
    expect(actual).toEqual(expected)
  })

  it('can add a job highlight for a specified job', () => {
    const expected: Action = { type: 'ADD_JOB_HIGHLIGHT', index: 1 }
    const actual: Action = addJobHighlight(1)
    expect(actual).toEqual(expected)
  })

  it('can remove a job highlight for a specified job', () => {
    const expected: Action = { type: 'REMOVE_JOB_HIGHLIGHT', index: 1 }
    const actual: Action = removeJobHighlight(1)
    expect(actual).toEqual(expected)
  })

  it('can add a skill', () => {
    const expected: Action = { type: 'ADD_SKILL' }
    const actual: Action = addSkill()
    expect(actual).toEqual(expected)
  })

  it('can remove a skill', () => {
    const expected: Action = { type: 'REMOVE_SKILL' }
    const actual: Action = removeSkill()
    expect(actual).toEqual(expected)
  })

  it('can add a skill keyword for a specified skill', () => {
    const expected: Action = { type: 'ADD_SKILL_KEYWORD', index: 1 }
    const actual: Action = addSkillKeyword(1)
    expect(actual).toEqual(expected)
  })

  it('can remove a skill keyword for a specified skill', () => {
    const expected: Action = { type: 'REMOVE_SKILL_KEYWORD', index: 1 }
    const actual: Action = removeSkillKeyword(1)
    expect(actual).toEqual(expected)
  })

  it('can add a project', () => {
    const expected: Action = { type: 'ADD_PROJECT' }
    const actual: Action = addProject()
    expect(actual).toEqual(expected)
  })

  it('can remove a project', () => {
    const expected: Action = { type: 'REMOVE_PROJECT' }
    const actual: Action = removeProject()
    expect(actual).toEqual(expected)
  })

  it('can add a project keyword for a specified project', () => {
    const expected: Action = { type: 'ADD_PROJECT_KEYWORD', index: 1 }
    const actual: Action = addProjectKeyword(1)
    expect(actual).toEqual(expected)
  })

  it('can remove a project keyword for a specified project', () => {
    const expected: Action = { type: 'REMOVE_PROJECT_KEYWORD', index: 1 }
    const actual: Action = removeProjectKeyword(1)
    expect(actual).toEqual(expected)
  })

  it('can add an award', () => {
    const expected: Action = { type: 'ADD_AWARD' }
    const actual: Action = addAward()
    expect(actual).toEqual(expected)
  })

  it('can remove an award', () => {
    const expected: Action = { type: 'REMOVE_AWARD' }
    const actual: Action = removeAward()
    expect(actual).toEqual(expected)
  })
})
