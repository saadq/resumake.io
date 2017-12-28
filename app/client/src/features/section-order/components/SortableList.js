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
`

const NavItem = styled(NavLink)`
  text-decoration: none;
  font-weight: 300;
  color: #8a97a1;
  list-style: none;
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
    height: 1px;
    background: ${colors.primary};
    position: absolute;
    pointer-events: none;
    bottom: -2px;
    left: 0;
    right: 0;
    opacity: 1;
    transform: scale(0, 1);
  }
`

const Handle = styled.span`
  position: relative;
  right: 25px;
  color: ${colors.primary};
  opacity: ${props => (props.hide ? '0' : '1')};
  cursor: grab;
  user-select: none;
`

const DragHandle = SortableHandle(() => <Handle>::</Handle>)

const Item = styled.div`
  min-width: 80px;
`

const SortableItem = SortableElement(({ value }) => {
  return (
    <Item>
      <DragHandle />
      <NavItem to={`/generator/${value}`}>{titleCase(value)}</NavItem>
    </Item>
  )
})

const SortableList = SortableContainer(({ items }) => {
  return (
    <List>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </List>
  )
})

export default SortableList
