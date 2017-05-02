import React from 'react'
import { object } from 'prop-types'

const NoMatch = ({ location }) => (
  <div>Error 404: No match for {location.pathname}</div>
)

NoMatch.propTypes = {
  location: object.isRequired
}

export default NoMatch
