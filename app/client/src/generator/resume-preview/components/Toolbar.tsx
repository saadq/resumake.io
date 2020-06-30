import React from 'react'
import styled from 'styled-components'
import {
  AiOutlineDownload as DownloadIcon,
  AiOutlineZoomIn as ZoomInIcon,
  AiOutlineZoomOut as ZoomOutIcon,
  AiOutlineArrowLeft as LeftArrowIcon,
  AiOutlineArrowRight as RightArrowIcon
} from 'react-icons/ai'
import { FiExternalLink as OpenInExternalWindowIcon } from 'react-icons/fi'
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

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`

interface Props {
  jsonUrl: string
  resumeUrl?: string
  downloadSource: () => void
  prevPage: () => void
  nextPage: () => void
  zoomIn: () => void
  zoomOut: () => void
  openInExternalWindow: () => void
}

export function Toolbar({
  resumeUrl,
  jsonUrl,
  downloadSource,
  prevPage,
  nextPage,
  zoomIn,
  zoomOut,
  openInExternalWindow
}: Props) {
  return (
    <ToolbarHeader accent>
      <ButtonGroup>
        <ToolbarButton
          link={jsonUrl}
          downloadName="resume.json"
          Icon={DownloadIcon}
        >
          JSON
        </ToolbarButton>
        <ToolbarButton
          link={resumeUrl}
          downloadName="resume.pdf"
          Icon={DownloadIcon}
        >
          PDF
        </ToolbarButton>
        <ToolbarButton onClick={downloadSource} Icon={DownloadIcon}>
          TEX
        </ToolbarButton>
      </ButtonGroup>
      <Pagination>
        <LeftArrowIcon onClick={prevPage} />
        <div style={{ margin: '0 1em' }}>Page 1</div>
        <RightArrowIcon onClick={nextPage} />
      </Pagination>
      <ButtonGroup>
        <ToolbarButton onClick={zoomOut} Icon={ZoomOutIcon} />
        <ToolbarButton onClick={zoomIn} Icon={ZoomInIcon} />
        <ToolbarButton
          onClick={openInExternalWindow}
          Icon={OpenInExternalWindowIcon}
        />
      </ButtonGroup>
    </ToolbarHeader>
  )
}
