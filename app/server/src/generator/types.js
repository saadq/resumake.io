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
  location?: string,
  position?: string,
  website?: string,
  startDate?: string,
  endDate?: string,
  summary?: string,
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

type Skill = {
  name?: string,
  level?: string,
  keywords?: Array<string>
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

type FormValues = {
  template: number,
  basics?: Basics,
  work?: Array<Job>,
  education?: Array<School>,
  skills?: Array<Skill>,
  projects?: Array<Project>,
  awards?: Array<Award>
}

export type { FormValues }
