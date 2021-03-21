import styled from 'styled-components'
import { Logo } from '../../common/components'
import { colors, sizes } from '../../common/theme'

export const Aside = styled.aside`
  background: ${colors.gray3};
  width: ${sizes.sidebar.width};
  height: ${sizes.sidebar.height};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.3);
  position: fixed;
`

export function Sidebar() {
  return (
    <Aside>
      <Logo marginTop={30} marginBottom={100} />
      <p>hi</p>
    </Aside>
  )
}
