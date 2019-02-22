/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { darken, rgba } from 'polished'
import { colors } from '../../common/theme'
import comic from '../assets/comic.png'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  max-width: 85%;
  margin: 0 auto;
  font-family: NexaLight;
`

const ErrorHeading = styled.h1`
  text-align: center;
  font-family: NexaBold;
  font-size: 5em;
  color: ${colors.primary};
`

const ErrorDescription = styled.p`
  text-align: center;
  line-height: 1.5;
  font-weight: 400;
  margin-top: 0;
  margin-bottom: 3em;
`

const ErrorLink = styled.a`
  color: ${colors.primary};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const ComicContainer = styled.div`
  align-self: center;
  display: flex;
  flex-direction: column;
`

const ComicImage = styled.img`
  width: 450px;
  max-width: 100%;
`

const ComicCite = styled.cite`
  margin: 1.5em 0;
  font-size: .85em;
  font-style: normal;
`

function Error404() {
  return (
    <Wrapper>
      <ErrorHeading>404</ErrorHeading>
      <ErrorDescription>
        We can’t seem to find this page. Please enjoy this comic before{' '}
        <ErrorLink onClick={() => window.history.back()}>going back</ErrorLink>{' '}
        or <ErrorLink href="https://resumake.io">going home</ErrorLink>.
      </ErrorDescription>
      <ComicContainer>
        <ComicImage src={comic} alt="Resume Comic" />
        <ComicCite>Credit: Bob Eckstein (bobeckstein.com)</ComicCite>
      </ComicContainer>
    </Wrapper>
  )
}

export default Error404
