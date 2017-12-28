/**
 * @flow
 */

import React, { Component } from 'react'
import { withRouter, type RouterHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { arrayMove } from 'react-sortable-hoc'
import styled from 'styled-components'
import SortableList from './SortableList'
import MakeButton from './MakeButton'
import { setSectionOrder } from '../actions'
import { sizes } from '../../../common/theme'
import type { Section } from '../types'
import type { State } from '../../../app/types'

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

type Props = {
  history: RouterHistory,
  sectionOrder: Array<Section>,
  setSectionOrder: (newSectionOrder: Array<Section>) => void
}

class SideNav extends Component<Props> {
  onSortStart = () => {
    this.toggleGrabCursor()
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { sectionOrder, setSectionOrder } = this.props
    const newSectionOrder = arrayMove(sectionOrder, oldIndex, newIndex)

    setSectionOrder(newSectionOrder)
    this.toggleGrabCursor()
  }

  toggleGrabCursor() {
    document.body && document.body.classList.toggle('grabbing')
  }

  render() {
    const { sectionOrder, history } = this.props

    return (
      <Aside>
        <nav>
          <SortableList
            useDragHandle
            items={sectionOrder}
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

function mapState(state: State) {
  return {
    sectionOrder: state.sectionOrder
  }
}

const mapActions = {
  setSectionOrder
}

const ConnectedSideNav = connect(mapState, mapActions)(SideNav)

export default withRouter(ConnectedSideNav)
