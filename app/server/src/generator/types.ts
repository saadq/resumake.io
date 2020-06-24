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

export type Template = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export interface Headings {
  work: string
  education: string
  skills: string
  projects: string
  awards: string
}

export interface Basics {
  name: string
  email: string
  phone: string
  website: string
  location: {
    address: string
  }
}

export interface School {
  institution: string
  location: string
  area: string
  studyType: string
  startDate: string
  endDate: string
  gpa: string
}

export interface Job {
  company: string
  location: string
  position: string
  website: string
  startDate: string
  endDate: string
  highlights: Array<string>
}

export interface Skill {
  name: string
  keywords: Array<string>
}

export interface Project {
  name: string
  description: string
  url: string
  keywords: Array<string>
}

export interface Award {
  title: string
  date: string
  awarder: string
  summary: string
}

export interface BulletsSubsection {
  topLeftText: string
  topRightText: string
  bottomLeftText: string
  bottomRightText: string
  bullets: Array<string>
}

export interface TableSubsection {
  category: string
  keywords: Array<string>
}

export interface ParagraphSubsection {
  topLeftText: string
  topRightText: string
  bottomLeftText: string
  bottomRightText: string
  paragraph: string
}

export interface FormValues {
  selectedTemplate: Template
  headings: Headings
  basics: Basics
  work: Array<Job>
  education: Array<School>
  skills: Array<Skill>
  projects: Array<Project>
  awards: Array<Award>
  sections: Array<Section>
  [customSection: string]: any
}

export interface TemplateGenerator {
  createTexDefinitions(): string
  createProfileSection(basics: Basics): string
  createWorkSection(jobs: Array<Job>, sectionName: string): string
  createEducationSection(schools: Array<School>, sectionName: string): string
  createSkillsSection(skills: Array<Skill>, sectionName: string): string
  createProjectsSection(projects: Array<Project>, sectionName: string): string
  createAwardsSection(awards: Array<Award>, sectionName: string): string
  createBulletsSection(
    section: Array<BulletsSubsection>,
    sectionName: string
  ): string
  createTableSection(
    section: Array<TableSubsection>,
    sectionName: string
  ): string
  createParagraphSection(
    section: Array<ParagraphSubsection>,
    sectionName: string
  ): string
}
