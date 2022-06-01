import { useAtomDevtools } from 'jotai/devtools'
import { formAtom } from '../atoms/form'
import { resumeAtom } from '../atoms/resume'
import { progressAtom } from '../atoms/progress'

export const useDevtools =
  process.env.NODE_ENV === 'development'
    ? () => {
        useAtomDevtools(formAtom, { name: 'form' })
        useAtomDevtools(resumeAtom, { name: 'resume' })
        useAtomDevtools(progressAtom, { name: 'progress' })
      }
    : () => {}
