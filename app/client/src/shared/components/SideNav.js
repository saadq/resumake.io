/**
 * @flow
 */

import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { primary } from '../styles'

const Aside = styled.aside`
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
  color: #454c52;
  display: inline-block;
  margin-bottom: 20px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -5px;
    left: 0;
    background-color: ${primary};
    visibility: hidden;
    transform: scaleX(0);
    transform-origin: left;
    transition: all 0.4s;
  }

  &:hover {
    color: #474e53;

    &:before {
      visibility: visible;
      transform: scaleX(1);
    }
  }

  &.active {
    color: ${primary};
    font-weight: 400;
  }
`

function SideNav() {
  return (
    <Aside>
      <Nav>
        <List>
          <li>
            <NavItem activeClassName="active" to="/generator/templates">
              Templates
            </NavItem>
          </li>
          <li>
            <NavItem activeClassName="active" to="/generator/profile">
              Profile
            </NavItem>
          </li>
          <li>
            <NavItem activeClassName="active" to="/generator/education">
              Education
            </NavItem>
          </li>
          <li>
            <NavItem activeClassName="active" to="/generator/experience">
              Experience
            </NavItem>
          </li>
          <li>
            <NavItem activeClassName="active" to="/generator/skills">
              Skills
            </NavItem>
          </li>
          <li>
            <NavItem activeClassName="active" to="/generator/projects">
              Projects
            </NavItem>
          </li>
          <li>
            <NavItem activeClassName="active" to="/generator/award  s">
              Awards
            </NavItem>
          </li>
        </List>
      </Nav>
    </Aside>
  )
}

export default SideNav
