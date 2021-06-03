import styled from 'styled-components'
import { IoReload } from 'react-icons/io5'
import { RoundButton } from '../../common/RoundButton'
import { Tooltip } from '../../common/Tooltip'
import { colors, sizes } from '../../../theme'

const Button = styled(RoundButton)`
  position: fixed;
  bottom: 1rem;
  right: calc(${sizes.templatesSection.width});
  width: 75px;
  height: 75px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.4);

  &:hover {
    transform: rotate(180deg);
  }
`

export function FloatingButton() {
  return (
    <>
      <Tooltip
        color={colors.primary}
        text="Rebuild resume"
        tooltipId="tooltip-rebuildResume"
      />
      <Button data-tip data-for="tooltip-rebuildResume">
        <IoReload size="1.5rem" />
      </Button>
    </>
  )
}
