/**
 * @flow
 */

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { primary, header } from '../styles'

const Heading = styled.header`
  position: fixed;
  top: 0;
  background: ${primary};
  z-index: 1;
  width: 100vw;
  height: ${header.height};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 15px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -1px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 768px) {
    position: fixed;
    top: 0;
  }
`

const Logo = styled(Link)`
  text-transform: lowercase;
  text-decoration: none;
  font-family: 'Earth Orbiter Title';
  color: white;
  letter-spacing: 0.5em;

  em {
    color: white;
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
