import { lighten } from 'polished'
import styled from 'styled-components'
import { colors, sizes } from '../../../theme'

const PageFooter = styled.footer`
  width: calc(${sizes.footer.width} - ${sizes.sidebar.width});
  height: ${sizes.footer.height};
  background: ${colors.black};
  position: fixed;
  left: ${sizes.sidebar.width};
  bottom: 0;
  font-size: 0.7rem;
  color: ${colors.white};
  border-top: 1px solid black;
  box-shadow: 0px -2px 4px rgba(0, 0, 0, 0.35);
  background: ${colors.footer};
  padding: 2rem 4rem;
  font-family: Poppins;

  div {
    width: 65%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  p {
    padding: 2px;
  }

  a,
  a:visited {
    color: ${lighten(0.25, colors.primary)};

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px ${colors.primary};
    }
  }
`

export function Footer() {
  return (
    <PageFooter>
      <div>
        <p>
          © 2018 – {new Date().getFullYear()}{' '}
          <a href="https://saadq.com">Saad Quadri</a>.
        </p>
        <p>
          Resumake will remain free and open source forever, please consider{' '}
          <a href="https://paypal.com">donating</a> or contributing on{' '}
          <a href="https://github.com/saadq/resumake.io">GitHub!</a> ❤
        </p>
      </div>
    </PageFooter>
  )
}
