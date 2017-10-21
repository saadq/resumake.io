/**
 * @flow
 */

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Thing = styled(Link)`color: white;`

function Home() {
  return (
    <div>
      <Thing to="/generator">create new resume</Thing>
    </div>
  )
}

export default Home
