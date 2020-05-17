import React from 'react'
import styled from 'styled-components'
import { darkTheme } from 'common/theme'

const Wrapper = styled.div`
  background: ${darkTheme.gray};
  box-shadow: 0px -4px 7px rgba(0, 0, 0, 0.25);
  width: 15%;
  min-height: 100vh;
  overflow-y: auto;
  z-index: 999;
`

export function TemplateSwitcher() {
  return (
    <Wrapper>
      <div />
    </Wrapper>
  )
}
