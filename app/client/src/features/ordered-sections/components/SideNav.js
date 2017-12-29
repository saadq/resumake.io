/**
 * @flow
 */

import React, { Component } from 'react'
import { withRouter, type RouterHistory, type Location } from 'react-router-dom'
import { connect } from 'react-redux'
import { arrayMove } from 'react-sortable-hoc'
import styled from 'styled-components'
import SortableList from './SortableList'
import MakeButton from './MakeButton'
import { setSectionOrder } from '../actions'
import { sizes } from '../../../common/theme'
import type { Section } from '../../../common/types'
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
  location: Location,
  orderedSections: Array<Section>,
  setSectionOrder: (
    newSectionOrder: Array<Section>,
    currSection: Section
  ) => void
}

class SideNav extends Component<Props> {
  onSortStart = () => {
    this.toggleGrabCursor()
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { location, orderedSections, setSectionOrder } = this.props
    const newSectionOrder = arrayMove(orderedSections, oldIndex, newIndex)
    const currSection: Section = (location.pathname.slice(11): any)

    setSectionOrder(newSectionOrder, currSection)
    this.toggleGrabCursor()
  }

  toggleGrabCursor() {
    document.body && document.body.classList.toggle('grabbing')
  }

  render() {
    const { orderedSections, history } = this.props
    const sections = orderedSections.filter(item => item !== 'preview')

    return (
      <Aside>
        <nav>
          <SortableList
            useDragHandle
            lockToContainerEdges
            lockAxis="y"
            items={sections}
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
    orderedSections: state.orderedSections.sections
  }
}

const mapActions = {
  setSectionOrder
}

const ConnectedSideNav = connect(mapState, mapActions)(SideNav)

export default withRouter(ConnectedSideNav)
