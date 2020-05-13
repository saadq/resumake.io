import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
`

export function SideNav() {
  return (
    <Nav>
      <NavLink to="/generator/profile">Profile</NavLink>
      <NavLink to="/generator/education">Education</NavLink>
      <NavLink to="/generator/work">Work</NavLink>
      <NavLink to="/generator/skills">Skills</NavLink>
      <NavLink to="/generator/projects">Projects</NavLink>
      <NavLink to="/generator/awards">Awards</NavLink>
    </Nav>
  )
}
