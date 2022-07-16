import styled from 'styled-components'
import { Input, InputProps } from './Input'
import { colors } from '../../../../theme'
import { useFormContext } from 'react-hook-form'
import { FormValues } from '../../../../types'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  color: ${colors.white};
  font-family: NATS;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const Label = styled.label`
  color: ${colors.white};
  margin-bottom: 0.5rem;
  font-size: 1.15rem;
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
