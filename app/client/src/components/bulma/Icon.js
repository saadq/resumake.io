import React from 'react'
import { string, node } from 'prop-types'

const Icon = ({ size, type, children, ...props }) => (
  <span className={`icon ${size ? `is-${size}` : ''}`.trim()}>
    <i className={`fa fa-${type}`.trim()} {...props}>
      {children}
    </i>
  </span>
)

Icon.propTypes = {
  type: string.isRequired,
  size: string,
  children: node
}

export default Icon
