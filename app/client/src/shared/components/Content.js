/**
 * @flow
 */

import React, { type Node } from 'react'
import styled from 'styled-components'
import Form from '../../features/form/Form'

const Main = styled.main`
  margin-left: 115px;
  display: flex;
  flex-grow: 1;
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`

type Props = {
  children: Node
}

function Content({ children }: Props) {
  return (
    <Main>
      <Form>
        {children}
      </Form>
    </Main>
  )
}

export default Content
