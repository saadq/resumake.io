import { ReactNode } from 'react'
import styled from 'styled-components'
import { Header } from '../common/Header'

const Container = styled.fieldset`
  width: 100%;
`

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1.5rem;
`

interface Props {
  name: string
  children: ReactNode
}

export function FormSection({ name, children }: Props) {
  return (
    <Container>
      <Header>
        <h1>{name}</h1>
      </Header>
      <Main>{children}</Main>
    </Container>
  )
}
