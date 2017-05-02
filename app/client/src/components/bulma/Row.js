import React from 'react'
import { node } from 'prop-types'

const Row = ({ children }) => (
  <div className='row columns'>
    {children}
  </div>
)

Row.propTypes = {
  children: node.isRequired
}

export default Row
