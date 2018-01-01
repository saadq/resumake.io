/**
 * @flow
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, type RouterHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Loader } from '../../common/components'
import { uploadFileAndGenerateResume } from '../../features/form/actions'
import { clearPreview } from '../../features/preview/actions'
import { clearState } from '../actions'
import { hasPrevSession } from '../selectors'
import { colors } from '../../common/theme'
import type { State } from '../types'

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Button = styled(Link)`
  background: ${colors.background};
  color: white;
  text-decoration: none;
  border: 1px solid white;
  margin: 5px 0;
  padding: 5px 15px;
  border-radius: 2px;
  height: 30px;
  width: 150px;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.75em;
  letter-spacing: 1.5px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background: white;
    color: black;
  }
`

const FormLabel = Button.withComponent('label')

const FormInput = styled.input`
  display: none;
`

const LoadWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

type Props = {
  hasPrevSession: boolean,
  status: string,
  isUploading: boolean,
  clearState: () => void,
  clearPreview: () => void,
  uploadFileAndGenerateResume: (file: File) => Promise<void>,
  history: RouterHistory
}

class Home extends Component<Props> {
  onFileUpload = async (e: SyntheticInputEvent<*>) => {
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
        {hasPrevSession && (
          <Button to="/generator" onClick={clearPreview}>
            Continue Session
          </Button>
        )}
        <Button to="/generator" onClick={clearState}>
          Make New Resume
        </Button>
        <FormLabel htmlFor="import-json">Import JSON</FormLabel>
        <FormInput id="import-json" type="file" onChange={this.onFileUpload} />
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
