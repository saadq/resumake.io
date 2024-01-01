export type Location = {
  address?: string
  postalCode?: string
  city?: string
  countryCode?: string
  region?: string
}

export type Profile = {
  url?: string
}

export type Basics = {
  name?: string
  email?: string
  phone?: string
  location?: Location
  profiles?: Profile[] // TODO: revisit how profiles gets rendered

  // non-standard attribute
  website?: string
}

export type Work = {
  name?: string
  // non-standard attribute
  company?: string

  position?: string
  startDate?: string
  endDate?: string
  summary?: string
  highlights: string[]

  // non-standard attribute
  location?: string
}

export type Volunteer = {
  organization?: string
  position?: string
  startDate?: string
  endDate?: string
  summary?: string
  highlights?: string[]
}

export type Education = {
  institution?: string
  area?: string
  studyType?: string
  startDate?: string
  endDate?: string
  score?: string

  // non-standard attribute
  location?: string
}

export type Award = {
  title?: string
  date?: string
  awarder?: string
  summary?: string
}

export type Publication = {
  name?: string
  publisher?: string
  releaseDate?: string
  url?: string
  summary?: string
}

export type Skill = {
  name?: string
  level?: string
  keywords?: string[]
}

export type Project = {
  name?: string
  description?: string
  highlights?: string[]
  keywords?: string[]
  url?: string
  startDate?: string
  endDate?: string
}

// Based on the [JSON Resume](http://jsonresume.org/) standard with extensions
// added as needed
export type Resume = {
  basics?: Basics
  work?: Work[]
  volunteer?: Volunteer[]
  education?: Education[]
  awards?: Award[]
  publications?: Publication[]
  skills?: Skill[]
  projects?: Project[]
}

export type FormValues = Resume & {
  headings: { [K in keyof Resume]?: string }
  sections: (
    | 'profile'
    | 'education'
    | 'work'
    | 'skills'
    | 'projects'
    | 'awards'
  )[]
  selectedTemplate: number
}

export interface FormState {
  isGenerating: boolean
}

export type Generator = {
  resumeHeader: () => string
  profileSection: (basics?: Basics) => string
  educationSection: (education?: Array<Education>, heading?: string) => string
  workSection: (work?: Array<Work>, heading?: string) => string
  skillsSection: (skills?: Array<Skill>, heading?: string) => string
  projectsSection: (projects?: Array<Project>, heading?: string) => string
  awardsSection: (awards?: Array<Award>, heading?: string) => string
}

export type LaTeXOpts = {
  cmd: 'pdflatex' | 'xelatex'
  inputs?: string[]
  fonts?: string[]
}

export type TemplateData = {
  texDoc: string
  opts: LaTeXOpts
}
