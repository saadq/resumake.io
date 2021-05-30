import styled from 'styled-components'
import { Logo } from '../common/Logo'
import { colors, sizes } from '../../theme'

export const Aside = styled.aside`
  background: ${colors.gray3};
  width: ${sizes.sidebar.width};
  height: ${sizes.sidebar.height};
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.75);
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
