/**
 * @flow
 */

import React, { Component, type Node } from 'react'
import { reduxForm } from 'redux-form'
import type { FormValues } from './types'

type Props = {
  children: Node,
  handleSubmit: *
}

class Form extends Component<Props> {
  async onSubmit(values: FormValues) {
    const { fetch } = window

    const request = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }

    const response = await fetch('/api/test', request)
    const json = await response.json()

    console.log(json)
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form id="resume-form" onSubmit={handleSubmit(values => this.onSubmit(values))}>
        {this.props.children}
      </form>
    )
  }
}

export default reduxForm({
  form: 'resume',
  destroyOnUnmount: false
})(Form)
