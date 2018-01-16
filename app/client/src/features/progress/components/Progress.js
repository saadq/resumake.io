/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter, type RouterHistory } from 'react-router-dom'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Button } from '../../../common/components'
import { colors } from '../../../common/theme'
import type { Section } from '../../../common/types'
import type { State } from '../../../app/types'

const Wrapper = styled.div`
  margin: 0 auto;
  width: 800px;
  max-width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Bar = styled.div`
  border-radius: 100px;
  position: relative;
  width: 50%;
  height: 5px;
  background: ${lighten(0.1, colors.background)};

  &:before {
    content: '';
    border-radius: 100px;
    transition: width 0.75s ease;
    width: ${props => props.progress}%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background: ${colors.primary};
  }
`

const SectionButton = Button.extend`
  color: ${colors.primary};
  border-color: ${colors.primary};
  border-radius: 100px;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: all 0.4s ease;
  margin: 0;

  i {
    color: ${colors.primary};
    transition: all 0.4s ease;
  }

  &:active {
    outline: none;
    background: transparent;
  }

  &:hover {
    background: ${colors.primary};
    color: ${colors.background};

    i {
      color: ${colors.background};
    }
  }
`

type Props = {
  history: RouterHistory,
  progress: number,
  sections: Array<Section>,
  prev: Section,
  curr: Section,
  next: Section
}

function Progress({ history, progress, sections, prev, curr, next }: Props) {
  return (
    <Wrapper>
      <SectionButton
        type="button"
        onClick={() => history.push(`/generator/${prev}`)}
        disabled={curr === sections[0]}
      >
        ← Prev
      </SectionButton>
      <Bar progress={progress} />
      <SectionButton
        type="button"
        onClick={() => history.push(`/generator/${next}`)}
        disabled={curr === sections[sections.length - 1]}
      >
        Next →
      </SectionButton>
    </Wrapper>
  )
}

function mapState(state: State) {
  return {
    sections: state.orderedSections.sections,
    progress: state.orderedSections.progress,
    prev: state.orderedSections.prev,
    curr: state.orderedSections.curr,
    next: state.orderedSections.next
  }
}

export default withRouter(connect(mapState)(Progress))
