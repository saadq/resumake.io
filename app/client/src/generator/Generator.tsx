import React, { useState } from 'react'
import styled from 'styled-components'
import { Navigation } from './navigation/Navigation'
import { ResumeForm } from './resume-form/components/ResumeForm'
import { ResumePreview } from './resume-preview/components/ResumePreview'
import { SettingsMenu } from './settings/components/SettingsMenu'

const Page = styled.main`
  display: flex;
  height: 100%;
`

export function Generator() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  return (
    <Page>
      <Navigation />
      <ResumeForm />
      <ResumePreview setIsMenuOpen={setIsMenuOpen} />
      <SettingsMenu setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
    </Page>
  )
}
