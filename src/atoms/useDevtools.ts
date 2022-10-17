import { useAtomDevtools } from 'jotai/devtools'
import { resumeAtom } from './resume'
import { progressAtom } from './progress'

export const useDevtools =
  process.env.NODE_ENV === 'development'
    ? () => {
        useAtomDevtools(resumeAtom, { name: 'resume' })
        useAtomDevtools(progressAtom, { name: 'progress' })
      }
    : () => {}
