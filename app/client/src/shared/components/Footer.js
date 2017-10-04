/**
 * @flow
 */

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-family: 'Helvetica Neue';
  font-size: 0.75em;
  opacity: 0.6;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
`

const Item = styled.li`
  display: inline;

  &:after {
    content: '·';
    padding: 0 10px;
  }

  &:last-child:after {
    content: none;
  }

  a {
    color: black;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

function Footer() {
  return (
    <StyledFooter>
      <List>
        <Item>
          <Link to="/about">About</Link>
        </Item>
        <Item>
          <a href="https://github.com/saadq/latexresu.me">Source</a>
        </Item>
        <Item>
          <a href="https://github.com/saadq/latexresu.me/issues">Issues</a>
        </Item>
      </List>
    </StyledFooter>
  )
}

export default Footer
