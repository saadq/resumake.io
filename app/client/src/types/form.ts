interface Profile {
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
  link?: string
}

interface School {
  institution?: string
  studyType?: string
  area?: string
  gpa?: string
  startDate?: string
  endDate?: string
}

interface Job {
  name?: string
  location?: string
  position?: string
  startDate?: string
  endDate?: string
  summary?: string
  highlights: string[]
}

interface Skill {
  name?: string
  level?: string
  keywords?: string[]
}

interface Project {
  name?: string
  description?: string
  highlights?: string[]
  keywords?: string[]
  url?: string
  startDate?: string
  endDate?: string
}

interface Award {
  title?: string
  date?: string
  awarder?: string
  summary?: string
}

interface VolunteerExperience {
  organization?: string
  position?: string
  startDate?: string
  endDate?: string
  summary?: string
  highlights?: string[]
}

interface Publication {
  name?: string
  publisher?: string
  releaseDate?: string
  url?: string
  summary?: string
}

export interface FormValues {
  basics: Profile
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
