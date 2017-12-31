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

type School = {
  institution?: string,
  location?: string,
  area?: string,
  studyType?: string,
  startDate?: string,
  endDate?: string,
  gpa?: string
}

type Education = {
  schools?: Array<School>,
  heading?: string
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

type Work = {
  jobs?: Array<Job>,
  heading?: string
}

type Skill = {
  name?: string,
  level?: string,
  keywords: Array<string>
}

type Skills = {
  skills?: Array<Skill>,
  heading?: string
}

type Project = {
  name?: string,
  description?: string,
  url?: string,
  keywords: Array<string>
}

type Projects = {
  projects?: Array<Project>,
  heading?: string
}

type Award = {
  title?: string,
  date?: string,
  awarder?: string,
  summary?: string
}

type Awards = {
  awards?: Array<Award>,
  heading?: string
}

type Section =
  | 'templates'
  | 'profile'
  | 'education'
  | 'work'
  | 'skills'
  | 'projects'
  | 'awards'
  | 'preview'

type SanitizedValues = {
  orderedSections: Array<Section>,
  selectedTemplate: number,
  basics: Basics,
  work: Work,
  education: Education,
  skills: Skills,
  projects: Projects,
  awards: Awards
}

type Generator = {
  profileSection: (basics: Basics) => string,
  educationSection: (education: Education) => string,
  workSection: (work: Work) => string,
  skillsSection: (skills: Skills) => string,
  projectsSection: (projects: Projects) => string,
  awardsSection: (awards: Awards) => string
}

export type { SanitizedValues, Generator }
