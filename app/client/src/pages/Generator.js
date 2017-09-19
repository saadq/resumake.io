/**
 * @flow
 */

import React from 'react'
import { Switch, Route, Redirect, type Match } from 'react-router-dom'
import Header from '../shared/components/Header'
import SideNav from '../shared/components/SideNav'
import Footer from '../shared/components/Footer'
import Content from '../shared/components/Content'
import Templates from '../features/templates/Templates'
import Profile from '../features/form/components/sections/Profile'

type Props = {
  match: Match
}

function Generator({ match }: Props) {
  return (
    <div>
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
          <Route path="*" render={() => <h1>404</h1>} />
        </Switch>
      </Content>
      <Footer />
    </div>
  )
}

export default Generator
