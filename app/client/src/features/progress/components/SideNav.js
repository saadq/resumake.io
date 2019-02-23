/**
 * @flow
 */

import React, { Component } from 'react'
import { withRouter, type Location } from 'react-router-dom'
import { connect } from 'react-redux'
import { arrayMove } from 'react-sortable-hoc'
import styled from 'styled-components'
import SortableList from './SortableList'
import { PrimaryButton } from '../../../common/components'
import { setSectionOrder, setProgress } from '../actions'
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

  @media screen and (max-width: 850px) {
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
  sections: Array<Section>,
  setSectionOrder: (
    newSectionOrder: Array<Section>,
    currSection: Section
  ) => void,
  setProgress: (newSectionOrder: Array<Section>, currSection: Section) => void
}

class SideNav extends Component<Props> {
  onSortStart = () => {
    this.toggleGrabCursor()
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { location, sections, setSectionOrder, setProgress } = this.props
    const newSectionOrder = arrayMove(sections, oldIndex, newIndex)
    const currSection: Section = (location.pathname.slice(11): any)

    setSectionOrder(newSectionOrder, currSection)
    setProgress(newSectionOrder, currSection)
    this.toggleGrabCursor()
  }

  // Pretty hacky, but meh
  toggleGrabCursor() {
    document.body && document.body.classList.toggle('grabbing')
  }

  render() {
    const { sections } = this.props

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
          <PrimaryButton type="submit" form="resume-form">
            Make
          </PrimaryButton>
        </Nav>
      </Aside>
    )
  }
}

function mapState(state: State) {
  return {
    sections: state.progress.sections
  }
}

const mapActions = {
  setSectionOrder,
  setProgress
}

const ConnectedSideNav = connect(mapState, mapActions)(SideNav)

export default withRouter(ConnectedSideNav)
