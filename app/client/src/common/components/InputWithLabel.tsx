import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { TextInput } from './TextInput'
import { Label } from './Label'

const Wrapper = styled.div`
  margin: 1.15em 0;

  &:first-child {
    margin-top: 0;
  }
`

interface Props extends InputHTMLAttributes<{}> {
  name: string
  label: string
}

export function InputWithLabel({ name, label, ...inputProps }: Props) {
  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      <TextInput component="input" name={name} {...inputProps} />
    </Wrapper>
  )
}
