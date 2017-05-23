import 'whatwg-fetch'
import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import { func, number, node } from 'prop-types'

class Form extends Component {
  static propTypes = {
    handleSubmit: func.isRequired,
    template: number.isRequired,
    children: node.isRequired,
    generateResume: func.isRequired
  }

  onSubmit(values) {
    const { template, generateResume } = this.props
    const payload = { template, ...values }

    generateResume(payload)
  }

  render = () => (
    <form
      onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      id="resume-form"
    >
      {this.props.children}
    </form>
  )
}

export default reduxForm({
  form: 'resume',
  destroyOnUnmount: false
})(Form)
