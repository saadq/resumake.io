/**
 * @flow
 */

import React, { Component } from 'react'
import { withRouter, type RouterHistory } from 'react-router-dom'
import styled from 'styled-components'
import { arrayMove } from 'react-sortable-hoc'
import SortableList from './SortableList'
import MakeButton from './MakeButton'
import { sizes } from '../../../common/theme'

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

type State = {
  items: Array<string>
}

type Props = {
  history: RouterHistory
}

class SideNav extends Component<Props, State> {
  state = {
    items: [
      'Templates',
      'Profile',
      'Education',
      'Work',
      'Skills',
      'Projects',
      'Awards'
    ]
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
    const { history } = this.props

    return (
      <Aside>
        <nav>
          <SortableList
            useDragHandle
            items={items}
            onSortStart={this.onSortStart}
            onSortEnd={this.onSortEnd}
          />
          <MakeButton
            onClick={() => history.push('/generator/preview')}
            type="submit"
            form="resume-form"
          >
            Make
          </MakeButton>
        </nav>
      </Aside>
    )
  }
}

export default withRouter(SideNav)
