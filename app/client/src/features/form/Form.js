/**
 * @flow
 */

import React, { Component, type Node } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { generateResume } from '../preview/actions'
import type { FormValues, Payload } from './types'
import type { State } from '../../shared/types'

type Props = {
  selectedTemplate: number,
  generateResume: (payload: Payload) => void,
  handleSubmit: *,
  children: Node
}

class Form extends Component<Props> {
  async onSubmit(values: FormValues) {
    const { selectedTemplate, generateResume } = this.props
    const payload = { ...values, selectedTemplate }
    generateResume(payload)
  }

  render() {
    return (
      <form
        id="resume-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        {this.props.children}
      </form>
    )
  }
}

function mapState(state: State) {
  return {
    selectedTemplate: state.form.resume.selectedTemplate
  }
}

const actions = {
  generateResume
}

const ConnectedForm = connect(mapState, actions)(Form)

export default reduxForm({
  form: 'resume',
  destroyOnUnmount: false
})(ConnectedForm)
