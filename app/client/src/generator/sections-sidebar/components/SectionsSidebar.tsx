import React from 'react'
import styled from 'styled-components'
import { SideNav } from './SideNav'
import { Logo } from '../../../common/components/Logo'
import { darkTheme } from '../../../common/theme'

const Sidebar = styled.aside`
  background: ${darkTheme.darkGray};
  box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.3);
  width: 10%;
  height: 100vh;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LogoContainer = styled.div`
  padding-top: 5em;
`

export function SectionsSidebar() {
  return (
    <Sidebar>
      <LogoContainer>
        <Logo width={125} />
      </LogoContainer>
      <SideNav />
    </Sidebar>
  )
}
