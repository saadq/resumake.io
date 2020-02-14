/**
 * @flow
 */

import type { Section } from '../../common/types'

type Headings = {
  work: string,
  education: string,
  skills: string,
  projects: string,
  awards: string
}

type Basics = {
  name?: ?string,
  email?: ?string,
  phone?: ?string,
  website?: ?string,
  location?: {
    address?: ?string
  }
}

type School = {
  institution?: ?string,
  location?: ?string,
  area?: ?string,
  studyType?: ?string,
  startDate?: ?string,
  endDate?: ?string,
  gpa?: ?string
}

type Job = {
  company?: ?string,
  location?: ?string,
  position?: ?string,
  website?: ?string,
  startDate?: ?string,
  endDate?: ?string,
  highlights: Array<?string>
}

type Skill = {
  name?: ?string,
  keywords: Array<?string>
}

type Project = {
  name?: ?string,
  description?: ?string,
  url?: ?string,
  keywords: Array<?string>
}

type Award = {
  title?: ?string,
  date?: ?string,
  awarder?: ?string,
  summary?: ?string
}

type FormValues = {
  selectedTemplate: number,
  headings: Headings,
  basics: Basics,
  work: Array<Job>,
  education: Array<School>,
  skills: Array<Skill>,
  projects: Array<Project>,
  awards: Array<Award>
}

type FormValuesWithSectionOrder = FormValues & {
  sections: Array<Section>
}

type FormState = {
  jsonUpload: {
    status?: 'pending' | 'success' | 'failure',
    errMessage?: string
  },
  values: FormValues,
  anyTouched?: boolean,
  registeredFields?: Object,
  fields?: Object
}

type FormAction =
  | { type: 'UPLOAD_JSON_REQUEST' }
  | { type: 'UPLOAD_JSON_SUCCESS', json: FormValues }
  | { type: 'UPLOAD_JSON_FAILURE', errMessage: string }
  | { type: 'SELECT_TEMPLATE', templateId: number }
  | { type: 'ADD_SCHOOL' }
  | { type: 'REMOVE_SCHOOL' }
  | { type: 'ADD_PROFILE_SUMMARY', index: number }
  | { type: 'REMOVE_PROFILE_SUMMARY', index: number }
  | { type: 'ADD_JOB' }
  | { type: 'REMOVE_JOB' }
  | { type: 'ADD_JOB_HIGHLIGHT', index: number }
  | { type: 'REMOVE_JOB_HIGHLIGHT', index: number }
  | { type: 'ADD_SKILL' }
  | { type: 'REMOVE_SKILL' }
  | { type: 'ADD_SKILL_KEYWORD', index: number }
  | { type: 'REMOVE_SKILL_KEYWORD', index: number }
  | { type: 'ADD_PROJECT' }
  | { type: 'REMOVE_PROJECT' }
  | { type: 'ADD_PROJECT_KEYWORD', index: number }
  | { type: 'REMOVE_PROJECT_KEYWORD', index: number }
  | { type: 'ADD_AWARD' }
  | { type: 'REMOVE_AWARD' }

export type { FormState, FormAction, FormValues, FormValuesWithSectionOrder }
