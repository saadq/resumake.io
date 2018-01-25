/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { colors, animations } from '../theme'

const Bars = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.primary};
  animation: ${animations.load} 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
  color: ${colors.primary};
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  transform: translateZ(0);
  animation-delay: -0.16s;

  &:before,
  &:after {
    background: ${colors.primary};
    animation: ${animations.load} 1s infinite ease-in-out;
    width: 1em;
    height: 4em;
    position: absolute;
    top: 0;
    content: '';
  }

  &:before {
    left: -1.5em;
    animation-delay: -0.32s;
  }

  &:after {
    left: 1.5em;
  }
`

type Props = {
  error?: boolean,
  timedOut?: boolean,
  pastDelay?: number
}

function Loader({ error, timedOut, pastDelay }: Props) {
  if (error) {
    return <div>Error!</div>
  } else if (timedOut) {
    return <div>Taking a long time...</div>
  } else if (pastDelay) {
    return <Bars />
  } else {
    return null
  }
}

export { Bars }
export default Loader
