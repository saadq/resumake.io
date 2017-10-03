/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.footer`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  color: black;
  font-family: 'Helvetica Neue';
  font-size: 0.75em;
`

const List = styled.ul`
  margin: 0;
  padding: 0;
`

const Item = styled.li`
  display: inline;

  &:after {
    content: '\00B7';
    padding: 0 10px;
  }

  &:last-child:after {
    content: none;
  }
`

function Footer() {
  return (
    <StyledFooter>
      <List>
        <Item>About</Item>
        <Item>Source</Item>
        <Item>Issues</Item>
      </List>
    </StyledFooter>
  )
}

export default Footer
