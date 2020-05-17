import { FormState as ReduxFormState } from 'redux-form'

export type Template = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface Headings {
  work: string
  education: string
  skills: string
  projects: string
  awards: string
}

export interface Basics {
  name: string
  email: string
  phone: string
  website: string
  location: {
    address: string
  }
}

export interface School {
  institution: string
  location: string
  area: string
  studyType: string
  startDate: string
  endDate: string
  gpa: string
}

export interface Job {
  company: string
  location: string
  position: string
  website: string
  startDate: string
  endDate: string
  highlights: Array<string>
}

export interface Skill {
  name: string
  keywords: Array<string>
}

export interface Project {
  name: string
  description: string
  url: string
  keywords: Array<string>
}

export interface Award {
  title: string
  date: string
  awarder: string
  summary: string
}

export interface FormValues {
  selectedTemplate: Template
  headings: Headings
  basics: Basics
  work: Array<Job>
  education: Array<School>
  skills: Array<Skill>
  projects: Array<Project>
  awards: Array<Award>
}

export interface FormStateWithValues extends ReduxFormState {
  values: FormValues
}

export interface FormState {
  resume: FormStateWithValues
}
