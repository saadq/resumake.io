/**
 * @flow
 */

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

type Education = {
  schools: Array<School>,
  heading?: ?string
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

type Work = {
  jobs: Array<Job>,
  heading?: ?string
}

type Skill = {
  name?: ?string,
  level?: ?string,
  keywords: Array<?string>
}

type Skills = {
  skills: Array<Skill>,
  heading?: ?string
}

type Project = {
  name?: ?string,
  description?: ?string,
  url?: ?string,
  keywords: Array<?string>
}

type Projects = {
  projects: Array<Project>,
  heading?: ?string
}

type Award = {
  title?: ?string,
  date?: ?string,
  awarder?: ?string,
  summary?: ?string
}

type Awards = {
  awards: Array<Award>,
  heading?: ?string
}

type FormValues = {
  selectedTemplate: number,
  basics: Basics,
  work: Work,
  education: Education,
  skills: Skills,
  projects: Projects,
  awards: Awards
}

type FormState = {
  isUploading: boolean,
  values: FormValues,
  anyTouched?: boolean,
  registeredFields?: Object,
  fields?: Object
}

type FormAction =
  | { type: 'UPLOAD_JSON_REQUEST' }
  | { type: 'UPLOAD_JSON_SUCCESS', json: FormValues }
  | { type: 'UPLOAD_JSON_FAILURE' }
  | { type: 'SELECT_TEMPLATE', templateId: number }
  | { type: 'ADD_SCHOOL' }
  | { type: 'REMOVE_SCHOOL' }
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

export type {
  FormState,
  FormAction,
  FormValues,
  Education,
  Work,
  Skills,
  Projects,
  Awards
}
