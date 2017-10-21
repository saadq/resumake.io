/**
 * @flow
 */

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { sizes } from '../theme'

const Heading = styled.header`
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: ${sizes.header};
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.8);
`

const Logo = styled(Link)`
  text-transform: lowercase;
  text-decoration: none;
  font-family: 'Earth Orbiter Title';
  letter-spacing: 0.4em;
  color: white;
`

function Header() {
  return (
    <Heading>
      <Logo to="/">Resumake</Logo>
    </Heading>
  )
}

export default Header
