/**
 * @flow
 */

import React from 'react'
import { Document, Page } from 'react-pdf'
import styled from 'styled-components'
import PDF from './resume.pdf'

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Resume = styled(Document)`
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 15px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -1px rgba(0, 0, 0, 0.2);
`

function Preview() {
  return (
    <Div>
      <Resume file={PDF}>
        <Page pageNumber={1} />
      </Resume>
    </Div>
  )
}

export default Preview
