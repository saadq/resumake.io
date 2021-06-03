import ReactTooltip, { TooltipProps } from 'react-tooltip'
import styled from 'styled-components'
import { colors } from '../../theme'

const TooltipText = styled.span`
  font-size: 0.95rem;
`

interface Props extends TooltipProps {
  text: string
  tooltipId: string
  color?: string
}

export function Tooltip({
  text,
  tooltipId,
  color = colors.black,
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
    >
      <TooltipText>{text}</TooltipText>
    </ReactTooltip>
  )
}
