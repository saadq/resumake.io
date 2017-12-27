/**
 * @flow
 */

import React, { type Node } from 'react'
import styled from 'styled-components'
import { sizes } from '../../../../common/theme'

const Main = styled.main`
  flex: 1;
  padding: 0;
  margin-top: ${sizes.header};
  margin-left: ${sizes.sideNav};
  margin-bottom: calc(${sizes.footer} + 15px);
  width: calc(80% - ${sizes.sideNav});

  @media screen and (max-width: 1000px) {
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
