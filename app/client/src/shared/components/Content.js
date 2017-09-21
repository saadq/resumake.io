/**
 * @flow
 */

import React, { type Node } from 'react'
import styled from 'styled-components'
import Form from '../../features/form/Form'
import { sideNav, header } from '../../shared/styles'

const Main = styled.main`
  position: relative;
  padding: 0;
  margin-left: ${sideNav.width};
  @media screen and (max-width: 768px) {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: ${header.height};
  }
`

type Props = {
  children: Node
}

function Content({ children }: Props) {
  return (
    <Main>
      <Form>{children}</Form>
    </Main>
  )
}

export default Content
