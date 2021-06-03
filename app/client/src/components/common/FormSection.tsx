import { ReactNode } from 'react'
import styled from 'styled-components'

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
  children: ReactNode
}

export function FormSection({ children }: Props) {
  return (
    <Container>
      <Main>{children}</Main>
    </Container>
  )
}
