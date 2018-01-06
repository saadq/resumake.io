/**
 * @flow
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, type RouterHistory } from 'react-router-dom'
import styled from 'styled-components'
import { lighten, darken, rgba } from 'polished'
import { Loader, Logo } from '../../common/components'
import { uploadFileAndGenerateResume } from '../../features/form/actions'
import { clearState } from '../actions'
import { clearPreview } from '../../features/preview/actions'
import { hasPrevSession } from '../selectors'
import { colors } from '../../common/theme'
import type { State } from '../types'

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

const Button = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.85em;
  text-align: center;
  text-decoration: none;
  width: 175px;
  height: 45px;
  margin: 7px 0;
  background: transparent;
  color: white;
  border-radius: 100px;
  border: 1px solid ${darken(0.1, colors.primary)};
  box-shadow: 0 0 0 0 ${rgba(colors.primary, 0.7)};
  transition: all 0.4s ease;

  &:hover {
    background: linear-gradient(
      40deg,
      ${darken(0.5, colors.primary)},
      ${darken(0.3, colors.primary)}
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

const PrimaryButton = Button.extend`
  margin-top: 15px;
  background: linear-gradient(
    40deg,
    ${darken(0.3, colors.primary)},
    ${colors.primary}
  );

  &:hover {
    background: linear-gradient(
      40deg,
      ${darken(0.4, colors.primary)},
      ${colors.primary}
    );
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
  box-shadow: 0 2px 25px 2px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  background: white;

  &:first-child {
    top: 10em;
    left: -15em;
    z-index: 3;
  }

  &:last-child {
    z-index: 1;
    top: -10em;
    left: 15em;
  }
`

const Footer = styled.footer`
  width: 100%;
  height: 75px;
  background: ${darken(0.02, colors.background)};
  border-top: 1px solid ${colors.borders};
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    text-decoration: none;
    color: ${lighten(0.3, colors.background)};
    margin: 0 1em;
    font-size: 0.8em;

    &:hover {
      text-decoration: underline;
    }
  }
`

const ctx = require.context('../../features/form/assets/img', true)
const images = ctx.keys().map(ctx)

type Props = {
  hasPrevSession: boolean,
  status: string,
  isUploading: boolean,
  clearState: () => void,
  clearPreview: () => void,
  uploadFileAndGenerateResume: (file: File) => Promise<void>,
  history: RouterHistory
}

const LoadWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Label = Button.withComponent('label')

const Input = styled.input`
  display: none;
`

class Home extends Component<Props> {
  onFileUpload = async (e: SyntheticInputEvent<*>) => {
    console.log('running')
    const { uploadFileAndGenerateResume, history } = this.props
    const file = e.target.files[0]

    await uploadFileAndGenerateResume(file)
    history.push('/generator')
  }

  render() {
    const {
      hasPrevSession,
      status,
      isUploading,
      clearState,
      clearPreview
    } = this.props

    // Show loading screen if resume is generating or if file is still uploading
    if (status === 'pending' || isUploading) {
      return (
        <LoadWrapper>
          <Loader />
        </LoadWrapper>
      )
    }

    return (
      <Wrapper>
        <Main>
          <LeftSection>
            <Logo big />
            <PrimaryButton to="/generator" onClick={clearState}>Make New Resume</PrimaryButton>
            {hasPrevSession && <Button to="/generator" onClick={clearPreview}>Continue Session</Button>}
            <Label htmlFor="import-json">Import JSON</Label>
            <Input id="import-json" type="file" onChange={this.onFileUpload} />
          </LeftSection>
          <RightSection>
            <ResumePreview>
              <Image src={images[0]} />
              <Image src={images[1]} />
              <Image src={images[2]} />
            </ResumePreview>
          </RightSection>
        </Main>
        <Footer>
          <Link to="/about">About</Link>
          <a href="https://github.com/saadq/resumake">Source</a>
          <a href="https://github.com/saadq/resumake/issues">Issues</a>
          <a href="mailto:saad@saadq.com">Contact</a>
          <a href="https://www.paypal.me/saadquadri">Donate</a>
        </Footer>
      </Wrapper>
    )
  }
}

function mapState(state: State) {
  return {
    hasPrevSession: hasPrevSession(state),
    status: state.preview.resume.status,
    isUploading: state.form.resume.isUploading
  }
}

const mapActions = {
  clearState,
  clearPreview,
  uploadFileAndGenerateResume
}

export default withRouter(connect(mapState, mapActions)(Home))
