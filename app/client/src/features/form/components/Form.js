/**
 * @flow
 */

import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, type Location } from 'react-router-dom'
import styled from 'styled-components'
import {
  Templates,
  Profile,
  About,
  Education,
  Work,
  Skills,
  Projects,
  Awards
} from '.'
import Preview from '../../preview/components'
import { ScrollToTop } from '../../../common/components'
import { generateResume } from '../../preview/actions'
import { setProgress } from '../../progress/actions'
import { colors } from '../../../common/theme'
import type { FormValues } from '../types'
import type { State } from '../../../app/types'
import type { Section } from '../../../common/types'

const StyledForm = styled.form`
  width: 40%;
  margin: 0;
  padding: 25px 0 0 0;
  border-right: 1px solid ${colors.borders};
  overflow-y: auto;

  @media screen and (max-width: 850px) {
    width: 100%;
    border: none;
  }
`

type Props = {
  sections: Array<Section>,
  location: Location,
  handleSubmit: *,
  setProgress: (sections: Array<Section>, curr: Section) => void,
  generateResume: (payload: FormValues) => Promise<void>
}

class Form extends Component<Props> {
  form: ?HTMLFormElement

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

    if (this.form) {
      this.form.scrollTop = 0
    }
  }

  onSubmit = (values: FormValues) => {
    const { sections, generateResume } = this.props
    generateResume({ ...values, sections })
  }

  updateProgress() {
    const { sections, location, setProgress } = this.props

    if (
      !location.pathname.startsWith('/generator/') ||
      location.pathname.includes('mobile')
    ) {
      return
    }

    const currSection: Section = (location.pathname.slice(11): any)
    setProgress(sections, currSection)
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <StyledForm
        id="resume-form"
        onSubmit={handleSubmit(this.onSubmit)}
        innerRef={form => (this.form = form)}
      >
        <ScrollToTop>
          <Switch>
            <Route
              exact
              path="/generator"
              render={() => <Redirect to="/generator/templates" />}
            />
            <Route exact path="/generator/templates" component={Templates} />
            <Route exact path="/generator/profile" component={Profile} />
            <Route exact path="/generator/about" component={About} />
            <Route exact path="/generator/education" component={Education} />
            <Route exact path="/generator/work" component={Work} />
            <Route exact path="/generator/skills" component={Skills} />
            <Route exact path="/generator/projects" component={Projects} />
            <Route exact path="/generator/awards" component={Awards} />
            <Route exact path="/generator/mobile-preview" component={Preview} />
            <Route path="*" render={() => <h1 style={{ margin: 0 }}>404</h1>} />
          </Switch>
        </ScrollToTop>
      </StyledForm>
    )
  }
}

function mapState(state: State) {
  return {
    sections: state.progress.sections,
    progress: state.progress.progress
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
