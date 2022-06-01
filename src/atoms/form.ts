import { atom } from 'jotai'
import { FormValues } from '../types/form'

export const formAtom = atom<FormValues>({
  basics: {
    fullName: '',
    email: '',
    phoneNumber: '',
    location: {
      address: ''
    },
    profiles: [{}]
  },
  work: [
    {
      name: '',
      position: '',
      startDate: '',
      endDate: '',
      summary: '',
      highlights: ['']
    }
  ],
  skills: [
    {
      name: '',
      keywords: ['']
    }
  ],
  education: [
    {
      institution: '',
      area: '',
      studyType: '',
      gpa: '',
      startDate: '',
      endDate: ''
    }
  ],
  projects: [
    {
      name: '',
      description: '',
      url: '',
      keywords: [''],
      highlights: [''],
      startDate: '',
      endDate: ''
    }
  ],
  awards: [
    {
      title: '',
      awarder: '',
      date: '',
      summary: ''
    }
  ],
  volunteer: [
    {
      organization: '',
      position: '',
      summary: '',
      highlights: [''],
      startDate: '',
      endDate: ''
    }
  ],
  publications: [
    {
      name: '',
      publisher: '',
      url: ''
    }
  ]
})

formAtom.debugLabel = 'formAtom'
