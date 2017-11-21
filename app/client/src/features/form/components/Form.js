/**
 * @flow
 */

import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, type Location } from 'react-router-dom'
import {
  Templates,
  Profile,
  Education,
  Work,
  Skills,
  Projects,
  Awards
} from '.'
import Preview from '../../preview/components'
import { generateResume } from '../../preview/actions'
import type { FormValues } from '../types'

type Props = {
  handleSubmit: *,
  generateResume: (payload: FormValues) => void,
  location: Location
}

function Form({ handleSubmit, generateResume }: Props) {
  return (
    <form id="resume-form" onSubmit={handleSubmit(generateResume)}>
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
    </form>
  )
}

const mapActions = {
  generateResume
}

const ConnectedForm = connect(null, mapActions)(Form)

export default reduxForm({
  form: 'resume',
  destroyOnUnmount: false
})(ConnectedForm)
