/**
 * @flow
 */

import React from 'react'
import styled, { injectGlobal } from 'styled-components'
import Header from './Header'
import SideNav from './SideNav'
import Content from './Content'

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
    font-family: Lato;
    font-size: .95em;
  }
`

const Wrapper = styled.div`
  display: flex;
  width: 80vw;
  margin: 75px auto;
`

function App() {
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

export default App
