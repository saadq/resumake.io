import styled from 'styled-components'
import { Sidebar } from './sidebar/components/Sidebar'
import { Form } from './form/Form'
import { Preview } from './preview/components/Preview'
import { Templates } from './templates/components/Templates'
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
        <Form />
        <Preview />
        <Templates />
      </Sections>
      <Footer />
    </>
  )
}
