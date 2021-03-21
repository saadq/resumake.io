import styled from 'styled-components'
import { Sidebar } from './sidebar/Sidebar'
import { Form } from './form/Form'

export const Page = styled.div`
  display: flex;
`

export function Generator() {
  return (
    <Page>
      <Sidebar />
      <Form />
    </Page>
  )
}
