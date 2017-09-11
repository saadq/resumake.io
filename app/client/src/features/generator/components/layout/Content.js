/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import Profile from '../sections/Profile'

const Main = styled.main`
  margin-left: 125px;
  display: flex;
  flex-grow: 1;
  @media screen and (max-width: 768px) {
    margin-left: 0;
  }
`

const Form = styled.form`
  width: 100%;
`

function Content() {
  return (
    <Main>
      <Form>
        <Profile />
      </Form>
    </Main>
  )
}

export default Content
