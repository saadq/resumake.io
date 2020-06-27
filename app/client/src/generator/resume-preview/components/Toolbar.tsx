import React from 'react'
import styled from 'styled-components'
import {
  AiOutlineDownload as DownloadIcon,
  AiOutlineZoomIn as ZoomInIcon,
  AiOutlineZoomOut as ZoomOutIcon,
  AiOutlinePrinter as PrintIcon
} from 'react-icons/ai'
import { Header } from 'common/components/Header'
import { ToolbarButton } from './ToolbarButton'

const ToolbarHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  padding: 1em 0.75em;
`

const ButtonGroup = styled.div`
  display: flex;
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
      <ButtonGroup>
        <ToolbarButton Icon={DownloadIcon}>JSON</ToolbarButton>
        <ToolbarButton Icon={DownloadIcon}>PDF</ToolbarButton>
        <ToolbarButton Icon={DownloadIcon}>TEX</ToolbarButton>
      </ButtonGroup>
      <div style={{ display: 'flex' }}>
        <div onClick={prevPage}>&lt;</div>
        <div style={{ margin: '0 1em' }}>Page 1</div>
        <div onClick={nextPage}>&gt;</div>
      </div>
      <ButtonGroup>
        <ToolbarButton onClick={zoomOut} Icon={ZoomOutIcon} />
        <ToolbarButton onClick={zoomIn} Icon={ZoomInIcon} />
        <ToolbarButton Icon={PrintIcon} />
      </ButtonGroup>
    </ToolbarHeader>
  )
}
