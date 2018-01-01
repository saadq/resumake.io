/**
 * @flow
 */

import React, { Component } from 'react'
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
import { setProgress } from '../../ordered-sections/actions'
import type { FormValues } from '../types'
import type { State } from '../../../app/types'
import type { Section } from '../../../common/types'

type Props = {
  orderedSections: Array<Section>,
  location: Location,
  handleSubmit: *,
  setProgress: (sections: Array<Section>, curr: Section) => void,
  generateResume: (payload: FormValues) => void
}

class Form extends Component<Props> {
  onSubmit = (values: FormValues) => {
    const { orderedSections, generateResume } = this.props
    generateResume({ ...values, orderedSections })
  }

  updateProgress() {
    const { orderedSections, location, setProgress } = this.props

    if (!location.pathname.startsWith('/generator/')) {
      return
    }

    const currSection: Section = (location.pathname.slice(11): any)
    setProgress(orderedSections, currSection)
  }

  componentWillMount() {
    if (this.props.progress === 0) {
      this.updateProgress()
    }
  }

  shouldComponentUpdate(prevProps) {
    return prevProps.location.pathname !== this.props.location.pathname
  }

  componentDidUpdate() {
    this.updateProgress()
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form id="resume-form" onSubmit={handleSubmit(this.onSubmit)}>
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
      </form>
    )
  }
}

function mapState(state: State) {
  return {
    orderedSections: state.orderedSections.sections,
    progress: state.orderedSections.progress
  }
}

const mapActions = {
  generateResume,
  setProgress
}

const ConnectedForm = connect(mapState, mapActions)(Form)

export default reduxForm({
  form: 'resume',
  destroyOnUnmount: false
})(ConnectedForm)
