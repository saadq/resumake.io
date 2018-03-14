/**
 * @flow
 */

import React from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'
import { darken } from 'polished'
import { colors } from '../../../../common/theme'

const Label = styled.label`
  display: block;
  margin-top: 30px;
  margin-bottom: 5px;
  color: ${darken(0.25, colors.foreground)};
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
  border-bottom: 1px solid ${colors.borders};
  color: ${colors.foreground};
  transition: all 0.4s;
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

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 50px ${colors.background} inset;
    -webkit-text-fill-color: #ccc;

    &:hover,
    &:focus,
    &:active {
      -webkit-box-shadow: 0 0 0 50px ${colors.background} inset;
      -webkit-text-fill-color: #ccc;
    }

    &:focus {
      -webkit-text-fill-color: ${colors.primary};
    }
  }

  @media screen and (max-width: 850px) {
    font-size: 16px;
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
