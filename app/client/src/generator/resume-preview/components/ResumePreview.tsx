import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { submit } from 'redux-form'
import { pdfjs, Document, Page } from 'react-pdf'
import { PDFDocumentProxy } from 'pdfjs-dist'
import styled from 'styled-components'
import { AppState } from 'app/types'
import { previewActions } from '../slice'
import { Toolbar } from './Toolbar'
import BlankPdf from '../assets/blank.pdf'

const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

const Wrapper = styled.output`
  background: ${(props) => props.theme.lightBlack};
  width: 60%;
  min-height: 100vh;
  overflow-y: auto;
`

const ResumePage = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5em 0;

  canvas {
    max-width: 95% !important;
    height: auto !important;
  }
`

const PdfContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

const Doc = styled(Document)`
  width: 100%;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%);
`

interface Props {
  openSettings: () => void
  closeSettings: () => void
}

export function ResumePreview({ openSettings, closeSettings }: Props) {
  const scale = document.body.clientWidth > 1440 ? 1.75 : 1
  const [pageCount, setPageCount] = useState(1)
  const [pageNumber, setPageNumber] = useState(1)
  const { resume } = useSelector((state: AppState) => state.preview)
  const { values } = useSelector((state: AppState) => state.form.resume)
  const dispatch = useDispatch()

  const handleDocumentLoadSuccess = useCallback((pdf: PDFDocumentProxy) => {
    setPageCount(pdf.numPages)
  }, [])

  const goToPrevPage = () => {
    setPageNumber((currPage) => Math.max(currPage - 1, 1))
  }

  const goToNextPage = () => {
    setPageNumber((currPage) => Math.min(currPage + 1, pageCount))
  }

  const downloadSource = () => {
    dispatch(previewActions.downloadSource(values))
  }

  const rebuildResume = () => {
    dispatch(submit('resume'))
  }

  const openInExternalWindow = () => {
    window.open(resume.url ?? BlankPdf)
  }

  return (
    <Wrapper>
      <Toolbar
        resumeUrl={resume.url || BlankPdf}
        jsonUrl={resume.jsonUrl || ''}
        downloadSource={downloadSource}
        pageNumber={pageNumber}
        goToPrevPage={goToPrevPage}
        goToNextPage={goToNextPage}
        rebuildResume={rebuildResume}
        openSettings={openSettings}
        closeSettings={closeSettings}
        openInExternalWindow={openInExternalWindow}
      />
      <PdfContainer>
        {/* To prevent a white flash whenever the PDF is regenerated, this Blank PDF document is always displayed underneath the actual PDF document. */}
        <Doc file={BlankPdf}>
          <ResumePage
            pageNumber={1}
            scale={scale}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            loading=""
          />
        </Doc>
        {resume.url && (
          <Doc
            file={resume.url}
            onLoadSuccess={handleDocumentLoadSuccess}
            loading=""
          >
            <ResumePage
              pageNumber={pageNumber}
              scale={scale}
              renderAnnotationLayer={false}
              renderTextLayer={false}
              loading=""
            />
          </Doc>
        )}
      </PdfContainer>
    </Wrapper>
  )
}
