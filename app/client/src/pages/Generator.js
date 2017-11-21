/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Redirect, type Match } from 'react-router-dom'
import Form, {
  Templates,
  Profile,
  Education,
  Work,
  Skills,
  Projects,
  Awards
} from '../features/form/components'
import Preview from '../features/preview/components'
import { Header, SideNav, Content, Footer } from '../features/ui/components'

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

type Props = {
  match: Match
}

function Generator({ match }: Props) {
  return (
    <Layout>
      <Header />
      <SideNav />
      <Content>
        <Form>
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
        </Form>
      </Content>
      <Footer />
    </Layout>
  )
}

export default Generator
