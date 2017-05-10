import React from 'react'
import { node } from 'prop-types'

const Row = ({ children, multi }) => (
  <div className={`row columns ${multi ? 'is-multiline' : ''}`}>
    {children}
  </div>
)

Row.propTypes = {
  children: node.isRequired
}

export default Row
