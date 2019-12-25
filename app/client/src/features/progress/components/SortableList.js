/**
 * @flow
 */

import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc'
import styled from 'styled-components'
import { colors } from '../../../common/theme'
import { titleCase } from '../../../common/utils'

const List = styled.div`
  margin: 0;
  padding: 0;
  font-weight: 300;
  margin-bottom: 25px;
`

const NavItem = styled(NavLink)`
  text-decoration: none;
  font-weight: 300;
  color: ${colors.foreground};
  list-style: none;
  display: inline-block;
  margin-bottom: 20px;
  position: relative;

  &:hover {
    &::before {
      width: 100% !important;
      opacity: 1;
    }
  }

  &.active {
    transform: scale(1, 1);
    color: ${colors.primary};

    &:before {
      opacity: 1;
    }
  }

  &:before {
    transition: all 0.4s ease;
    content: '';
    height: 1px;
    background: ${colors.primary};
    position: absolute;
    pointer-events: none;
    bottom: -2px;
    margin: 0 auto;
    width: 0%;
    opacity: 1;
  }
`

const Handle = styled.span`
  position: relative;
  right: 25px;
  color: ${colors.primary};
  opacity: ${props => (props.disabled ? '0' : '1')};
  cursor: grab;
  user-select: none;
`

const DragHandle = SortableHandle(({ disabled }) => {
  return <Handle disabled={disabled}>::</Handle>
})

const Item = styled.div`
  z-index: 2;
  min-width: 80px;
`

const SortableItem = SortableElement(({ value }) => {
  return (
    <Item>
      <DragHandle disabled={value === 'templates' || value === 'profile'} />
      <NavItem to={`/generator/${value}`}>{titleCase(value)}</NavItem>
    </Item>
  )
})

const SortableList = SortableContainer(({ items }) => {
  return (
    <List>
      {items.map((value, index) => (
        <SortableItem
          disabled={value === 'templates' || value === 'profile'}
          key={`item-${index}`}
          index={index}
          value={value}
        />
      ))}
    </List>
  )
})

export default SortableList
