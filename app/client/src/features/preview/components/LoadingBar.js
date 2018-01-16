/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { colors, animations } from '../../../common/theme'

const OuterBar = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  height: 4px;
  display: block;
  background: ${colors.borders};
  overflow: hidden;
  opacity: ${props => (props.status === 'pending' ? 1 : 0)};
  transition: opacity 0.7s ease-in-out;
`

const InnerBar = styled.div`
  width: 100%;
  background: ${colors.primary};

  &:before {
    content: '';
    position: absolute;
    background: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    animation: ${animations.indeterminate} 2.1s
      cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  }

  &:after {
    content: '';
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    animation: ${animations.indeterminateShort} 2.1s
      cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
    animation-delay: 1.15s;
  }
`

type Props = {
  status?: 'pending' | 'success' | 'failure'
}

function LoadingBar({ status }: Props) {
  return (
    <OuterBar status={status}>
      <InnerBar />
    </OuterBar>
  )
}

export default LoadingBar
