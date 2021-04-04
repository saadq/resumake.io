import { ReactChild } from 'react'
import styled from 'styled-components'
import { colors } from '../theme'
import { Tooltip } from '.'
import { Link } from 'react-router-dom'

export const StyledLink = styled(Link)`
  width: 100%;
`

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: ${colors.gray5};
  border-radius: 100%;
  cursor: pointer;

  &:hover {
  }

  svg {
    color: ${colors.black1};
  }
`

export const Wrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  cursor: pointer;
  border-radius: 20%;

  &:hover {
    background: ${colors.gray2};

    ${Icon} {
      border-radius: 20%;
      svg {
        color: black;
      }
    }
  }
`

interface Props {
  to: string
  children: ReactChild
  tooltip: string
  tooltipId: string
}

export function IconLink({ to, children, tooltip, tooltipId }: Props) {
  return (
    <StyledLink to={to}>
      <Wrapper data-tip data-for={tooltipId}>
        <Tooltip text={tooltip} tooltipId={tooltipId} />
        <Icon>{children}</Icon>
      </Wrapper>
    </StyledLink>
  )
}
