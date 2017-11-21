/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { Button, Icon } from './ui/components'
import { colors } from './ui/theme'

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
`

const Bar = styled.div`
  position: relative;
  width: 50%;
  height: 5px;
  background: #222;

  &:before {
    content: '';
    width: 50%;
    height: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background: white;
  }
`

const SectionButton = Button.extend`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`

function Progress() {
  return (
    <Footer>
      <Wrapper>
        <SectionButton>
          <Icon type="arrow_back" />
        </SectionButton>
        <Bar />
        <SectionButton>
          <Icon type="arrow_forward" />
        </SectionButton>
      </Wrapper>
    </Footer>
  )
}

export default Progress
