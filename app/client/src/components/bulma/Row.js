import React from 'react'
import { node, bool, string } from 'prop-types'

function Row({ children, multi, className, id }) {
  return (
    <div
      className={`${className || ''} row columns ${multi ? 'is-multiline' : ''}`.trim()}
    >
      {children}
    </div>
  )
}

Row.propTypes = {
  children: node.isRequired,
  multi: bool,
  className: string
}

export default Row
