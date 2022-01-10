import React, { useCallback, useState } from 'react'
import { pdfjs, Document, DocumentProps, Page } from 'react-pdf'
import styled from 'styled-components'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const Output = styled.output`
  canvas {
    border: 1px solid black;
    margin: 1rem 0;
  }
`

type LoadCallback = Required<DocumentProps>['onLoadSuccess']

interface Props {
  url: string
}

export function Preview({ url }: Props) {
  const [pageCount, setPageCount] = useState(1)
  const [pageNumber] = useState(1)

  const onLoad: LoadCallback = useCallback((pdf) => {
    setPageCount(pdf.numPages)
  }, [])

  return (
    <Output>
      <p>Page count: {pageCount}</p>
      <p>Curr page: {pageNumber}</p>
      <Document loading="" file={url} onLoadSuccess={onLoad}>
        <Page loading="" pageNumber={pageNumber} />
      </Document>
    </Output>
  )
}
