/**
 * @flow
 */

import React, { type Node } from 'react'
import styled from 'styled-components'
import Form from '../../features/form/Form'
import { sizes } from '../../shared/theme'

const Main = styled.main`
  flex: 1;
  padding: 0;
  margin-top: calc(${sizes.header} + 40px);
  margin-left: ${sizes.sideNav};
  width: calc(100% - ${sizes.sideNav});

  @media screen and (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
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
