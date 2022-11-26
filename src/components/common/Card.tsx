import { ReactNode, SyntheticEvent } from 'react'
import styled from 'styled-components'
import { colors, sizes } from '../../theme'

const CloseButton = styled.button`
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.75rem;
  cursor: pointer;
  outline: none;
  border: 0;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background: ${colors.black};
  color: ${colors.primary};
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
`
const UpButton = styled.button`
  position: absolute;
  top: 0;
  right: 60px;
  padding: 0.75rem;
  cursor: pointer;
  outline: none;
  border: 0;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background: ${colors.black};
  color: ${colors.primary};
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
`
const DownButton = styled.button`
  position: absolute;
  top: 0;
  right: 30px;
  padding: 0.75rem;
  cursor: pointer;
  outline: none;
  border: 0;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 10px;
  background: ${colors.black};
  color: ${colors.primary};
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);
`

const Wrapper = styled.div`
  position: relative;
  border-radius: 10px;
  width: ${sizes.card.width};
  padding: 2rem 1.5rem;
  margin-top: 2rem;
  background: ${colors.card};
  border: 1px solid #000000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.5);

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 2rem;
  }

  &:hover {
    ${CloseButton} {
      display: initial;
    }
  }
`

interface Props {
  children: ReactNode
  removeCard?: () => void
  moveUp?: () => void
  moveDown?: () => void
}

/**
 * Adds a prevent default just before the function call
 * @param callback The action to execute after the preventDefault
 */
function prependPreventDefault(callback: () => void) {
  return (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault()
    callback()
  }
}

export function Card({ children, removeCard, moveUp, moveDown }: Props) {
  return (
    <Wrapper>
      {children}
      {/* prepending preventDefault to a click callback is needed due to element swaps, these can rerender the entire form tree if we don't call it */}
      {moveUp && <UpButton onClick={prependPreventDefault(moveUp)}>↑</UpButton>}
      {moveDown && (
        <DownButton onClick={prependPreventDefault(moveDown)}>↓</DownButton>
      )}
      {removeCard && <CloseButton onClick={removeCard}>X</CloseButton>}
    </Wrapper>
  )
}
