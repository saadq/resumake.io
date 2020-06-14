import { useFormValues } from './useFormValues'
import { Section } from '../types/sections'

export function useSectionInfo(sectionName: string): [Section, number] {
  const { sections } = useFormValues()

  const sectionInfo = sections.find((section) => section.name === sectionName)

  const sectionInfoIndex = sections.findIndex(
    (section) => section.name === sectionName
  )

  return [sectionInfo as Section, sectionInfoIndex]
}
