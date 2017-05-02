import 'whatwg-fetch'
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { func, number, node } from 'prop-types'

class Form extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    selectedTemplate: number.isRequired,
    children: node.isRequired,
    setResumeURL: func.isRequired
  }

  async onSubmit(values) {
    const { fetch, URL } = window
    const { selectedTemplate, setResumeURL } = this.props

    const payload = {
      ...values,
      selectedTemplate
    }

    const req = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    const res = await fetch('/api/generate/resume', req)
    const blob = await res.blob()
    const url = URL.createObjectURL(blob)

    setResumeURL(url)
  }

  render = () => (
    <form onSubmit={this.props.handleSubmit(values => this.onSubmit(values))} id='resume-form'>
      {this.props.children}
    </form>
  )
}

export default reduxForm({
  form: 'resume',
  destroyOnUnmount: false
})(Form)
