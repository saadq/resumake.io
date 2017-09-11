/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'

const Aside = styled.aside`
  font-weight: 300;
  text-transform: uppercase;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const Item = styled.li`
  margin-bottom: 20px;
`

function SideNav() {
  return (
    <Aside>
      <nav>
        <List>
          <Item>Templates</Item>
          <Item>Profile</Item>
          <Item>Education</Item>
          <Item>Experience</Item>
          <Item>Skills</Item>
          <Item>Projects</Item>
          <Item>Awards</Item>
        </List>
      </nav>
    </Aside>
  )
}

export default SideNav
