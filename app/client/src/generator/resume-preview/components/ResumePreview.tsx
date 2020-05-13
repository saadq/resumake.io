import React from 'react'
import styled from 'styled-components'
import { darkTheme } from '../../../common/theme'

const Wrapper = styled.div`
  background: ${darkTheme.lightBlack};
  width: 45%;
  height: 100vh;
`

export function ResumePreview() {
  return (
    <Wrapper>
      <div />
    </Wrapper>
  )
}
