import React, { useState, useCallback } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import { PDFDocumentProxy } from 'pdfjs-dist'
import styled from 'styled-components'
import { Toolbar } from './Toolbar'
import BlankPDF from '../assets/blank.pdf'

const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

const Wrapper = styled.output`
  background: ${(props) => props.theme.lightBlack};
  width: 55%;
  min-height: 100vh;
  overflow-y: auto;
`

const ResumePage = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1.5em;

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

  const handleDocumentLoadSuccess = useCallback((pdf: PDFDocumentProxy) => {
    setPageCount(pdf.numPages)
  }, [])

  const prevPage = () => {
    setPageNumber((currPage) => Math.min(currPage + 1, pageCount))
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

  return (
    <Wrapper>
      <Toolbar
        prevPage={prevPage}
        nextPage={nextPage}
        zoomIn={zoomIn}
        zoomOut={zoomOut}
      />
      <Document file={BlankPDF} onLoadSuccess={handleDocumentLoadSuccess}>
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
