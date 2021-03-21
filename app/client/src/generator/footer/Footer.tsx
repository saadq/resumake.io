import styled from 'styled-components'
import { sizes } from '../../common/theme'

const PageFooter = styled.footer`
  width: ${sizes.footer.width};
  height: ${sizes.footer.height};
  background: black;
`

export function Footer() {
  return (
    <PageFooter>
      <h1>Footer</h1>
    </PageFooter>
  )
}
