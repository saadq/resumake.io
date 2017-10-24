/**
 * @flow
 */

import React, { Component, type Node } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { setResumeURL } from '../preview/actions'
import type { FormValues } from './types'
import type { State } from '../../shared/types'

type Props = {
  children: Node,
  template: number,
  setResumeURL: (url: string) => void,
  handleSubmit: *
}

class Form extends Component<Props> {
  async onSubmit(values: FormValues) {
    const { fetch, URL } = window
    const { template, setResumeURL } = this.props

    const payload = {
      ...values,
      template
    }

    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    const response = await fetch('/api/generate/resume', request)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)

    setResumeURL(url)
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
    template: state.templates.selectedTemplate
  }
}

const actions = {
  setResumeURL
}

const ConnectedForm = connect(mapState, actions)(Form)

export default reduxForm({
  form: 'resume',
  destroyOnUnmount: false
})(ConnectedForm)
