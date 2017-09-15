/**
 * @flow
 */

import React from 'react'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../shared/components/layout/Header'
import SideNav from '../shared/components/layout/SideNav'
import Content from '../shared/components/layout/Content'
import Templates from '../features/templates/Templates'
import Profile from '../features/form/components/sections/Profile'
import type { Match } from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  width: 85vw;
  margin: 75px auto;
`

type Props = {
  match: Match
}

function Generator({ match }: Props) {
  return (
    <div>
      <Header />
      <Wrapper>
        <SideNav />
        <Content>
          <Route exact path="/generator" component={Templates} />
          <Route exact path="/generator/profile" component={Profile} />
        </Content>
      </Wrapper>
    </div>
  )
}

export default Generator
