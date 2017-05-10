import React from 'react'
import { string, node } from 'prop-types'

function Icon({ size, type, children, ...props }) {
  return (
    <span className={`icon ${size ? `is-${size}` : ''}`.trim()}>
      <i className={`fa fa-${type}`.trim()} {...props}>
        {children}
      </i>
    </span>
  )
}

Icon.propTypes = {
  type: string.isRequired,
  size: string,
  children: node
}

export default Icon
