/**
 * @flow
 */

import React, { type Node } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { colors } from '../../../../common/theme'

const Fieldset = styled.fieldset`
  display: block;
  border: none;
  margin: 0 auto;
  padding: 0;
  width: 85%;
  max-width: 100%;
  margin-bottom: 10px;
`

const Heading = styled.h1`
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  font-size: inherit;
  font-weight: normal;
  color: ${lighten(0.15, colors.foreground)};
`

type Props = {
  heading: string,
  children: Node
}

function Section({ heading, children }: Props) {
  return (
    <Fieldset>
      <Heading>{heading}</Heading>
      {children}
    </Fieldset>
  )
}

export default Section
