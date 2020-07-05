import React from 'react'
import styled from 'styled-components'
import { Navigation } from './navigation/Navigation'
import { ResumeForm } from './resume-form/components/ResumeForm'
import { ResumePreview } from './resume-preview/components/ResumePreview'

const Page = styled.main`
  display: flex;
  height: 100%;
`

export function Generator() {
  return (
    <Page>
      <Navigation />
      <ResumeForm />
      <ResumePreview />
    </Page>
  )
}
