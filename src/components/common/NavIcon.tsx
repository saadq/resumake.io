import { ReactChild, useCallback, useRef } from 'react'
import ReactTooltip from 'react-tooltip'
import { lighten } from 'polished'
import styled from 'styled-components'
import { colors } from '../../theme'
import { Tooltip } from './Tooltip'
import { progressAtom, SectionName } from '../../atoms/progress'
import { useAtom } from 'jotai'

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

const StyledLink = styled.a`
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
  sectionToNavigateTo: SectionName
  children: ReactChild
  tooltip: string
  tooltipId: string
}

export function NavIcon({
  sectionToNavigateTo,
  children,
  tooltip,
  tooltipId
}: Props) {
  const tooltipRef = useRef<HTMLDivElement>(null)

  const showTooltip = useCallback(() => {
    tooltipRef.current && ReactTooltip.show(tooltipRef.current)
  }, [])

  const hideTooltip = useCallback(() => {
    tooltipRef.current && ReactTooltip.hide(tooltipRef.current)
  }, [])

  const [progress, setProgress] = useAtom(progressAtom)
  const isActive = progress.currSection === sectionToNavigateTo

  const setSection = useCallback(() => {
    setProgress({ currSection: sectionToNavigateTo })
  }, [sectionToNavigateTo, setProgress])

  return (
    <StyledLink
      onFocus={showTooltip}
      onBlur={hideTooltip}
      onClick={setSection}
      className={isActive ? 'active' : ''}
    >
      <Wrapper ref={tooltipRef} data-tip data-for={tooltipId}>
        <Tooltip text={tooltip} tooltipId={tooltipId} />
        <Icon>{children}</Icon>
      </Wrapper>
    </StyledLink>
  )
}
