/**
 * @flow
 */

import React, { type Node } from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`width: 100%;`

type Props = {
  children: Node
}

function Form({ children }: Props) {
  return <StyledForm>{children}</StyledForm>
}

export default Form
