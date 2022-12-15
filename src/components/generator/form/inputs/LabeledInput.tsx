import styled from 'styled-components'
import { Input, InputProps } from './Input'
import { colors } from '../../../../theme'

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
  return (
    <Container>
      <Label>{label}</Label>
      <Input {...inputProps} />
    </Container>
  )
}
