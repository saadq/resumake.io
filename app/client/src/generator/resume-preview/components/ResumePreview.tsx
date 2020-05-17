import React from 'react'
import styled from 'styled-components'
import { darkTheme } from 'common/theme'
import { Toolbar } from './Toolbar'

const Wrapper = styled.output`
  background: ${darkTheme.lightBlack};
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
