import React from 'react'
import { node, string } from 'prop-types'

function Column({ children, classes = '', size }) {
  return (
    <div className={`column ${classes} ${size ? `is-${size}` : ''}`}>
      {children}
    </div>
  )
}

Column.propTypes = {
  children: node.isRequired,
  classes: string
}

export default Column
