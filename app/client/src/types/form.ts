export interface Basics {
  fullName?: string
  email?: string
  phoneNumber?: string
  location?: {
    address?: string
    postalCode?: string
    city?: string
    countryCode?: string
    region?: string
  }
  profiles?: ProfileLink[]
}

export interface ProfileLink {
  url?: string
}

export interface School {
  institution?: string
  studyType?: string
  area?: string
  gpa?: string
  startDate?: string
  endDate?: string
}

export interface Job {
  name?: string
  location?: string
  position?: string
  startDate?: string
  endDate?: string
  summary?: string
  highlights: string[]
}

export interface Skill {
  name?: string
  level?: string
  keywords?: string[]
}

export interface Project {
  name?: string
  description?: string
  highlights?: string[]
  keywords?: string[]
  url?: string
  startDate?: string
  endDate?: string
}

export interface Award {
  title?: string
  date?: string
  awarder?: string
  summary?: string
}

export interface VolunteerExperience {
  organization?: string
  position?: string
  startDate?: string
  endDate?: string
  summary?: string
  highlights?: string[]
}

export interface Publication {
  name?: string
  publisher?: string
  releaseDate?: string
  url?: string
  summary?: string
}

export interface FormValues {
  basics: Basics
  education: School[]
  work: Job[]
  skills: Skill[]
  projects: Project[]
  awards: Award[]
  volunteer: VolunteerExperience[]
  publications: Publication[]
}

export interface FormState {
  isGenerating: boolean
}
