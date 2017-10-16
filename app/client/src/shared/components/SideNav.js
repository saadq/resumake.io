/**
 * @flow
 */

import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { colors, sizes } from '../theme'

const Aside = styled.aside`
  position: fixed;
  left: 0;
  top: calc(${sizes.header});
  width: ${sizes.sideNav};
  height: calc(100% - ${sizes.header});
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const Nav = styled.nav`margin-top: 40px;`

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
    background-color: ${colors.primary};
    visibility: hidden;
    transform: scaleX(0);
    transform-origin: left;
    transition: all 0.4s cubic-bezier(0.82, 0, 0.12, 1);
  }

  &:hover {
    color: #474e53;

    &:before {
      visibility: visible;
      transform: scaleX(1);
    }
  }

  &.active {
    color: ${colors.primary};
    font-weight: 400;
  }
`

const Button = styled.button`
  width: 75px;
  height: 75px;
  margin-top: 25px;
  border: 1px solid transparent;
  border-radius: 50%;
  background: white;
  color: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06), 0 2px 12px rgba(0, 0, 0, 0.16);
  transition: all 0.4s ease;
  font-family: 'Earth Orbiter title';
  text-transform: lowercase;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09), 0 4px 40px rgba(0, 0, 0, 0.24);
    background-color: ${colors.primary};
    cursor: pointer;
    border: 20px solid ${colors.primary};
    color: white;
  }

  &:active {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06), 0 2px 32px rgba(0, 0, 0, 0.16);
  }

  &:focus {
    outline: none;
  }
`

function SideNav() {
  return (
    <Aside>
      <Nav>
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
              Work
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
      </Nav>
      <Button type="submit" form="resume-form">
        make
      </Button>
    </Aside>
  )
}

export default SideNav
