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
    address?: string,
    postalCode?: string,
    city?: string,
    countryCode?: string,
    region?: string
  }
}

type Work = {
  company?: string,
  position?: string,
  website?: string,
  startDate?: string,
  endDate?: string,
  summary?: string,
  highlights?: Array<string>
}

type School = {
  institution?: string,
  area?: string,
  studyType?: string,
  startDate?: string,
  endDate?: string,
  gpa?: string,
  courses?: Array<string>
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

type FormState = {
  basics?: Basics,
  work?: Array<Work>,
  education?: Array<School>,
  awards?: Array<Award>,
  skills?: Array<Skill>
}

export type { FormState }
