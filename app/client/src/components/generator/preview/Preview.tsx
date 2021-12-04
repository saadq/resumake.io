import { useAtom } from 'jotai'
import { useState, useCallback } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import styled from 'styled-components'
import BlankPdf from '../../../assets/blank.pdf'
import { resumeAtom } from '../../../atoms/resume'
import { FloatingButton } from '../layout/FloatingButton'

const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

const Output = styled.output`
  background: ${(props) => props.theme.lightBlack};
  width: 50%;
  min-height: 100vh;
  overflow-y: auto;
`

const PdfContainer = styled.article`
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
  const [pageCount, setPageCount] = useState(1)
  const [pageNumber] = useState(1)
  const [scale] = useState(document.body.clientWidth > 1440 ? 1.75 : 1)

  const handleDocumentLoadSuccess = useCallback((pdf: PDFDocumentProxy) => {
    setPageCount(pdf.numPages)
  }, [])

  return (
    <Output>
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
      <FloatingButton />
    </Output>
  )
}
