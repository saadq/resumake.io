export type DefaultSectionNames =
  | 'profile'
  | 'education'
  | 'work'
  | 'skills'
  | 'projects'
  | 'awards'

export type CustomSectionTypes = 'bullets' | 'table' | 'paragraph'

export interface CustomSectionType {
  type: CustomSectionTypes
}

export interface BulletsSection extends CustomSectionType {
  type: 'bullets'
  name: string
  displayName: string
}

export interface TableSection extends CustomSectionType {
  type: 'table'
  name: string
  displayName: string
}

export interface ParagraphSection extends CustomSectionType {
  type: 'paragraph'
  name: string
  displayName: string
}

export interface DefaultSection {
  type: 'default'
  name: DefaultSectionNames
  displayName: string
}

export type CustomSection = BulletsSection | TableSection | ParagraphSection

export type Section = DefaultSection | CustomSection
