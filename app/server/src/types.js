/**
 * @flow
 */

type Section =
  | 'templates'
  | 'profile'
  | 'about'
  | 'education'
  | 'work'
  | 'skills'
  | 'projects'
  | 'awards'

type Headings = {
  about?: string,
  work?: string,
  education?: string,
  skills?: string,
  projects?: string,
  awards?: string
}

type Basics = {
  name?: string,
  summary?: string,
  email?: string,
  phone?: string,
  website?: string,
  location?: {
    address?: string
  }
}

type School = {
  institution?: string,
  location?: string,
  area?: string,
  studyType?: string,
  startDate?: string,
  endDate?: string,
  gpa?: string
}

type Job = {
  company?: string,
  location?: string,
  position?: string,
  website?: string,
  startDate?: string,
  endDate?: string,
  highlights: Array<string>
}

type Skill = {
  name?: string,
  keywords: Array<string>
}

type Project = {
  name?: string,
  description?: string,
  url?: string,
  keywords: Array<string>
}

type Award = {
  title?: string,
  date?: string,
  awarder?: string,
  summary?: string
}

type SanitizedValues = {
  sections: Array<Section>,
  selectedTemplate: number,
  headings?: Headings,
  basics?: Basics,
  work?: Array<Job>,
  education?: Array<School>,
  skills?: Array<Skill>,
  projects?: Array<Project>,
  awards?: Array<Award>
}

type Generator = {
  profileSection: (basics?: Basics) => string,
  aboutSection?: (basics?: Basics, heading?: string) => string,
  educationSection: (education?: Array<School>, heading?: string) => string,
  workSection: (work?: Array<Job>, heading?: string) => string,
  skillsSection: (skills?: Array<Skill>, heading?: string) => string,
  projectsSection: (projects?: Array<Project>, heading?: string) => string,
  awardsSection: (awards?: Array<Award>, heading?: string) => string
}

type LaTeXOpts = {
  cmd?: string,
  inputs?: string | Array<string>,
  fonts?: string | Array<string>,
  passes?: number,
  errorLogs?: string
}

type TemplateData = {
  texDoc: string,
  opts?: LaTeXOpts
}

export type { SanitizedValues, Generator, TemplateData }
