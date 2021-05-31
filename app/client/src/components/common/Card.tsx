import { ReactNode } from 'react'
import styled from 'styled-components'
import { colors, sizes } from '../../theme'

const Wrapper = styled.div`
  border-radius: 10px;
  width: ${sizes.card.width};
  padding: 2rem 1.5rem;
  margin-top: 2rem;
  background: ${colors.gray4};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.4);

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 2rem;
  }
`

interface Props {
  children: ReactNode
}

export function Card({ children }: Props) {
  return <Wrapper>{children}</Wrapper>
}
