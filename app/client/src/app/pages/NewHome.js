/**
 * @flow
 */

import React, { Component } from 'react'
import styled from 'styled-components'
import { lighten, darken, rgba } from 'polished'
import { colors } from '../../common/theme'

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
  display: flex;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`

const Section = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LeftSection = Section.extend`
  width: 40%;
  flex-direction: column;
`

const RightSection = Section.extend`
  width: 60%;
`

const Logo = styled.h1`
  text-transform: lowercase;
  text-decoration: none;
  font-family: 'Nexa Bold';
  font-size: 3em;
  margin: 0;
  color: white;
  margin-bottom: 5px;
`

const Accent = styled.em`
  font-style: normal;
  color: ${colors.primary};
`

const Footer = styled.footer`
  width: 100%;
  height: 75px;
  background: ${darken(0.02, colors.background)};
  border-top: 1px solid ${colors.borders};
`

const PrimaryButton = styled.button`
  width: 150px;
  height: 45px;
  margin: 5px 0;
  background: linear-gradient(
    40deg,
    ${darken(0.3, colors.primary)},
    ${colors.primary}
  );
  color: white;
  border-radius: 100px;
  border: 1px solid ${darken(0.1, colors.primary)};
  box-shadow: 0 0 0 0 ${rgba(colors.primary, 0.7)};
  transition: all 0.4s ease;
  text-transform: uppercase;

  &:hover {
    background: linear-gradient(
      40deg,
      ${darken(0.4, colors.primary)},
      ${colors.primary}
    );
    animation: none;
    cursor: pointer;
  }

  &:active {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06), 0 2px 40px rgba(0, 0, 0, 0.16);
    border-color: ${lighten(0.15, colors.primary)};
    color: ${lighten(0.15, colors.primary)};
  }

  &:focus {
    outline: none;
  }
`

const Button = styled.button`
  width: 150px;
  height: 45px;
  margin: 5px 0;
  background: transparent;
  color: white;
  border-radius: 100px;
  border: 1px solid ${darken(0.1, colors.primary)};
  box-shadow: 0 0 0 0 ${rgba(colors.primary, 0.7)};
  transition: all 0.4s ease;
  text-transform: uppercase;

  &:hover {
    background: linear-gradient(
      40deg,
      ${darken(0.4, colors.primary)},
      ${colors.primary}
    );
    animation: none;
    cursor: pointer;
  }

  &:active {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06), 0 2px 40px rgba(0, 0, 0, 0.16);
    border-color: ${lighten(0.15, colors.primary)};
    color: ${lighten(0.15, colors.primary)};
  }

  &:focus {
    outline: none;
  }
`

const ResumePreview = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const Image = styled.img`
  width: 50%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 2;
  box-shadow: 0 2px 25px 2px rgba(0, 0, 0, 0.25);
  background: white;

  &:first-child {
    top: 8em;
    left: -12em;
    z-index: 3;
  }

  &:last-child {
    z-index: 1;
    top: -8em;
    left: 12em;
  }
`

const ctx = require.context('../../features/form/assets/img', true)
const images = ctx.keys().map(ctx)
const randIndex = Math.floor(Math.random() * images.length)

type Props = {}

class Home extends Component<Props> {
  render() {
    return (
      <Wrapper>
        <Main>
          <LeftSection>
            <Logo>
              resu<Accent>make</Accent>
            </Logo>
            <PrimaryButton>Get Started</PrimaryButton>
            <Button>Import JSON</Button>
          </LeftSection>
          <RightSection>
            <ResumePreview>
              <Image src={images[randIndex]} />
              <Image src={images[(randIndex + 1) % images.length]} />
              <Image src={images[(randIndex + 2) % images.length]} />
            </ResumePreview>
          </RightSection>
        </Main>
        <Footer>Footer</Footer>
      </Wrapper>
    )
  }
}

export default Home
