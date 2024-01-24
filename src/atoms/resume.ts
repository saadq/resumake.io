import { atom } from 'jotai'

export interface Resume {
  url: string
  json: object
  latex: string
  isLoading: boolean
  isError: boolean
}

export const resumeAtom = atom({
  url: '',
  json: {},
  latex: '',
  isLoading: false,
  isError: false
})

resumeAtom.debugLabel = 'resumeAtom'
