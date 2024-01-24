import { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.fieldset`
  width: 100%;
  padding: 0 2rem;
  padding-bottom: 2rem;
`

const Title = styled.h2`
  margin: 1.5rem 0;
  font-size: 1.15rem;
  letter-spacing: 2px;
  text-transform: uppercase;
`

interface Props {
  title?: string
  children: ReactNode
}

export function FormSection({ title = '', children }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      {children}
    </Container>
  )
}
