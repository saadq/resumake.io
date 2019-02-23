/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter, type RouterHistory } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { lighten } from 'polished'
import { Button, PrimaryButton } from '../../../common/components'
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

  ${props =>
    props.hideOnMobile &&
    css`
      @media screen and (max-width: 850px) {
        display: none;
      }
    `};
`

const SectionButton = Button.extend`
  color: ${colors.primary};
  border-color: ${colors.primary};
  border-radius: 100px;
  padding: 5px 15px;
  display: inline-flex;
  align-items: flex-end;
  text-align: center;
  vertical-align: middle;
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

    @media screen and (max-width: 850px) {
      background: transparent;
      color: ${colors.primary};
    }

    i {
      color: ${colors.background};
    }
  }
`

const MobileButton = PrimaryButton.extend`
  letter-spacing: 0;
`

type Props = {
  history: RouterHistory,
  location: Location,
  progress: number,
  sections: Array<Section>,
  prev: Section,
  curr: Section,
  next: Section
}

function Progress({
  history,
  location,
  progress,
  sections,
  prev,
  curr,
  next
}: Props) {
  const inPreview = location.pathname.includes('mobile-preview')

  return (
    <Wrapper>
      <SectionButton
        type="button"
        onClick={() => history.push(`/generator/${prev}`)}
        disabled={curr === sections[0]}
      >
        ← Prev
      </SectionButton>
      <Bar progress={progress} hideOnMobile />
      <MobileButton
        type="submit"
        form="resume-form"
        onClick={() =>
          history.push(`/generator/${inPreview ? curr : 'mobile-preview'}`)
        }
        hideOnDesktop
      >
        {location.pathname.includes('mobile') ? 'Go Back' : 'Make'}
      </MobileButton>
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
    sections: state.progress.sections,
    progress: state.progress.progress,
    prev: state.progress.prev,
    curr: state.progress.curr,
    next: state.progress.next
  }
}

export default withRouter(connect(mapState)(Progress))
