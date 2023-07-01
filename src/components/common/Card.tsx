import { ReactNode } from 'react'
import styled from 'styled-components'
import {MdClose, MdArrowUpward, MdArrowDownward} from 'react-icons/md'
import { IconButton } from './Button'
import { colors } from '../../theme'

const Controls = styled.div`
  display: flex;
  justify-content: end;
  align-items: flex-end;
  gap: 8px;
  min-height: 2rem;
`

const Wrapper = styled.div`
  padding: 2rem 1.5rem;
  padding-top: 0;
  margin: 2rem 0;
  border: 1px solid ${colors.borders};
  border-radius: 8px;
`

interface Props {
  children: ReactNode
  showControls?: boolean
  removeCard?: () => void
  moveUp?: () => void
  moveDown?: () => void
}

export function Card({
  children,
  showControls,
  removeCard,
  moveUp,
  moveDown
}: Props) {
  return (
    <Wrapper>
      <Controls>
        {showControls && (
          <>
            <IconButton type="button" onClick={moveUp}>
              <MdArrowUpward />
            </IconButton>
            <IconButton type="button" onClick={moveDown}>
              <MdArrowDownward />
            </IconButton>
            <IconButton type="button" onClick={removeCard}>
              <MdClose />
            </IconButton>
          </>
        )}
      </Controls>
      {children}
    </Wrapper>
  )
}
