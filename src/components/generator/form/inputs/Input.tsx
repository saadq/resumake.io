import { InputHTMLAttributes, FC } from 'react'
import { FieldPath, UseFormReturn } from 'react-hook-form'
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
  formContext: UseFormReturn<FormValues>
  name: FieldPath<FormValues>
}

// TODO: Investigate if component should be memoized
export const Input: FC<InputProps> = ({ formContext, name, ...inputProps }) => (
  <StyledInput {...inputProps} {...formContext.register(name)} />
)
