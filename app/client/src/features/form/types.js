/**
 * @flow
 */

type Basics = {
  name?: string,
  email?: string,
  phone?: string,
  website?: string,
  summary?: string,
  location?: {
    address?: string
  }
}

type Job = {
  company?: string,
  position?: string,
  website?: string,
  startDate?: string,
  endDate?: string,
  summary?: string,
  highlights?: Array<string>
}

type School = {
  institution?: string,
  area?: string,
  studyType?: string,
  startDate?: string,
  endDate?: string,
  gpa?: string,
  courses?: Array<string>
}

type Project = {
  name?: string,
  description?: string,
  url?: string,
  keywords?: Array<string>
}

type Award = {
  title?: string,
  date?: string,
  awarder?: string,
  summary?: string
}

type Skill = {
  name?: string,
  level?: string,
  keywords?: Array<string>
}

type FormValues = {
  basics?: Basics,
  work?: Array<Job>,
  education?: Array<School>,
  awards?: Array<Award>,
  skills?: Array<Skill>,
  projects: Array<Project>
}

type FormState = {
  values?: FormValues,
  schoolCount: number,
  jobCount: number,
  skillCount: number,
  projectCount: number,
  awardCount: number
}

type FormAction =
  | { type: 'ADD_SCHOOL' }
  | { type: 'REMOVE_SCHOOL' }
  | { type: 'CLEAR_SCHOOL_FIELD' }
  | { type: 'CLEAR_JOB_FIELD', jobCount: number }
  | { type: 'CLEAR_JOB_DUTY_FIELD', index: number, jobDutyCount: number }
  | { type: 'CLEAR_PROJECT_FIELD', projectCount: number }
  | { type: 'CLEAR_SKILL_FIELD', skillCount: number }
  | { type: 'CLEAR_AWARD_FIELD', awardCount: number }

export type { FormState, FormAction, FormValues }
