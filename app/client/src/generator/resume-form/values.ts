import { FormValues } from './types'

export const emptyHeadings = {
  work: '',
  education: '',
  skills: '',
  projects: '',
  awards: ''
}

export const emptyProfile = {
  name: '',
  email: '',
  phone: '',
  website: '',
  location: {
    address: ''
  }
}

export const emptySchool = {
  institution: '',
  location: '',
  area: '',
  studyType: '',
  startDate: '',
  endDate: '',
  gpa: ''
}

export const emptyJob = {
  company: '',
  location: '',
  position: '',
  website: '',
  startDate: '',
  endDate: '',
  highlights: ['', '', '']
}

export const emptySkill = {
  name: '',
  keywords: ['', '', '']
}

export const emptyProject = {
  name: '',
  description: '',
  url: '',
  keywords: ['']
}

export const emptyAward = {
  title: '',
  date: '',
  awarder: '',
  summary: ''
}

export const defaultFormValues: FormValues = {
  selectedTemplate: 1,
  headings: emptyHeadings,
  basics: emptyProfile,
  education: [emptySchool],
  work: [emptyJob],
  skills: [emptySkill],
  projects: [emptyProject],
  awards: [emptyAward]
}
