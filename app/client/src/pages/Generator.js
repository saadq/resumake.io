/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import Header from '../shared/components/layout/Header'
import SideNav from '../shared/components/layout/SideNav'
import Content from '../shared/components/layout/Content'
// import Profile from '../features/form/components/sections/Profile'
import Templates from '../features/form/components/sections/Templates'

const Wrapper = styled.div`
  display: flex;
  width: 85vw;
  margin: 75px auto;
`

function Generator() {
  return (
    <div>
      <Header />
      <Wrapper>
        <SideNav />
        <Content>
          <Templates />
        </Content>
      </Wrapper>
    </div>
  )
}

export default Generator
