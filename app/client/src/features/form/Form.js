/**
 * @flow
 */

import React, { Component, type Node } from 'react'
import { reduxForm } from 'redux-form'

type Props = {
  children: Node,
  handleSubmit: *
}

class Form extends Component<Props> {
  onSubmit(values) {
    console.log(values)
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit(values => this.onSubmit(values))}>
        {this.props.children}
        <button>Submit</button>
      </form>
    )
  }
}

export default reduxForm({
  form: 'resume',
  destroyOnUnmount: false
})(Form)
