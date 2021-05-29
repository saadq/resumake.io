import styled from 'styled-components'
import { colors, sizes } from '../../../common/theme'

const PageFooter = styled.footer`
  width: ${sizes.footer.width};
  height: ${sizes.footer.height};
  background: ${colors.black};
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.65rem;
  color: ${colors.gray5};

  p {
    padding: 2px;
  }

  a,
  a:visited {
    color: ${colors.primary};
  }
`

export function Footer() {
  return (
    <PageFooter>
      <p>© 2018 – {new Date().getFullYear()} Saad Quadri.</p>
      <p>
        Resumake will remain free and open source forever – please consider{' '}
        <a href="https://paypal.com">donating!</a>
      </p>
      <p>
        Contributors on{' '}
        <a href="https://github.com/saadq/resumake.io">GitHub</a> welcome ❤️
      </p>
    </PageFooter>
  )
}
