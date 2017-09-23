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
  top: calc(${header.height} + 25px);
  left: ${sideNav.width};
  width: 80vw;
  @media screen and (max-width: 768px) {
    display: block;
    margin: 0 auto;
    left: initial;
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
