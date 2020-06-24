import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { Header } from 'common/components/Header'

const ToolbarHeader = styled(Header)`
  display: flex;
  justify-content: center;
`

const ToolbarButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.75em 1.5em;
  background: ${(props) => darken(0.03, props.theme.gray)};
  border: 0;
  color: ${(props) => props.theme.foreground};
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.45);
  margin-right: 4px;

  &:hover {
    color: ${(props) => props.theme.gray};
    background: ${(props) => props.theme.primary};
  }
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
      <ToolbarButton>JSON</ToolbarButton>
      <ToolbarButton>PDF</ToolbarButton>
      <ToolbarButton>TEX</ToolbarButton>
    </ToolbarHeader>
  )
}
