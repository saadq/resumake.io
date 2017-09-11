/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import Header from '../features/generator/components/layout/Header'
import SideNav from '../features/generator/components/layout/SideNav'
import Content from '../features/generator/components/layout/Content'

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
