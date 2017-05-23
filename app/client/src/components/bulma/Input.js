import React from 'react'
import { string } from 'prop-types'
import { Field } from 'redux-form'

function Input({ type = 'text', name, title, placeholder }) {
  return (
    <div className="input-container">
      <label className="label">{title}</label>
      <p className="control">
        <Field
          component="input"
          placeholder={placeholder || ''}
          type={type}
          name={name}
          className="input"
        />
      </p>
    </div>
  )
}

Input.propTypes = {
  name: string.isRequired,
  title: string.isRequired,
  type: string,
  placeholder: string
}

export default Input
