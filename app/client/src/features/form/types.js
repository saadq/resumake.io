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
  jobHighlights: Array<number>,
  skillCount: number,
  skillKeywords: Array<number>,
  projectCount: number,
  projectKeywords: Array<number>,
  awardCount: number
}

type FormAction =
  | { type: 'ADD_SCHOOL' }
  | { type: 'REMOVE_SCHOOL' }
  | { type: 'CLEAR_SCHOOL_FIELD' }
  | { type: 'ADD_JOB' }
  | { type: 'REMOVE_JOB' }
  | { type: 'CLEAR_JOB_FIELD', jobCount: number }
  | { type: 'ADD_JOB_HIGHLIGHT', index: number }
  | { type: 'REMOVE_JOB_HIGHLIGHT', index: number }
  | { type: 'CLEAR_JOB_HIGHLIGHT_FIELD', index: number, highlightCount: number }
  | { type: 'ADD_SKILL' }
  | { type: 'REMOVE_SKILL' }
  | { type: 'CLEAR_SKILL_FIELD', skillCount: number }
  | { type: 'ADD_SKILL_KEYWORD', index: number }
  | { type: 'REMOVE_SKILL_KEYWORD', index: number }
  | { type: 'CLEAR_SKILL_KEYWORD_FIELD', index: number, keywordCount: number }
  | { type: 'ADD_PROJECT' }
  | { type: 'REMOVE_PROJECT' }
  | { type: 'CLEAR_PROJECT_FIELD', skillCount: number }
  | { type: 'ADD_PROJECT_KEYWORD', index: number }
  | { type: 'REMOVE_PROJECT_KEYWORD', index: number }
  | { type: 'CLEAR_PROJECT_KEYWORD_FIELD', index: number, keywordCount: number }

export type { FormState, FormAction, FormValues }
