/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'

type Props = {
  type: string,
  size?: number,
  color?: string
}

const StyledIcon = styled.i`
  font-size: ${props => `${props.size || 14}px`};
  color: ${props => props.color || 'white'};
  display: flex;
  justify-content: center;
  align-items: center;
`

function Icon({ type, size, color }: Props) {
  return (
    <StyledIcon className="material-icons" size={size} color={color}>
      {type}
    </StyledIcon>
  )
}

export default Icon
