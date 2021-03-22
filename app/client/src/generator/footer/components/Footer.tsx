import styled from 'styled-components'
import { colors, sizes } from '../../../common/theme'

const PageFooter = styled.footer`
  width: ${sizes.footer.width};
  height: ${sizes.footer.height};
  background: black;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.65rem;
  color: ${colors.gray5};

  p {
    padding: 2px;
  }
`

export function Footer() {
  return (
    <PageFooter>
      <p>© 2018 – {new Date().getFullYear()} Saad Quadri. |</p>
      <p>
        Resumake will remain free and open source forever – please consider
        donating! |
      </p>
      <p>Contributors on GitHub welcome ❤️</p>
    </PageFooter>
  )
}
