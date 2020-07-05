import React from 'react'
import styled from 'styled-components'
import {
  AiOutlineDownload as DownloadIcon,
  AiOutlineArrowLeft as LeftArrowIcon,
  AiOutlineArrowRight as RightArrowIcon
} from 'react-icons/ai'
import {
  IoMdRefresh as RefreshIcon,
  IoMdSettings as SettingsIcon
} from 'react-icons/io'
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
  pageNumber?: number
  downloadSource: () => void
  goToPrevPage: () => void
  goToNextPage: () => void
  rebuildResume: () => void
  openInExternalWindow: () => void
  openSettings: () => void
}

export function Toolbar({
  resumeUrl,
  jsonUrl,
  downloadSource,
  pageNumber,
  goToPrevPage,
  goToNextPage,
  rebuildResume,
  openInExternalWindow,
  openSettings
}: Props) {
  return (
    <ToolbarHeader accent>
      <ButtonGroup>
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
        <ToolbarButton
          link={jsonUrl}
          downloadName="resume.json"
          Icon={DownloadIcon}
        >
          JSON
        </ToolbarButton>
      </ButtonGroup>
      <Pagination>
        <LeftArrowIcon onClick={goToPrevPage} />
        <div style={{ margin: '0 1em' }}>Page {pageNumber}</div>
        <RightArrowIcon onClick={goToNextPage} />
      </Pagination>
      <ButtonGroup>
        <ToolbarButton onClick={rebuildResume} Icon={RefreshIcon} />
        <ToolbarButton
          onClick={openInExternalWindow}
          Icon={OpenInExternalWindowIcon}
        />
        <ToolbarButton onClick={openSettings} Icon={SettingsIcon} />
      </ButtonGroup>
    </ToolbarHeader>
  )
}
