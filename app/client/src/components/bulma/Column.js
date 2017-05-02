import React from 'react'
import { node, string } from 'prop-types'

const Column = ({ children, classes = '' }) => (
  <div className={`column ${classes}`}>
    {children}
  </div>
)

Column.propTypes = {
  children: node.isRequired,
  classes: string
}

export default Column
