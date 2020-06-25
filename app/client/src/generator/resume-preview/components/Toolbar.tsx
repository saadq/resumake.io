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
        <div>&lt;</div>
        <div style={{ margin: '0 1em' }}>Page 1</div>
        <div>&gt;</div>
      </div>
      <ButtonGroup>
        <ToolbarButton Icon={ZoomOutIcon} />
        <ToolbarButton Icon={ZoomInIcon} />
        <ToolbarButton Icon={PrintIcon} />
      </ButtonGroup>
    </ToolbarHeader>
  )
}
