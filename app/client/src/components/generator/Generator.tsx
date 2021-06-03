import styled from 'styled-components'
import { Sidebar } from './layout/Sidebar'
import { Header } from './layout/Header'
import { FloatingButton } from './layout/FloatingButton'
import { ResumeForm } from './form/ResumeForm'
import { ResumePreview } from './preview/ResumePreview'
import { ResumeTemplates } from './templates/ResumeTemplates'
import { sizes } from '../../theme'

const Sections = styled.div`
  display: flex;
  position: relative;
  top: ${sizes.header.height};
  left: ${sizes.sidebar.width};
  width: ${sizes.header.width};
  height: calc(100vh - ${sizes.header.height});
`

export function Generator() {
  return (
    <>
      <Sidebar />
      <Header />
      <Sections>
        <ResumeForm />
        <ResumePreview />
        <ResumeTemplates />
      </Sections>
      <FloatingButton />
    </>
  )
}
