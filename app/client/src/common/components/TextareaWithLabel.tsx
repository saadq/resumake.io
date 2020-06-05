import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { Textarea } from './Textarea'
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

export function TextareaWithLabel({ name, label, ...inputProps }: Props) {
  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      <Textarea component="textarea" name={name} {...inputProps} />
    </Wrapper>
  )
}
