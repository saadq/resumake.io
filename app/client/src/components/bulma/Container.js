import React from 'react'
import { node, bool } from 'prop-types'

function Container({ fluid, children, ...props }) {
  return (
    <div className={`container ${fluid ? 'is-fluid' : ''}`} {...props}>
      {children}
    </div>
  )
}

Container.propTypes = {
  children: node.isRequired,
  fluid: bool
}

export default Container
