/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { prevSection, nextSection } from '../actions'
import { Button, Icon } from '../../ui/components'
import { colors } from '../../ui/theme'
import type { State } from '../../../shared/types'

const Footer = styled.footer`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  height: 75px;
  background: black;
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
  position: relative;
  width: 50%;
  height: 5px;
  background: #222;

  &:before {
    content: '';
    transition: width 0.75s ease;
    width: ${props => props.progress}%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background: white;
  }
`

const SectionLink = styled(Link)`text-decoration: none;`

const SectionButton = Button.extend`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

type Props = {
  progress: number,
  prev: string,
  next: string,
  prevSection: () => void,
  nextSection: () => void
}

function Progress({ progress, prev, next, prevSection, nextSection }: Props) {
  return (
    <Footer>
      <Wrapper>
        <SectionLink to={`/generator/${prev}`}>
          <SectionButton type="button" onClick={prevSection}>
            <Icon type="arrow_back" />
          </SectionButton>
        </SectionLink>
        <Bar progress={progress} />
        <SectionLink to={`/generator/${next}`}>
          <SectionButton type="button" onClick={nextSection}>
            <Icon type="arrow_forward" />
          </SectionButton>
        </SectionLink>
      </Wrapper>
    </Footer>
  )
}

function mapState(state: State) {
  return {
    progress: state.progress.progress,
    prev: state.progress.prev,
    next: state.progress.next
  }
}

const mapActions = {
  prevSection,
  nextSection
}

export default connect(mapState, mapActions)(Progress)
