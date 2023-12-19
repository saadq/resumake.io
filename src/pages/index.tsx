import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { lighten, darken } from 'polished'

import { Logo } from '../components/core/Logo'
import { PrimaryButton, Button } from '../components/core/Button'
import { colors } from '../theme'

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

const HiddenInput = styled.input`
  display: none;
`

export default function Home() {
  const router = useRouter()
  const [hasSession, setHasSession] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasSession(!!localStorage.getItem('jsonResume'))
    }
  }, [])

  const startNewSession = () => {
    window.localStorage.clear()
    router.push('/generator')
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    reader.addEventListener('load', (e) => {
      // TODO: validate JSON schema using Zod
      const jsonResume = JSON.parse(e.target?.result as string)
      localStorage.setItem('jsonResume', JSON.stringify(jsonResume))
      router.push('/generator')
    })

    if (e.target.files) {
      reader.readAsText(e.target.files[0])
    }
  }

  return (
    <Wrapper>
      <Main>
        <Logo marginBottom="0.75em" />
        <PrimaryButton onClick={startNewSession}>Make New Resume</PrimaryButton>
        {hasSession && (
          <Link href="/generator" style={{ textDecoration: 'none' }}>
            <Button>Continue Session</Button>
          </Link>
        )}
        <Button as="label" htmlFor="import-json">
          Import JSON
        </Button>
        <HiddenInput
          id="import-json"
          type="file"
          accept="application/json"
          onChange={handleFileUpload}
        />
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
