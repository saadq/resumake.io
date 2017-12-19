/**
 * @flow
 */

import React from 'react'
import { NavLink, withRouter, type RouterHistory } from 'react-router-dom'
import styled from 'styled-components'
import { lighten, rgba } from 'polished'
import { colors, sizes, animations } from '../../theme'

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

  &:hover {
    color: ${colors.primary};
  }

  &.active {
    transform: scale(1, 1);
    color: ${colors.primary};

    &:before {
      transform: scale(1, 1);
      opacity: 1;
    }
  }

  &:before {
    content: '';
    width: 2px;
    background: ${colors.primary};
    position: absolute;
    pointer-events: none;
    bottom: 0px;
    left: -15px;
    top: 0px;
    opacity: 1;
    transform: scale(0, 1);
  }
`

const Button = styled.button`
  width: 75px;
  height: 75px;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.background};
  border: 3px solid ${colors.primary};
  border-radius: 50%;
  box-shadow: 0 0 0 0 ${rgba(colors.primary, 0.7)};
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
  history: RouterHistory
}

function SideNav({ history }: Props) {
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
        <Button
          onClick={() => history.push('/generator/preview')}
          type="submit"
          form="resume-form"
        >
          make
        </Button>
      </nav>
    </Aside>
  )
}

export default withRouter(SideNav)
