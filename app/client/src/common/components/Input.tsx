import styled from 'styled-components'
import { colors } from '../theme'

const StyledInput = styled.input`
  border: 1px solid ${colors.borders};
  background: ${colors.black2};
  padding: 0.75rem 1rem;
  color: ${colors.gray6};
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

export interface InputProps {
  type?: 'text'
  placeholder: string
}

export function Input({ type = 'text', placeholder }: InputProps) {
  return <StyledInput type={type} placeholder={placeholder} />
}
