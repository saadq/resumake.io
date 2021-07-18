import { InputHTMLAttributes, memo, FC } from 'react'
import { FieldPath, UseFormReturn } from 'react-hook-form'
import styled from 'styled-components'
import { colors } from '../../theme'
import { FormValues } from '../../types/form'

const StyledInput = styled.input`
  border: 1px solid ${colors.borders};
  background: ${colors.black2};
  padding: 0.75rem 1rem;
  color: ${colors.gray7};
  transition: all 0.2s ease;
  border-radius: 10px;
  font-size: 1rem;

  &:focus {
    outline: 0;
    border-color: ${colors.primary};
  }

  &::placeholder {
    color: ${colors.gray6};
    opacity: 0.35;
  }
`

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  formContext: UseFormReturn<FormValues>
  name: FieldPath<FormValues>
}

export const Input: FC<InputProps> = memo(
  ({ formContext, name, ...inputProps }) => (
    <StyledInput {...inputProps} {...formContext.register(name)} />
  ),
  (prevProps, nextProps) =>
    prevProps.formContext.formState.isDirty ===
    nextProps.formContext.formState.isDirty
)
