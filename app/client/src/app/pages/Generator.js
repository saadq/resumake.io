/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Redirect, Link, type Location } from 'react-router-dom'
import Form, {
  Templates,
  Profile,
  Education,
  Work,
  Skills,
  Projects,
  Awards
} from '../../features/form/components'
import { SideNav, Progress } from '../../features/section-order/components'
import Preview from '../../features/preview/components'
import { colors, sizes } from '../../common/theme'

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

const Content = styled.main`
  flex: 1;
  padding: 0;
  margin-top: ${sizes.header};
  margin-left: ${sizes.sideNav};
  margin-bottom: calc(${sizes.footer} + 15px);
  width: calc(80% - ${sizes.sideNav});

  @media screen and (max-width: 1000px) {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    left: initial;
  }
`

const Header = styled.header`
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: ${sizes.header};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.background};
`

const Logo = styled(Link)`
  text-transform: lowercase;
  text-decoration: none;
  font-family: 'Earth Orbiter Title';
  letter-spacing: 0.4em;
  color: white;
`

const Accent = styled.em`
  font-style: normal;
  color: ${colors.primary};
`

type Props = {
  location: Location
}

function Generator({ location }: Props) {
  return (
    <Layout>
      <Header>
        <Logo to="/">
          Resu<Accent>make</Accent>
        </Logo>
      </Header>
      <SideNav />
      <Content>
        <Form location={location}>
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
            <Route path="*" render={() => <h1 style={{ margin: 0 }}>404</h1>} />
          </Switch>
        </Form>
      </Content>
      <Progress />
    </Layout>
  )
}

export default Generator
