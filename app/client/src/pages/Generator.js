/**
 * @flow
 */

import React from 'react'
import { Switch, Route, Redirect, type Match } from 'react-router-dom'
import styled from 'styled-components'
import Header from '../shared/components/Header'
import SideNav from '../shared/components/SideNav'
import Content from '../shared/components/Content'
import Footer from '../shared/components/Footer'
import Templates from '../features/templates/Templates'
import Profile from '../features/form/sections/Profile'
import Education from '../features/form/sections/Education'
import Work from '../features/form/sections/Work'
import Skills from '../features/form/sections/Skills'
import Projects from '../features/form/sections/Projects'
import Awards from '../features/form/sections/Awards'
import Preview from '../features/preview/Preview'

type Props = {
  match: Match
}

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

function Generator({ match }: Props) {
  return (
    <Layout>
      <Header />
      <SideNav />
      <Content>
        <Switch>
          <Route
            exact
            path="/generator"
            render={() => <Redirect to="/generator/templates" />}
          />
          <Route exact path="/generator/templates" component={Templates} />
          <Route exact path="/generator/profile" component={Profile} />
          <Route exact path="/generator/education" component={Education} />
          <Route exact path="/generator/work" component={Work} />
          <Route exact path="/generator/skills" component={Skills} />
          <Route exact path="/generator/projects" component={Projects} />
          <Route exact path="/generator/awards" component={Awards} />
          <Route exact path="/generator/preview" component={Preview} />
          <Route path="*" render={() => <h1>404</h1>} />
        </Switch>
      </Content>
      <Footer />
    </Layout>
  )
}

export default Generator
