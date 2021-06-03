import styled from 'styled-components'
import { Sidebar } from './Sidebar'
import { ResumeForm } from './ResumeForm'
import { ResumePreview } from './ResumePreview'
import { ResumeTemplates } from './ResumeTemplates'
import { Header } from './Header'
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
    </>
  )
}
