import { atom } from 'jotai'

export type SectionName =
  | 'basics'
  | 'education'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'awards'

export interface Progress {
  currSection: SectionName
}

export const progressAtom = atom({
  currSection: 'basics'
})

progressAtom.debugLabel = 'formAtom'
