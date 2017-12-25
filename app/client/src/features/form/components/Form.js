/**
 * @flow
 */

import React, { Component, type Node } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { generateResume } from '../../preview/actions'
import { setProgress } from '../../progress/actions'
import type { FormValues } from '../types'
import type { State } from '../../../app/types'
import type { Location } from 'react-router-dom'

type Props = {
  children: Node,
  location: Location,
  handleSubmit: *,
  setProgress: (currSection: string) => void,
  generateResume: (payload: FormValues) => void
}

class Form extends Component<Props> {
  updateProgress() {
    const { location, setProgress } = this.props

    if (!location.pathname.startsWith('/generator/')) {
      return
    }

    const section = location.pathname.slice(11)
    setProgress(section)
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
