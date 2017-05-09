import React from 'react'
import { node, string } from 'prop-types'

const Column = ({ children, classes = '', size }) => (
  <div className={`column ${classes} ${size ? `is-${size}` : ''}`}>
    {children}
  </div>
)

Column.propTypes = {
  children: node.isRequired,
  classes: string
}

export default Column
