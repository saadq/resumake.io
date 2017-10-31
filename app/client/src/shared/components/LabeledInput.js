/**
 * @flow
 */

import React from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'
import { darken } from 'polished'
import { colors } from '../theme'

const Label = styled.label`
  display: block;
  margin-top: 30px;
  margin-bottom: 5px;
  color: #818b94;
  font-weight: 300;
`

const Input = styled(Field)`
  width: 100%;
  padding: 10px 0;
  appearance: none;
  outline: 0;
  font-size: 0.9em;
  font-family: inherit;
  border: none;
  border-bottom: 1px solid #171717;
  color: ${darken(0.2, colors.primary)};
  transition: all 0.2s;
  background: transparent;
  outline: none;
  border-radius: 0;

  &:focus {
    color: ${colors.primary};
    border-color: ${colors.primary};
  }

  &::placeholder {
    color: #7e899b;
    opacity: 0.4;
  }

  @media screen and (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
    width: 100%;
  }
`

type Props = {
  label: string,
  name: string,
  placeholder: string,
  type?: string
}

function LabeledInput({ label, name, placeholder, type = 'text' }: Props) {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        component="input"
      />
    </div>
  )
}

export { Label, Input }
export default LabeledInput
