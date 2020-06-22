import React from 'react'
import styled from 'styled-components'
import { Header } from 'common/components/Header'

const ToolbarHeader = styled(Header)`
  display: flex;
  justify-content: center;
`

interface Props {
  prevPage: () => void
  nextPage: () => void
  zoomIn: () => void
  zoomOut: () => void
}

export function Toolbar({ prevPage, nextPage, zoomIn, zoomOut }: Props) {
  return (
    <ToolbarHeader accent>
      <button form="resume-form">Submit</button>
    </ToolbarHeader>
  )
}
