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
  orderedSections: Array<Section>,
  children: Node,
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
    const { children, handleSubmit } = this.props
    return (
      <form id="resume-form" onSubmit={handleSubmit(this.onSubmit)}>
        {children}
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
