/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import Header from './components/layout/Header'
import SideNav from './components/layout/SideNav'
import Content from './components/layout/Content'

const Wrapper = styled.div`
  display: flex;
  width: 80vw;
  margin: 75px auto;
`

function Generator() {
  return (
    <div>
      <Header />
      <Wrapper>
        <SideNav />
        <Content />
      </Wrapper>
    </div>
  )
}

export default Generator
