/**
 * @flow
 */

import React from 'react'
import styled, { keyframes } from 'styled-components'
import { sizes } from '../../ui/theme'

const indeterminate = keyframes`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`

const indeterminateShort = keyframes`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`

const OuterBar = styled.div`
  max-width: 100%;
  width: ${sizes.preview}px;
  position: relative;
  height: 4px;
  display: block;
  background: #222;
  overflow: hidden;
  opacity: ${props => (props.status === 'pending' ? 1 : 0)};
  transition: opacity 0.7s ease-in-out;
  margin-bottom: 10px;
`

const InnerBar = styled.div`
  width: 100%;
  background: white;

  &:before {
    content: '';
    position: absolute;
    background: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    animation: ${indeterminate} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395)
      infinite;
  }

  &:after {
    content: '';
    position: absolute;
    background-color: inherit;
    top: 0;
    left: 0;
    bottom: 0;
    will-change: left, right;
    animation: ${indeterminateShort} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1)
      infinite;
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
