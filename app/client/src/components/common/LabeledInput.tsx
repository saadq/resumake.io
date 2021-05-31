import styled from 'styled-components'
import { Input, InputProps } from './Input'
import { colors } from '../../theme'

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

interface Props extends InputProps {
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
