/**
 * @flow
 */

import React, { Component } from 'react'
import { NavLink, withRouter, type RouterHistory } from 'react-router-dom'
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove
} from 'react-sortable-hoc'
import styled from 'styled-components'
import { lighten, rgba } from 'polished'
import { colors, sizes, animations } from '../../../common/theme'

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
  text-transform: uppercase;
  letter-spacing: 2px;
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

const Handle = styled.span`
  position: relative;
  right: 25px;
  color: ${colors.primary};
  opacity: ${props => (props.hide ? '0' : '1')};
  cursor: grab;
  user-select: none;
`

const DragHandle = SortableHandle(() => (
  <Handle>::</Handle>
))

const Item = styled.div`
  min-width: 80px;
`

const SortableItem = SortableElement(({ value }) => {
  return (
    <Item>
      <DragHandle />
      <NavItem to={`/generator/${value.toLowerCase()}`}>{value}</NavItem>
    </Item>
  )
})

const SortableList = SortableContainer(({ items }) => {
  return (
    <List>
      {items.map((value, index) => (
        <SortableItem
          key={`item-${index}`}
          index={index}
          value={value}
        />
      ))}
    </List>
  )
})

type State = {
  items: Array<string>
}

class SortableComponent extends Component<*, State> {
  state = {
    items: ['Templates', 'Profile', 'Education', 'Work', 'Skills', 'Projects', 'Awards']
  }

  onSortStart = () => {
    this.toggleGrabCursor()
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(prevState => ({
      items: arrayMove(prevState.items, oldIndex, newIndex)
    }))

    this.toggleGrabCursor()
  }

  toggleGrabCursor() {
    document.body && document.body.classList.toggle('grabbing')
  }

  render() {
    const { items } = this.state

    return (
      <SortableList
        useDragHandle
        items={items}
        onSortStart={this.onSortStart}
        onSortEnd={this.onSortEnd}
      />
    )
  }
}

type Props = {
  history: RouterHistory
}

function SideNav({ history }: Props) {
  return (
    <Aside>
      <nav>
        <SortableComponent />
        <Button
          onClick={() => history.push('/generator/preview')}
          type="submit"
          form="resume-form"
        >
          Make
        </Button>
      </nav>
    </Aside>
  )
}

export default withRouter(SideNav)
