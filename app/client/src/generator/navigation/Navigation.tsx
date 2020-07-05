import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { DropResult } from 'react-beautiful-dnd'
import styled from 'styled-components'
import { AppState } from 'app/types'
import { Logo } from 'common/components/Logo'
import { formActions } from 'generator/resume-form/slice'
import { DraggableList } from 'common/components/DraggableList'
import { DraggableItem } from 'common/components/DraggableItem'
import { AddItemButton } from 'common/components/AddItemButton'
import { capitalize } from 'common/utils/strings'

const Aside = styled.aside`
  background: ${(props) => props.theme.lightBlack};
  box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.3);
  width: 10%;
  min-height: 100vh;
  overflow-y: auto;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
`

const LogoContainer = styled.div`
  padding-top: 5em;
`

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

export function Navigation() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { customSectionIndex, values } = useSelector(
    (state: AppState) => state.form.resume
  )

  const addCustomSection = () => {
    dispatch(formActions.addCustomSection())
    history.push(`/generator/custom-${customSectionIndex}`)
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const startIndex = result.source.index
    const endIndex = result.destination.index
    dispatch(formActions.swapSectionsOrder({ startIndex, endIndex }))
  }

  return (
    <Aside>
      <LogoContainer>
        <Logo width={110} />
      </LogoContainer>
      <Nav>
        <SectionsList>
          <DraggableList onDragEnd={handleDragEnd}>
            <ListItem>
              <SectionLink activeClassName="active" to="/generator/templates">
                Templates
              </SectionLink>
            </ListItem>
            {values.sections.map((section, i) => (
              <DraggableItem index={i} key={i}>
                <ListItem>
                  <SectionLink
                    activeClassName="active"
                    to={`/generator/${section.name}`}
                  >
                    {section.displayName ?? capitalize(section.name)}
                  </SectionLink>
                </ListItem>
              </DraggableItem>
            ))}
          </DraggableList>
        </SectionsList>
        <AddSectionButton type="button" onClick={addCustomSection}>
          +
        </AddSectionButton>
      </Nav>
    </Aside>
  )
}
