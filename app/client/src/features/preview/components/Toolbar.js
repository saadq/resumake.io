/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { Icon } from '../../../shared/components'
import { sizes } from '../../../shared/theme'

const Div = styled.div`
  width: ${sizes.preview};
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-bottom: 10px;
`

const Button = styled.button`
  border: 1px solid white;
  height: 50px;
  width: 80px;
  background: transparent;
  color: white;
`

function Toolbar() {
  return (
    <Div>
      <Button type="button">
        <Icon color="white" size={14} type="picture_as_pdf" /> PDF
      </Button>
      <Button type="button">
        <Icon color="white" size={14} type="code" /> Source
      </Button>
      <Button type="button">
        <Icon color="white" size={14} type="print" /> Code
      </Button>
      <Button type="button">
        <Icon color="white" size={14} type="code" /> Code
      </Button>
      <Button type="button">
        <Icon color="white" size={14} type="code" /> Code
      </Button>
      <Button type="button">
        <Icon color="white" size={14} type="code" /> Code
      </Button>
    </Div>
  )
}

export default Toolbar
