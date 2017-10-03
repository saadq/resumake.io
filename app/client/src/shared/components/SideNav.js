/**
 * @flow
 */

import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { primary, header, sideNav } from '../styles'

const Aside = styled.aside`
  position: fixed;
  left: 0;
  top: calc(${header.height} + 25px);
  width: ${sideNav.width};
  height: 100%;
  display: flex;
  justify-content: center;
  @media screen and (max-width: 768px) {
    display: none;
  }
`

const List = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  font-weight: 300;

  li {
    min-width: 75px;
  }
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
    transition: all 0.4s cubic-bezier(.82, 0, .12, 1);
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
      <nav>
        <List>
          <li>
            <NavItem to="/generator/templates" activeClassName="active">
              Templates
            </NavItem>
          </li>
          <li>
            <NavItem to="/generator/profile" activeClassName="active">
              Profile
            </NavItem>
          </li>
          <li>
            <NavItem to="/generator/education" activeClassName="active">
              Education
            </NavItem>
          </li>
          <li>
            <NavItem to="/generator/work" activeClassName="active">
              Experience
            </NavItem>
          </li>
          <li>
            <NavItem to="/generator/skills" activeClassName="active">
              Skills
            </NavItem>
          </li>
          <li>
            <NavItem to="/generator/projects" activeClassName="active">
              Projects
            </NavItem>
          </li>
          <li>
            <NavItem to="/generator/awards" activeClassName="active">
              Awards
            </NavItem>
          </li>
        </List>
      </nav>
    </Aside>
  )
}

export default SideNav
