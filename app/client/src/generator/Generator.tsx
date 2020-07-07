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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const openSettings = () => {
    setIsSettingsOpen(true)
  }

  const closeSettings = () => {
    setIsSettingsOpen(false)
  }

  return (
    <Page>
      <Navigation />
      <ResumeForm />
      <ResumePreview
        openSettings={openSettings}
        closeSettings={closeSettings}
      />
      <SettingsMenu
        isSettingsOpen={isSettingsOpen}
        closeSettings={closeSettings}
      />
    </Page>
  )
}
