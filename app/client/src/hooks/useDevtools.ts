import { useAtomDevtools } from 'jotai/devtools'
import { formAtom } from '../atoms/form'

export const useDevtools = import.meta.env.DEV
  ? () => {
      useAtomDevtools(formAtom, 'form')
    }
  : () => {}
