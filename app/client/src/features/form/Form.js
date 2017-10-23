/**
 * @flow
 */

import React, { Component, type Node } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import type { FormValues } from './types'
import type { State } from '../../shared/types'

type Props = {
  children: Node,
  template: number,
  handleSubmit: *
}

class Form extends Component<Props> {
  async onSubmit(values: FormValues) {
    const { template } = this.props
    const { fetch } = window

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
    const json = await response.json()

    console.log(json)
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form
        id="resume-form"
        onSubmit={handleSubmit(values => this.onSubmit(values))}
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

const ConnectedForm = connect(mapState)(Form)

export default reduxForm({
  form: 'resume',
  destroyOnUnmount: false
})(ConnectedForm)
