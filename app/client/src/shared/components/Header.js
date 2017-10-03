/**
 * @flow
 */

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { header } from '../styles'

const Heading = styled.header`
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100vw;
  height: ${header.height};
  background: #fbfbfb;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 3px 10px -4px rgba(0, 0, 0, 0.14);
`

const Logo = styled(Link)`
  text-transform: lowercase;
  text-decoration: none;
  font-family: 'Earth Orbiter Title';
  color: #777;
  letter-spacing: 0.4em;

  em {
    color: black;
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
