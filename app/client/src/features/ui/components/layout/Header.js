/**
 * @flow
 */

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { sizes, colors } from '../../theme'

const Heading = styled.header`
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: ${sizes.header};
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.background};
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
