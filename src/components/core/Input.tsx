import { InputHTMLAttributes } from 'react'
import { FieldPath, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { colors } from '../../theme'
import { FormValues } from '../../types'

export const StyledInput = styled.input`
  border: none;
  background: transparent;
  border: 1px solid ${colors.input};
  padding: 1rem;
  color: ${colors.white};
  font-size: 0.85rem;
  border-radius: 4px;

  &:focus {
    outline: 1px solid ${colors.primary};
  }

  &::placeholder {
    color: ${colors.placeholder};
    opacity: 0.5;
  }
`

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: FieldPath<FormValues>
}

export function Input({ name, ...inputProps }: InputProps) {
  const formContext = useFormContext<FormValues>()
  return <StyledInput {...inputProps} {...formContext.register(name)} />
}
