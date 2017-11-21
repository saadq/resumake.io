/**
 * @flow
 */

import React, { type Node } from 'react'
import styled from 'styled-components'
import { sizes } from '../../theme'

const Main = styled.main`
  flex: 1;
  padding: 0;
  margin-top: calc(${sizes.header} + 30px);
  margin-left: ${sizes.sideNav};
  width: calc(80% - ${sizes.sideNav});

  @media screen and (max-width: 768px) {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    left: initial;
  }
`

type Props = {
  children: Node
}

function Content({ children }: Props) {
  return <Main>{children}</Main>
}

export default Content
