import { useAtomDevtools } from 'jotai/devtools'
import { formAtom } from '../atoms/form'
import { resumeAtom } from '../atoms/resume'

export const useDevtools = import.meta.env.DEV
  ? () => {
      useAtomDevtools(formAtom, 'form')
      useAtomDevtools(resumeAtom, 'resume')
    }
  : () => {}
