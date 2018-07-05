/**
 * @flow
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, type RouterHistory } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import styled from 'styled-components'
import { lighten, darken, rgba } from 'polished'
import { Bars, Logo, RoundButton, Icon } from '../../common/components'
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

  @media screen and (max-width: 850px) {
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

const Label = Button.withComponent('label')

const Input = styled.input`
  display: none;
`

const ResumePreview = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  @media screen and (max-width: 850px) {
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
  justify-content: space-between;
  align-items: center;
  font-size: 0.8em;
  color: ${lighten(0.3, colors.background)};

  @media screen and (max-width: 850px) {
    font-size: 0.75em;
  }
`

const Links = styled.div`
  margin-right: 50px;

  @media screen and (max-width: 850px) {
    margin-right: 15px;
  }

  a {
    text-decoration: none;
    color: ${lighten(0.3, colors.background)};
    margin: 0 1em;

    &:hover {
      text-decoration: underline;
    }
  }
`

const Copyright = styled.span`
  opacity: 0.75;
  margin-left: 50px;

  @media screen and (max-width: 850px) {
    margin-left: 15px;
  }
`

const LoadWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImportRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const HelpButton = RoundButton.extend`
  position: absolute;
  right: -50px;
  border: none;

  &:hover {
    background: transparent;
    i {
      color: ${colors.primary};
    }
  }

  @media screen and (max-width: 850px) {
    display: none;
  }
`

const ctx = require.context('../../features/form/assets/img', true)
const images = ctx.keys().map(ctx)

type Props = {
  hasPrevSession: boolean,
  resumeStatus: string,
  jsonUpload: {
    status?: 'pending' | 'success' | 'failure',
    errMessage?: string
  },
  clearState: () => void,
  clearPreview: () => void,
  uploadFileAndGenerateResume: (file: File) => Promise<void>,
  history: RouterHistory
}

class Home extends Component<Props> {
  toastId: *

  onFileUpload = async (e: SyntheticInputEvent<*>) => {
    const { uploadFileAndGenerateResume } = this.props
    const file = e.target.files[0]

    await uploadFileAndGenerateResume(file)
    const { jsonUpload, history } = this.props

    if (jsonUpload.status === 'success') {
      history.push('/generator')
    } else if (jsonUpload.status === 'failure') {
      toast.error(jsonUpload.errMessage, { position: toast.POSITION.TOP_LEFT })
    }
  }

  clearState = () => {
    this.props.clearState()
    window.localStorage.clear()
  }

  render() {
    const {
      hasPrevSession,
      resumeStatus,
      jsonUpload,
      clearPreview
    } = this.props

    // Show loading screen if file is still uploading or if resume is generating
    if (jsonUpload.status === 'pending' || resumeStatus === 'pending') {
      return (
        <LoadWrapper>
          <Bars />
        </LoadWrapper>
      )
    }

    return (
      <Wrapper>
        <ToastContainer />
        <Main>
          <LeftSection>
            <Logo big />
            <PrimaryButton to="/generator" onClick={this.clearState}>
              Make New Resume
            </PrimaryButton>
            {hasPrevSession && (
              <Button to="/generator" onClick={clearPreview}>
                Continue Session
              </Button>
            )}
            <ImportRow>
              <Label htmlFor="import-json">Import JSON</Label>
              <Input
                id="import-json"
                type="file"
                onChange={this.onFileUpload}
              />
              <HelpButton
                onClick={() => {
                  if (!toast.isActive(this.toastId)) {
                    this.toastId = toast.info(
                      "When you're done working on your resume, you can save it as a JSON which can be imported here to continue progress.",
                      { position: toast.POSITION.TOP_LEFT }
                    )
                  }
                }}
              >
                <Icon size={22} type="help" />
              </HelpButton>
            </ImportRow>
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
          <Copyright>© 2018 Saad Quadri</Copyright>
          <Links>
            <Link to="/about">About</Link>
            <a href="https://github.com/saadq/resumake">Source</a>
            <a href="https://github.com/saadq/resumake/issues">Issues</a>
            <a href="mailto:saad@saadq.com">Contact</a>
            <a href="https://www.paypal.me/saadquadri">Donate</a>
          </Links>
        </Footer>
      </Wrapper>
    )
  }
}

function mapState(state: State) {
  return {
    hasPrevSession: hasPrevSession(state),
    resumeStatus: state.preview.resume.status,
    jsonUpload: state.form.resume.jsonUpload
  }
}

const mapActions = {
  clearState,
  clearPreview,
  uploadFileAndGenerateResume
}

export default withRouter(connect(mapState, mapActions)(Home))
