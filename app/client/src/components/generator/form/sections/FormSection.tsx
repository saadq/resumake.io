import { ReactNode } from 'react'
import styled from 'styled-components'

const Container = styled.fieldset`
  width: 100%;
`

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.h2`
  margin: 1.5rem 0;
  font-family: NATS;
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
      <Main>
        <Title>{title}</Title>
        {children}
      </Main>
    </Container>
  )
}
