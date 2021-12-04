import ReactTooltip, { TooltipProps } from 'react-tooltip'
import styled from 'styled-components'
import { colors } from '../../theme'

const TooltipText = styled.span`
  font-size: 1.15rem;
  font-family: NATS;
`

interface Props extends TooltipProps {
  text: string
  tooltipId: string
  color?: string
}

export function Tooltip({
  text,
  tooltipId,
  color = colors.primary,
  place,
  ...props
}: Props) {
  return (
    <ReactTooltip
      {...props}
      id={tooltipId}
      effect="solid"
      place={place ?? 'right'}
      backgroundColor={color}
      textColor="black"
    >
      <TooltipText>{text}</TooltipText>
    </ReactTooltip>
  )
}
