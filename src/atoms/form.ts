import { atom } from 'jotai'
import { FormValues } from '../types'

export const formAtom = atom<FormValues>({
  headings: {},
  sections: [],
  selectedTemplate: 1
})

formAtom.debugLabel = 'formAtom'
