interface Basics {
  fullName?: string
  email?: string
  phoneNumber?: string
  location?: string
  link?: string
}

interface School {
  name?: string
  degree?: string
  major?: string
  startDate?: string
  endDate?: string
}

export interface FormValues {
  basics: Basics
  education: School[]
}

export interface FormState {}
