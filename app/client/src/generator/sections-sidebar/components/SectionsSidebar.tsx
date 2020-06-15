import React from 'react'
import styled from 'styled-components'
import { Logo } from 'common/components/Logo'
import { SideNav } from './SideNav'

const Sidebar = styled.aside`
  background: ${(props) => props.theme.lightBlack};
  box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.3);
  width: 10%;
  min-height: 100vh;
  overflow-y: auto;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
`

const LogoContainer = styled.div`
  padding-top: 5em;
`

export function SectionsSidebar() {
  return (
    <Sidebar>
      <LogoContainer>
        <Logo width={110} />
      </LogoContainer>
      <SideNav />
    </Sidebar>
  )
}
