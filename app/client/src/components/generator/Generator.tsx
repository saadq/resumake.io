import styled from 'styled-components'
import { Sidebar } from './Sidebar'
import { Form } from './Form'
import { Preview } from './Preview'
import { Templates } from './Templates'
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
        <Form />
        <Preview />
        <Templates />
      </Sections>
    </>
  )
}
