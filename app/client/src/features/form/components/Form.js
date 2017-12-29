/**
 * @flow
 */

import React, { Component, type Node } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { generateResume } from '../../preview/actions'
import { setProgress } from '../../ordered-sections/actions'
import type { FormValues } from '../types'
import type { State } from '../../../app/types'
import type { Section } from '../../../common/types'
import type { Location } from 'react-router-dom'

type Props = {
  sections: Array<Section>,
  children: Node,
  location: Location,
  handleSubmit: *,
  setProgress: (sections: Array<Section>, curr: Section) => void,
  generateResume: (payload: FormValues) => void
}

class Form extends Component<Props> {
  updateProgress() {
    const { sections, location, setProgress } = this.props

    if (!location.pathname.startsWith('/generator/')) {
      return
    }

    const currSection: Section = (location.pathname.slice(11): any)
    setProgress(sections, currSection)
  }

  componentWillMount() {
    if (this.props.progress === 0) {
      this.updateProgress()
    }
  }

  shouldComponentUpdate(prevProps) {
    return prevProps.location !== this.props.location
  }

  componentDidUpdate() {
    this.updateProgress()
  }

  render() {
    const { children, handleSubmit, generateResume } = this.props
    return (
      <form id="resume-form" onSubmit={handleSubmit(generateResume)}>
        {children}
      </form>
    )
  }
}

function mapState(state: State) {
  return {
    sections: state.orderedSections.sections,
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
