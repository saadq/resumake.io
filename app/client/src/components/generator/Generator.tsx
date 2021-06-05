import styled from 'styled-components'
import { Sidebar } from './layout/Sidebar'
import { Header } from './layout/Header'
import { FloatingButton } from './layout/FloatingButton'
import { Form } from './form/Form'
import { ResumePreview } from './preview/Preview'
import { Templates } from './templates/Templates'
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
        <Form />
        <ResumePreview />
        <Templates />
      </Sections>
      <FloatingButton />
    </>
  )
}
