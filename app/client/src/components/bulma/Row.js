import React from 'react'
import { node } from 'prop-types'

function Row({ children, multi }) {
  return (
    <div className={`row columns ${multi ? 'is-multiline' : ''}`}>
      {children}
    </div>
  )
}

Row.propTypes = {
  children: node.isRequired
}

export default Row
