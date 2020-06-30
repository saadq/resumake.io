import { Section } from './types/sections'
import {
  FormValues,
  Basics,
  School,
  Job,
  Project,
  Skill,
  Award,
  BulletsSubsection,
  TableSubsection,
  ParagraphSubsection
} from './types/form'

export const emptyBasics: Basics = {
  name: '',
  email: '',
  phone: '',
  website: '',
  location: {
    address: ''
  }
}

export const emptySchool: School = {
  institution: '',
  location: '',
  area: '',
  studyType: '',
  startDate: '',
  endDate: '',
  gpa: ''
}

export const emptyJob: Job = {
  company: '',
  location: '',
  position: '',
  website: '',
  startDate: '',
  endDate: '',
  highlights: ['', '', '']
}

export const emptySkill: Skill = {
  name: '',
  keywords: ['', '', '']
}

export const emptyProject: Project = {
  name: '',
  description: '',
  url: '',
  keywords: ['', '', '']
}

export const emptyAward: Award = {
  title: '',
  date: '',
  awarder: '',
  summary: ''
}

export const emptyBulletsSubsection: BulletsSubsection = {
  topLeftText: '',
  topRightText: '',
  bottomLeftText: '',
  bottomRightText: '',
  bullets: ['', '', '']
}

export const emptyTableSubsection: TableSubsection = {
  name: '',
  keywords: ['', '', '']
}

export const emptyParagraphSubsection: ParagraphSubsection = {
  topLeftText: '',
  topRightText: '',
  bottomLeftText: '',
  bottomRightText: '',
  paragraph: ''
}

export const defaultSections: Array<Section> = [
  { name: 'basics', displayName: 'Profile', type: 'default' },
  { name: 'education', displayName: 'Education', type: 'default' },
  { name: 'work', displayName: 'Work', type: 'default' },
  { name: 'skills', displayName: 'Skills', type: 'default' },
  { name: 'projects', displayName: 'Projects', type: 'default' },
  { name: 'awards', displayName: 'Awards', type: 'default' }
]

export const defaultFormValues: FormValues = {
  selectedTemplate: 1,
  basics: emptyBasics,
  education: [emptySchool],
  work: [emptyJob],
  skills: [emptySkill],
  projects: [emptyProject],
  awards: [emptyAward],
  sections: [...defaultSections]
}
