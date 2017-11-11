/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { clearPreview } from '../features/preview/actions'
import { clearState } from '../shared/actions'
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

type Props = {
  hasPrevSession: boolean,
  clearState: () => void,
  clearPreview: () => void
}

function Home({ hasPrevSession, clearState, clearPreview }: Props) {
  return (
    <Wrapper>
      {/**
        * Clear Preview state even if continuing session
        * because the old resume URL will most likely be expired.
        */}
      {hasPrevSession && (
        <Button to="/generator" onClick={clearPreview}>
          Continue Session
        </Button>
      )}

      {/* Clear all state if starting with new resume */}
      <Button to="/generator" onClick={clearState}>
        Make New Resume
      </Button>
    </Wrapper>
  )
}

function mapState(state: State) {
  return {
    hasPrevSession: Object.keys(state.form.resume.values).length > 1
  }
}

const actions = {
  clearState,
  clearPreview
}

export default connect(mapState, actions)(Home)
