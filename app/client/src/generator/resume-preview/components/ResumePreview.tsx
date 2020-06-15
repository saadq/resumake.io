import React from 'react'
import styled from 'styled-components'
import { Toolbar } from './Toolbar'

const Wrapper = styled.output`
  background: ${(props) => props.theme.lightBlack};
  width: 55%;
  min-height: 100vh;
  overflow-y: auto;
`

export function ResumePreview() {
  return (
    <Wrapper>
      <Toolbar />
    </Wrapper>
  )
}
