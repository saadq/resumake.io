import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  font-family: 'Varela Round';
  font-size: 0.9em;
`

const SectionsList = styled.ul`
  list-style-type: none;
  padding-top: 2em;
  padding-left: 0;
`

const ListItem = styled.li`
  padding-bottom: 0.75em;
`

const SectionLink = styled(NavLink)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

export function SideNav() {
  return (
    <Nav>
      <SectionsList>
        <ListItem>
          <SectionLink to="/generator/profile">Profile</SectionLink>
        </ListItem>
        <ListItem>
          <SectionLink to="/generator/education">Education</SectionLink>
        </ListItem>
        <ListItem>
          <SectionLink to="/generator/work">Work</SectionLink>
        </ListItem>
        <ListItem>
          <SectionLink to="/generator/skills">Skills</SectionLink>
        </ListItem>
        <ListItem>
          <SectionLink to="/generator/projects">Projects</SectionLink>
        </ListItem>
        <ListItem>
          <SectionLink to="/generator/awards">Awards</SectionLink>
        </ListItem>
      </SectionsList>
      <button type="submit" form="resume-form">
        Submit
      </button>
    </Nav>
  )
}
