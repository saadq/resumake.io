import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { formActions } from 'generator/resume-form/slice'
import { useSections } from 'generator/resume-form/hooks/useSections'
import { AddItemButton } from 'common/components/AddItemButton'

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  font-family: 'Varela Round';
  font-size: 0.9em;
  width: 70%;
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
  const sections = useSections()
  const dispatch = useDispatch()

  const addCustomSection = () => {
    dispatch(formActions.addCustomSection())
  }

  return (
    <Nav>
      <SectionsList>
        {sections.map((section, i) => (
          <ListItem key={i}>
            <SectionLink to={`/generator/${section.name.toLowerCase()}`}>
              {section.displayName}
            </SectionLink>
          </ListItem>
        ))}
      </SectionsList>
      <AddItemButton type="button" onClick={addCustomSection}>
        +
      </AddItemButton>
    </Nav>
  )
}
