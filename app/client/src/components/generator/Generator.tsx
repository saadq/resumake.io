import styled from 'styled-components'
import { Sidebar } from './Sidebar'
import { ResumeForm } from './ResumeForm'
import { ResumePreview } from './ResumePreview'
import { ResumeTemplates } from './ResumeTemplates'
import { sizes } from '../../theme'

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
    </>
  )
}
