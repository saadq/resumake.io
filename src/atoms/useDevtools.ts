import { useAtomDevtools } from 'jotai/devtools'
import { formAtom } from './form'
import { resumeAtom } from './resume'
import { progressAtom } from './progress'

export const useDevtools =
  process.env.NODE_ENV === 'development'
    ? () => {
        useAtomDevtools(formAtom, { name: 'form' })
        useAtomDevtools(resumeAtom, { name: 'resume' })
        useAtomDevtools(progressAtom, { name: 'progress' })
      }
    : () => {}
