import { InputHTMLAttributes } from 'react'
import { FieldPath, useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import { colors } from '../../../../theme'
import { FormValues } from '../../../../types'

const StyledInput = styled.input`
  border: none;
  background: ${colors.input};
  padding: 1rem;
  color: ${colors.white};
  transition: all 0.2s ease;
  border-radius: 10px;
  font-size: 0.85rem;

  &:focus {
    outline: 0;
    color: ${colors.primary};
    border-color: ${colors.primary};
    box-shadow: 0 0 4px 2px ${colors.primary};
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
