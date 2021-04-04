import ReactTooltip from 'react-tooltip'
import styled from 'styled-components'
import { colors } from '../../common/theme'

const TooltipText = styled.span`
  font-size: 0.95rem;
`

interface Props {
  text: string
  tooltipId: string
}

export function Tooltip({ text, tooltipId }: Props) {
  return (
    <ReactTooltip
      id={tooltipId}
      effect="solid"
      place="right"
      backgroundColor={colors.gray6}
    >
      <TooltipText>{text}</TooltipText>
    </ReactTooltip>
  )
}
