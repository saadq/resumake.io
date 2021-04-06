import styled from 'styled-components'
import { Sidebar } from './sidebar/components/SidebarSection'
import { ResumeForm } from './resume-form/components/ResumeForm'
import { ResumePreview } from './resume-preview/components/ResumePreview'
import { ResumeTemplates } from './resume-templates/components/ResumeTemplates'
import { Footer } from './footer/components/Footer'
import { sizes } from '../common/theme'

const Sections = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: ${sizes.sidebar.width};
`

export function Generator() {
  return (
    <>
      <Sidebar />
      <Sections>
        <ResumeForm />
        <ResumePreview />
        <ResumeTemplates />
      </Sections>
      <Footer />
    </>
  )
}
