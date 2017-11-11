/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { clearForm } from '../features/form/actions'
import type { FormState } from '../features/form/types'
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
  width: 150px;
  text-align: center;

  &:hover {
    cursor: pointer;
    background: white;
    color: black;
  }
`

type Props = {
  form: FormState,
  clearForm: () => void
}

function Home({ clearForm, form }: Props) {
  return (
    <Wrapper>
      <Button to="/generator" onClick={clearForm}>
        Make New Resume
      </Button>
      {Object.keys(form.values).length > 1 && (
        <Button to="/generator">Continue Last Session</Button>
      )}
    </Wrapper>
  )
}

function mapState(state: State) {
  return {
    form: state.form.resume
  }
}

const actions = {
  clearForm
}

export default connect(mapState, actions)(Home)
