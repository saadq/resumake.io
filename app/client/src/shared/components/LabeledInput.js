/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { primary, light } from '../styles'

const Label = styled.label`
  display: block;
  margin-top: 30px;
  margin-bottom: 5px;
  color: #818b94;
  font-weight: 300;
`

const Input = styled.input`
  width: 80%;
  padding: 9px 10px 10px 5px;
  appearance: none;
  outline: 0;
  font-size: .9em;
  font-family: inherit;
  border: none;
  border-bottom: 1px solid ${light};
  color: #7e899b;
  transition: all .2s;
  background: transparent;
  outline: none;
  border-radius: 0;

  &:focus {
    color: #333c46;
    border-color: ${primary};
  }

  @media screen and (max-width: 768px) {
    padding-right: 5px;
    padding-left: 5px;
    width: 100%;
  }
`

type Props = {
  label: string,
  type?: string
}

function LabeledInput({ label, type = 'text' }: Props) {
  return (
    <div>
      <Label>{label}</Label>
      <Input type={type} />
    </div>
  )
}

export default LabeledInput
