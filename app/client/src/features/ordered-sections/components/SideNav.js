/**
 * @flow
 */

import React, { Component } from 'react'
import { withRouter, type Location } from 'react-router-dom'
import { connect } from 'react-redux'
import { arrayMove } from 'react-sortable-hoc'
import styled from 'styled-components'
import SortableList from './SortableList'
import MakeButton from './MakeButton'
import { setSectionOrder } from '../actions'
import { sizes, colors } from '../../../common/theme'
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
  align-items: center;
  border-right: 1px solid ${colors.borders};

  @media screen and (max-width: 1000px) {
    display: none;
  }
`

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 25px;
`

type Props = {
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

  // Pretty hacky, but meh
  toggleGrabCursor() {
    document.body && document.body.classList.toggle('grabbing')
  }

  render() {
    const { orderedSections } = this.props
    const sections = orderedSections.filter(item => item !== 'preview')

    return (
      <Aside>
        <Nav>
          <SortableList
            useDragHandle
            lockToContainerEdges
            lockAxis="y"
            items={sections}
            onSortStart={this.onSortStart}
            onSortEnd={this.onSortEnd}
          />
          <MakeButton type="submit" form="resume-form">
            Make
          </MakeButton>
        </Nav>
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
