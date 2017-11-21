/**
 * @flow
 */

import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { lighten } from 'polished'
import { colors, sizes, margins, animations } from '../../theme'

const Aside = styled.aside`
  position: fixed;
  left: 0;
  top: ${sizes.header};
  width: ${sizes.sideNav};
  height: calc(100% - ${sizes.header});
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  @media screen and (max-width: 1500px) {
    align-items: center;
  }

  @media screen and (max-width: 1000px) {
    display: none;
  }
`

const Nav = styled.nav`
  margin-top: calc(${sizes.progress} + (${margins.progress} * 2));
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
  color: #8a97a1;
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
    transition: all 0.25s cubic-bezier(0.82, 0, 0.12, 1);
  }

  &:hover :before {
    visibility: visible;
    transform: scaleX(1);
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
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border: 3px solid ${colors.primary};
  border-radius: 50%;
  box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  color: ${colors.primary};
  transition: all 0.4s ease;
  font-family: 'Earth Orbiter title';
  text-transform: lowercase;
  animation: ${animations.pulse} 1.5s infinite cubic-bezier(0.66, 0, 0, 1);

  &:hover {
    animation: none;
    cursor: pointer;
    background: ${colors.primary};
    color: black;
    border: 20px solid ${colors.primary};
  }

  &:active {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06), 0 2px 40px rgba(0, 0, 0, 0.16);
    background-color: ${lighten(0.25, colors.primary)};
    border-color: ${lighten(0.25, colors.primary)};
    color: black;
  }

  &:focus {
    outline: none;
  }
`

type Props = {
  history: {
    push: (path: string) => void
  }
}

function SideNav({ history }: Props) {
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
      <Button
        onClick={() => history.push('/generator/preview')}
        type="submit"
        form="resume-form"
      >
        make
      </Button>
    </Aside>
  )
}

export default withRouter(SideNav)
