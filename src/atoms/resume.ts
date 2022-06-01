import { atom } from 'jotai'

export interface Resume {
  url: string
  isLoading: boolean
  isError: boolean
}

export const resumeAtom = atom({
  url: '',
  isLoading: false,
  isError: false
})

resumeAtom.debugLabel = 'resumeAtom'
