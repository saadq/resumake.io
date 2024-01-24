import { useAtom } from 'jotai'
import { useState, useCallback } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'
import styled from 'styled-components'
import Toolbar from '../core/Toolbar'
import { resumeAtom } from '../../atoms/resume'

const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

const Output = styled.output`
  grid-area: preview;
  background: ${(props) => props.theme.lightBlack};
  overflow-y: auto;
`

const PdfContainer = styled.article`
  width: 100%;
  height: 100%;
`

const ResumeDocument = styled(Document)`
  width: 100%;
`

const ResumePage = styled(Page)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5em 0 10rem 0;

  canvas {
    max-width: 95% !important;
    height: auto !important;
  }
`

export function Preview() {
  const [resume] = useAtom(resumeAtom)
  const [, setPageCount] = useState(1)
  const [pageNumber] = useState(1)
  const [scale] = useState(document.body.clientWidth > 1440 ? 1.75 : 1)

  const handleDocumentLoadSuccess = useCallback((pdf: PDFDocumentProxy) => {
    setPageCount(pdf.numPages)
  }, [])

  function getJsonUrl(): string {
    const json = JSON.stringify(resume.json)
    const blob = new Blob([json], { type: 'application/json' })
    return URL.createObjectURL(blob)
  }

  function downloadSource(): void {
    try {
      const url = resume.latex
      const link = document.createElement('a')
      link.href = url
      link.download = 'resume.tex'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url) // Clean up the URL object
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Output>
      <PdfContainer>
        {resume.url && (
          <>
            <Toolbar
              resumeURL={resume.url}
              jsonURL={getJsonUrl()}
              downloadSource={downloadSource}
            />
            <ResumeDocument
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
            </ResumeDocument>
          </>
        )}
      </PdfContainer>
    </Output>
  )
}
