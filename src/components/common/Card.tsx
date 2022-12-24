import { ReactNode } from 'react'
import styled from 'styled-components'
import { colors } from '../../theme'

const Button = styled.button`
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
  color: ${colors.primary};

  :hover {
    background: ${colors.borders}
  }
`

const Controls = styled.div`
  display: flex;
  justify-content: end;
  margin-right: -22px;
`

const Wrapper = styled.div`
  padding: 2rem 1.5rem;
  padding-top: 0;
  margin-top: 2rem;
  border: 1px solid ${colors.borders};
`

interface Props {
  children: ReactNode
  removeCard?: () => void
  moveUp?: () => void
  moveDown?: () => void
}

export function Card({ children, removeCard, moveUp, moveDown }: Props) {
  return (
    <Wrapper>
      <Controls>
        <Button type="button" onClick={moveUp}>
          ▲
        </Button>
        <Button type="button" onClick={moveDown}>
          ▼
        </Button>
        <Button type="button" onClick={removeCard}>
          ✕
        </Button>
      </Controls>
      {children}
    </Wrapper>
  )
}
