import styled from 'styled-components'
import { IoReload } from 'react-icons/io5'
import { RoundButton } from '../../common/RoundButton'
import { Tooltip } from '../../common/Tooltip'
import { colors, sizes } from '../../../theme'

const Button = styled(RoundButton)`
  position: fixed;
  top: calc(2.5rem + ${sizes.header.height});
  right: ${sizes.templatesSection.width};
  width: 65px;
  height: 65px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.4);
  z-index: 999999;

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
        place="left"
      />
      <Button data-tip data-for="tooltip-rebuildResume" form="resume-form">
        <IoReload size="1.5rem" />
      </Button>
    </>
  )
}
