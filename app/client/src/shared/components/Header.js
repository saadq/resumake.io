/**
 * @flow
 */

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { primary } from '../styles'

const Heading = styled.header`
  width: 100%;
  padding: 25px 0;
  text-align: center;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.1);
`

const Logo = styled(Link)`
  text-transform: lowercase;
  text-decoration: none;
  font-family: 'Earth Orbiter Title';
  color: gray;
  letter-spacing: 0.5em;

  em {
    color: ${primary};
    font-weight: bold;
    font-style: normal;
  }
`

function Header() {
  return (
    <Heading>
      <Logo to="/">
        Resu<em>make</em>
      </Logo>
    </Heading>
  )
}

export default Header
