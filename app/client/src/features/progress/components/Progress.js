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
  text-decoration: none;
  transition: opacity 0.4s ease;
`

const PrevButton = Button.extend`
  opacity: ${props => (props.section === 'templates' ? 0 : 1)};
`
const NextButton = Button.extend`
  opacity: ${props => (props.section === 'preview' ? 0 : 1)};
`

const Bar = styled.div`
  height: 5px;
  background: white;
  border-radius: 10px;
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
            <Icon type="navigate_before" /> Prev
          </Row>
        </PrevButton>
        <NextButton section={section} to="/">
          <Row>
            Next <Icon type="navigate_next" />
          </Row>
        </NextButton>
      </Buttons>
      <Bar />
    </Wrapper>
  )
}

export default Progress
