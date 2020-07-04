import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
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

export function ResumePreview() {
  const initialScale = document.body.clientWidth > 1440 ? 1.75 : 1
  const [scale, setScale] = useState(initialScale)
  const [pageCount, setPageCount] = useState(1)
  const [pageNumber, setPageNumber] = useState(1)
  const { resume } = useSelector((state: AppState) => state.preview)
  const { values } = useSelector((state: AppState) => state.form.resume)
  const dispatch = useDispatch()

  const handleDocumentLoadSuccess = useCallback((pdf: PDFDocumentProxy) => {
    setPageCount(pdf.numPages)
  }, [])

  const prevPage = () => {
    setPageNumber((currPage) => Math.max(currPage - 1, 1))
  }

  const nextPage = () => {
    setPageNumber((currPage) => Math.min(currPage + 1, pageCount))
  }

  const zoomIn = () => {
    setScale((currScale) => Math.min(currScale + 0.1, initialScale))
  }

  const zoomOut = () => {
    setScale((currScale) => Math.max(currScale - 0.1, 0.5))
  }

  const downloadSource = () => {
    dispatch(previewActions.downloadSource(values))
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
        prevPage={prevPage}
        nextPage={nextPage}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
        openInExternalWindow={openInExternalWindow}
      />
      <Document
        file={resume.url || BlankPdf}
        onLoadSuccess={handleDocumentLoadSuccess}
        loading=""
      >
        <ResumePage
          pageNumber={pageNumber}
          scale={scale}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
    </Wrapper>
  )
}
