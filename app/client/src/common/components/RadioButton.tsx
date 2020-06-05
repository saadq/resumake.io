import React from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'
import { darkTheme } from 'common/theme'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const RadioLabel = styled.label`
  color: ${darkTheme.foreground};
`

const RadioInput: any = styled(Field)`
  margin: 0;
  margin-right: 4px;
`

interface Props {
  name: string
  value: string
  label: string
}

export function RadioButton({ name, value, label }: Props) {
  return (
    <Wrapper>
      <RadioInput component="input" type="radio" name={name} value={value} />
      <RadioLabel>{label}</RadioLabel>
    </Wrapper>
  )
}
