/**
 * @flow
 */

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { primary, header } from '../styles'

const Heading = styled.header`
  z-index: 1;
  width: 100vw;
  height: ${header.height};
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    background: white;
    position: fixed;
    top: 0;
  }
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
