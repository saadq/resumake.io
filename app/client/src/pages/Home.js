/**
 * @flow
 */

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, type RouterHistory } from 'react-router-dom'
import styled from 'styled-components'
import { uploadJSON } from '../features/form/actions'
import { clearPreview } from '../features/preview/actions'
import { clearState } from '../shared/actions'
import { hasPrevSession } from '../shared/selectors'
import type { State } from '../shared/types'

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Button = styled(Link)`
  background: black;
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

const FormInput = styled.input`display: none;`

type Props = {
  hasPrevSession: boolean,
  clearState: () => void,
  clearPreview: () => void,
  uploadJSON: (file: File) => Promise<void>,
  history: RouterHistory
}

class Home extends Component<Props> {
  onFileUpload = async (e: SyntheticInputEvent<*>) => {
    const { uploadJSON, history } = this.props
    const file = e.target.files[0]

    await uploadJSON(file)
    history.push('/generator')
  }

  render() {
    const { hasPrevSession, clearState, clearPreview } = this.props
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
    hasPrevSession: hasPrevSession(state)
  }
}

const actions = {
  clearState,
  clearPreview,
  uploadJSON
}

export default withRouter(connect(mapState, actions)(Home))
