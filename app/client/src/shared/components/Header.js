/**
 * @flow
 */

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { primary } from '../styles'

const Heading = styled.header`
  z-index: 1;
  width: 100%;
  padding: 55px 0;
  text-align: center;
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
