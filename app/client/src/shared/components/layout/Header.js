/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'

const Heading = styled.header`
  font-family: 'Earth Orbiter Title';
  width: 100%;
  padding: 25px 0;
  text-align: center;
  letter-spacing: 0.5em;
  color: gray;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.1);

  em {
    color: black;
    font-weight: bold;
    font-style: normal;
  }
`

function Header() {
  return (
    <Heading>
      LaTeX <em>Resume</em>
    </Heading>
  )
}

export default Header
