/**
 * @flow
 */

import React from 'react'
import { Switch, Route, Redirect, type Match } from 'react-router-dom'
import Header from '../shared/components/Header'
import SideNav from '../shared/components/SideNav'
import Content from '../shared/components/Content'
import Templates from '../features/templates/Templates'
import Profile from '../features/form/sections/Profile'
import Education from '../features/form/sections/Education'
import Work from '../features/form/sections/Work'

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
          <Route exact path="/generator/education" component={Education} />
          <Route exact path="/generator/work" component={Work} />
          <Route path="*" render={() => <h1>404</h1>} />
        </Switch>
      </Content>
    </div>
  )
}

export default Generator
