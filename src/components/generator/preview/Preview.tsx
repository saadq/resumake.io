import { useAtom } from 'jotai'
import { useState, useCallback } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import type { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import Toolbar from '../../core/Toolbar'
import { resumeAtom } from '../../../atoms/resume'

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
  const { getValues } = useFormContext()
  const [, setPageCount] = useState(1)
  const [pageNumber] = useState(1)
  const [scale] = useState(document.body.clientWidth > 1440 ? 1.75 : 1)

  const handleDocumentLoadSuccess = useCallback((pdf: PDFDocumentProxy) => {
    setPageCount(pdf.numPages)
  }, [])

  async function downloadSource(): Promise<void> {
    try {
      const response = await fetch(
        'https://api.art3m1s.me/resumake/api/generate-source',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(getValues()) // Assuming getValues() fetches your form data
        }
      )

      console.log(response)

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const blob = await response.blob() // Get the response as a blob
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'source.zip' // Name the download as 'source.zip'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url) // Clean up the URL object
    } catch (error) {
      console.error('Error downloading the source:', error)
    }
  }

  function getJsonUrl(): string {
    const json = JSON.stringify(getValues())
    const blob = new Blob([json], { type: 'application/json' })
    return URL.createObjectURL(blob)
  }

  return (
    <Output>
      <PdfContainer>
        {/* To prevent a white flash whenever the PDF is regenerated, this extra PDF document is always displayed underneath the actual PDF document. */}
        {/* <ResumeDocument file="/blank.pdf">
          <ResumePage
            pageNumber={1}
            scale={scale}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            loading=""
          />
        </ResumeDocument> */}

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
