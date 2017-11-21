/**
 * @flow
 */

import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '../../ui/components'
import { sizes, margins } from '../../ui/theme'

const Wrapper = styled.div`
  height: ${sizes.progress};
  width: ${sizes.preview}px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0;
  margin-bottom: ${margins.progress};
`

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`

const Button = styled(Link)`
  color: white;
  opacity: 0.5;
  text-decoration: none;
  transition: opacity 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 0.75em;

  &:hover {
    opacity: 1;
  }

  i {
    font-size: 0.75em;
    margin: 0 5px;
  }
`

const PrevButton = Button.extend`
  opacity: ${props => (props.section === 'templates' ? 0 : 0.65)};
`
const NextButton = Button.extend`
  opacity: ${props => (props.section === 'preview' ? 0 : 0.65)};
`

const Bar = styled.div`
  position: relative;
  height: 5px;
  background: #222;
  border-radius: 10px;

  :before {
    transition: width .75s ease;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 85%;
    background: white;
    border-radius: 10px;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;
`

const section = ''

function Progress() {
  return (
    <Wrapper>
      <Buttons>
        <PrevButton section={section} to="/">
          <Row>
            <Icon type="arrow_back" /> Prev
          </Row>
        </PrevButton>
        <NextButton section={section} to="/">
          <Row>
            Next <Icon type="arrow_forward" />
          </Row>
        </NextButton>
      </Buttons>
      <Bar />
    </Wrapper>
  )
}

export default Progress
