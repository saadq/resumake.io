/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { lighten } from 'polished'
import { prevSection, nextSection } from '../actions'
import { Button, Icon } from '../../ui/components'
import { colors, sizes } from '../../ui/theme'
import type { State } from '../../../shared/types'

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

const SectionLink = styled(Link)`
  text-decoration: none;
  i {
    color: ${colors.primary};
  }
`

const SectionButton = Button.extend`
  color: ${colors.primary};
  border-color: ${colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

type Props = {
  sections: Array<string>,
  progress: number,
  prev: string,
  curr: string,
  next: string,
  prevSection: () => void,
  nextSection: () => void
}

function Progress({
  sections,
  progress,
  prev,
  curr,
  next,
  prevSection,
  nextSection
}: Props) {
  return (
    <Footer>
      <Wrapper>
        <SectionLink to={`/generator/${prev}`}>
          <SectionButton
            type="button"
            onClick={prevSection}
            disabled={curr === sections[0]}
          >
            <Icon type="arrow_back" />
          </SectionButton>
        </SectionLink>
        <Bar progress={progress} />
        <SectionLink to={`/generator/${next}`}>
          <SectionButton
            type="button"
            onClick={nextSection}
            disabled={curr === sections[sections.length - 1]}
          >
            <Icon type="arrow_forward" />
          </SectionButton>
        </SectionLink>
      </Wrapper>
    </Footer>
  )
}

function mapState(state: State) {
  return {
    sections: state.progress.sections,
    progress: state.progress.progress,
    prev: state.progress.prev,
    curr: state.progress.curr,
    next: state.progress.next
  }
}

const mapActions = {
  prevSection,
  nextSection
}

export default connect(mapState, mapActions)(Progress)
