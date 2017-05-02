import React from 'react'
import { node, bool } from 'prop-types'

const Container = ({ fluid, children, ...props }) => (
  <div className={`container ${fluid ? 'is-fluid' : ''}`} {...props}>
    {children}
  </div>
)

Container.propTypes = {
  children: node.isRequired,
  fluid: bool
}

export default Container
