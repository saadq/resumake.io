import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import { colors } from '../../theme'

const TooltipText = styled.span`
  font-size: 0.95rem;
`

interface Props {
  text: string
  tooltipId: string
  color?: string
}

export function Tooltip({ text, tooltipId, color = colors.gray5 }: Props) {
  return (
    <ReactTooltip
      id={tooltipId}
      effect="solid"
      place="right"
      backgroundColor={color}
    >
      <TooltipText>{text}</TooltipText>
    </ReactTooltip>
  )
}
