import React from 'react'
import styled from 'styled-components'
import { SectionsSidebar } from './sections-sidebar/components/SectionsSidebar'
import { ResumeForm } from './resume-form/components/ResumeForm'
import { ResumePreview } from './resume-preview/components/ResumePreview'
import { TemplateSwitcher } from './template-switcher/components/TemplateSwitcher'

const Page = styled.main`
  display: flex;
`

export function Generator() {
  return (
    <Page>
      <SectionsSidebar />
      <ResumeForm />
      <ResumePreview />
      <TemplateSwitcher />
    </Page>
  )
}
