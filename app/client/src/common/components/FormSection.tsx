import { ReactNode } from 'react'
import styled from 'styled-components'
import { colors, sizes } from '../theme'

const Container = styled.fieldset`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Header = styled.header`
  width: ${sizes.header.width};
  height: ${sizes.header.height};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
  background: ${colors.gray2};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
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
      {children}
    </Container>
  )
}
