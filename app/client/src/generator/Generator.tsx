import React from 'react'
import styled from 'styled-components'
import { SectionsSidebar } from './sections-sidebar/components/SectionsSidebar'
import { ResumeForm } from './resume-form/components/ResumeForm'
import { ResumePreview } from './resume-preview/components/ResumePreview'

const Page = styled.main`
  display: flex;
  height: 100%;
`

export function Generator() {
  return (
    <Page>
      <SectionsSidebar />
      <ResumeForm />
      <ResumePreview />
    </Page>
  )
}
