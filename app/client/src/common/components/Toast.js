/**
 * @flow
 */

import React from 'react'
import { ToastContainer } from 'react-toastify'
import styled from 'styled-components'
import { colors } from '../theme'

const StyledToast = styled(ToastContainer)`
  > div {
    ${props => props.error && `background: ${colors.error};`};
  }
`

type Props = {
  error?: boolean
}

function Toast(props: Props) {
  return <StyledToast {...props} />
}

export default Toast
