/**
 * @flow
 */

import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Aside = styled.aside`
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const Nav = styled.nav`
  position: sticky;
  top: 50px;
`

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-transform: uppercase;
  font-weight: 300;
`

const NavItem = styled(NavLink)`
  text-decoration: none;
  font-weight: 300;
  color: black;
  display: block;
  width: 100%;
  margin-bottom: 20px;
  &.active {
    font-weight: 400;
  }
`

function SideNav() {
  return (
    <Aside>
      <Nav>
        <List>
          <NavItem activeClassName="active" to="/generator/templates">Templates</NavItem>
          <NavItem activeClassName="active" to="/generator/profile">Profile</NavItem>
          <NavItem activeClassName="active" to="/generator/education">Education</NavItem>
          <NavItem activeClassName="active" to="/generator/experience">Experience</NavItem>
          <NavItem activeClassName="active" to="/generator/skills">Skills</NavItem>
          <NavItem activeClassName="active" to="/generator/projects">Projects</NavItem>
          <NavItem activeClassName="active" to="/generator/award  s">Awards</NavItem>
        </List>
      </Nav>
    </Aside>
  )
}

export default SideNav
