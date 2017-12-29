/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter, type RouterHistory } from 'react-router-dom'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Button } from '../../../common/components'
import { colors, sizes } from '../../../common/theme'
import type { Section } from '../../../common/types'
import type { State } from '../../../app/types'

const Footer = styled.footer`
  width: 100%;
  height: ${sizes.footer};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  background: ${colors.background};
  border-top: 1px solid ${colors.borders};
`

const Wrapper = styled.div`
  margin: 0 auto;
  width: 800px;
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1000px) {
    width: 80%;
  }
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
    <Footer>
      <Wrapper>
        <SectionButton
          form="resume-form"
          onClick={() => history.push(`/generator/${prev}`)}
          disabled={curr === sections[0]}
        >
          ← Prev
        </SectionButton>
        <Bar progress={progress} />
        <SectionButton
          form="resume-form"
          onClick={() => history.push(`/generator/${next}`)}
          disabled={curr === sections[sections.length - 1]}
        >
          Next →
        </SectionButton>
      </Wrapper>
    </Footer>
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
