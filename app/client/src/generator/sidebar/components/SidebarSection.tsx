import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Logo } from '../../../common/components'
import { colors, sizes } from '../../../common/theme'

export const Aside = styled.aside`
  background: ${colors.black1};
  width: ${sizes.sidebar.width};
  height: calc(${sizes.sidebar.height} - ${sizes.footer.height});
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.75);
  position: fixed;
`

export function Sidebar() {
  return (
    <Aside>
      <Link to="/">
        <Logo marginTop={30} marginBottom={100} />
      </Link>
      <p>hi</p>
    </Aside>
  )
}
