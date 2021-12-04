import styled from 'styled-components'
import { Sidebar } from './layout/Sidebar'
import { Header } from './layout/Header'
import { Form } from './form/Form'
import { Preview } from './preview/Preview'
import { Templates } from './templates/Templates'
import { sizes } from '../../theme'
import { Footer } from './layout/Footer'

const Sections = styled.div`
  display: flex;
  position: relative;
  top: ${sizes.header.height};
  left: ${sizes.sidebar.width};
  width: ${sizes.header.width};
  height: calc(100vh - ${sizes.header.height});
  overflow: hidden;
`

export function Generator() {
  return (
    <>
      <Sidebar />
      <Header />
      <Sections>
        <Form />
        <Preview />
        <Templates />
      </Sections>
      <Footer />
    </>
  )
}
