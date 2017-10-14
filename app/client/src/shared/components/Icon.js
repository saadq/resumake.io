/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'

type Props = {
  type: string
}

const StyledIcon = styled.i`
  font-size: 14px;
`

function Icon({ type }: Props) {
  return <StyledIcon className="material-icons">{type}</StyledIcon>
}

export default Icon
