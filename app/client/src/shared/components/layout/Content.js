/**
 * @flow
 */

import React, { type Node } from 'react'
import styled from 'styled-components'

const Main = styled.main`
  margin-left: 130px;
  display: flex;
  flex-grow: 1;
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`

const Form = styled.form`
  width: 100%;
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
