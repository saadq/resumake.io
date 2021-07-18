import styled from 'styled-components'
import { Input, InputProps } from './Input'
import { colors } from '../../theme'
import { useFormContext } from 'react-hook-form'
import { FormValues } from '../../types/form'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  color: ${colors.gray6};

  &:last-of-type {
    margin-bottom: 0;
  }
`

const Label = styled.label`
  color: ${colors.gray6};
  margin-bottom: 0.5rem;
`

interface Props extends Omit<InputProps, 'formContext'> {
  label: string
}

export function LabeledInput({ label, ...inputProps }: Props) {
  const formContext = useFormContext<FormValues>()

  return (
    <Container>
      <Label>{label}</Label>
      <Input formContext={formContext} {...inputProps} />
    </Container>
  )
}
