import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { AppState } from 'app/types'
import { formActions } from 'generator/resume-form/slice'
import { AddItemButton } from 'common/components/AddItemButton'
import { capitalize } from 'common/utils/strings'

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
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const SectionLink = styled(NavLink)`
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  &.active {
    color: ${(props) => props.theme.primary};
  }
`

const AddSectionButton = styled(AddItemButton)`
  align-self: center;
`

export function SideNav() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { customSectionIndex, values } = useSelector(
    (state: AppState) => state.form.resume
  )

  const addCustomSection = () => {
    dispatch(formActions.addCustomSection())
    history.push(`/generator/custom-${customSectionIndex}`)
  }

  return (
    <Nav>
      <SectionsList>
        {values.sections.map((section, i) => (
          <ListItem key={i}>
            <SectionLink
              activeClassName="active"
              to={`/generator/${section.name}`}
            >
              {section.displayName ?? capitalize(section.name)}
            </SectionLink>
          </ListItem>
        ))}
      </SectionsList>
      <AddSectionButton type="button" onClick={addCustomSection}>
        +
      </AddSectionButton>
      <button form="resume-form">Submit</button>
    </Nav>
  )
}
