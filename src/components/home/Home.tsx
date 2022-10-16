import Link from 'next/link'
import styled from 'styled-components'
import { lighten, darken } from 'polished'
import { Logo } from '../common/Logo'
import { PrimaryButton, Button } from '../common/Button'
import { colors } from '../../theme'

const Wrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 1fr 75px;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Footer = styled.footer`
  background: ${darken(0.02, colors.background)};
  border-top: 1px solid ${colors.borders};
  padding: 0 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2em;
  font-size: 0.8em;
  color: ${lighten(0.3, colors.background)};

  @media screen and (max-width: 850px) {
    padding: 0 15px;
  }

  a {
    text-decoration: none;
    color: ${lighten(0.3, colors.background)};
    &:hover {
      text-decoration: underline;
    }
  }
`

const Copyright = styled.span`
  flex: 1;
`

export function Home() {
  return (
    <Wrapper>
      <Main>
        <Logo marginBottom='0.75em' />
        <Link href="/generator">
          <PrimaryButton>Make New Resume</PrimaryButton>
        </Link>
        <Button>Import JSON</Button>
      </Main>
      <Footer>
        <Copyright>© 2022 Saad Quadri</Copyright>
        <Link href="/about">About</Link>
        <a href="https://github.com/saadq/resumake">Source</a>
        <a href="https://github.com/saadq/resumake/issues">Issues</a>
      </Footer>
    </Wrapper>
  )
}
