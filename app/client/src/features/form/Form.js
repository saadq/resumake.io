/**
 * @flow
 */

import React, { type Node } from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { generateResume } from '../preview/actions'
import type { FormValues } from './types'

type Props = {
  handleSubmit: *,
  generateResume: (payload: FormValues) => void,
  children: Node
}

function Form({ handleSubmit, generateResume, children }: Props) {
  return (
    <form id="resume-form" onSubmit={handleSubmit(generateResume)}>
      {children}
    </form>
  )
}

const actions = {
  generateResume
}

const ConnectedForm = connect(null, actions)(Form)

export default reduxForm({
  form: 'resume',
  destroyOnUnmount: false
})(ConnectedForm)
