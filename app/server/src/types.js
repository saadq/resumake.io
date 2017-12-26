/**
 * @flow
 */

type Basics = {
  name?: string,
  email?: string,
  phone?: string,
  website?: string,
  location?: {
    address?: string
  }
}

type Job = {
  company?: string,
  location?: string,
  position?: string,
  website?: string,
  startDate?: string,
  endDate?: string,
  highlights?: Array<string>
}

type School = {
  institution?: string,
  location?: string,
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

type SanitizedValues = {
  selectedTemplate: number,
  basics?: Basics,
  work?: Array<Job>,
  education?: Array<School>,
  awards?: Array<Award>,
  skills?: Array<Skill>,
  projects?: Array<Project>
}

export type { SanitizedValues }
