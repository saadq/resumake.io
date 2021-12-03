import { ReactChild, useCallback, useRef } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { NavLink } from 'react-router-dom'
import { Tooltip } from './Tooltip'
import { colors } from '../../theme'
import ReactTooltip from 'react-tooltip'

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: #0e0e0f;
  cursor: pointer;
  border-radius: 20%;
  svg {
    color: ${lighten(0.2, colors.primary)};
  }
`

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.75rem 0;
  margin: 0.25rem auto;
  cursor: pointer;
  border-radius: 20%;
  &:hover {
    background: ${colors.gray};
  }
`

const StyledLink = styled(NavLink)`
  width: 100%;
  outline: none;
  &.active {
    ${Wrapper} {
      background: ${colors.lightGray};
    }

    ${Icon} {
      background: ${colors.primary};
    }

    svg {
      color: ${colors.black};
    }
  }
  &:focus ${Wrapper} {
    box-shadow: 0 0 0 3px ${colors.primary};
  }
`

interface Props {
  to: string
  children: ReactChild
  tooltip: string
  tooltipId: string
}

export function NavIcon({ to, children, tooltip, tooltipId }: Props) {
  const tooltipRef = useRef<HTMLDivElement>(null)

  const showTooltip = useCallback(() => {
    tooltipRef.current && ReactTooltip.show(tooltipRef.current)
  }, [])

  const hideTooltip = useCallback(() => {
    tooltipRef.current && ReactTooltip.hide(tooltipRef.current)
  }, [])

  return (
    <StyledLink
      onFocus={showTooltip}
      onBlur={hideTooltip}
      to={to}
      className={({ isActive }) => (isActive ? 'active' : '')}
    >
      <Wrapper ref={tooltipRef} data-tip data-for={tooltipId}>
        <Tooltip text={tooltip} tooltipId={tooltipId} />
        <Icon>{children}</Icon>
      </Wrapper>
    </StyledLink>
  )
}
