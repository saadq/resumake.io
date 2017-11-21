/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { Icon } from '../../ui/components'
import { sizes } from '../../ui/theme'

const Div = styled.div`
  max-width: 100%;
  width: ${sizes.preview}px;
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-top: 0px;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  border: 1px solid #ddd;
  border-radius: 2px;
`

const Button = styled.a`
  text-align: center;
  text-decoration: none;
  font-size: 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  min-width: 65px;
  background: transparent;
  border-radius: 2px;
  color: #ddd;
  padding: 0 2px;

  i {
    margin-right: 5px;
    color: #ddd;
    font-size: 14px;
  }

  &:hover {
    background: #ddd;
    color: black;
    cursor: pointer;

    i {
      color: black;
    }
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const ToolButton = Button.extend`
  border-radius: 2px;
  margin: 0 2px;

  @media screen and (max-width: 768px) {
    margin: 2px 0;
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
`

const PageNumber = styled.span`
  font-size: 12px;
  color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 10px;
`

type Props = {
  page: number,
  resumeURL: string,
  jsonURL?: string,
  downloadSource: () => void,
  prevPage: () => void,
  nextPage: () => void,
  print: (url: string) => void
}

function Toolbar({
  resumeURL,
  jsonURL,
  page,
  downloadSource,
  prevPage,
  nextPage,
  print
}: Props) {
  return (
    <Div>
      <ButtonGroup>
        <ToolButton href={resumeURL} download="resume.pdf">
          <Icon type="picture_as_pdf" /> PDF
        </ToolButton>
        <ToolButton onClick={downloadSource}>
          <Icon type="code" /> Source
        </ToolButton>
      </ButtonGroup>
      <Pagination>
        <Button onClick={prevPage}>
          <Icon type="arrow_back" />
        </Button>
        <PageNumber>Page {page}</PageNumber>
        <Button onClick={nextPage}>
          <Icon type="arrow_forward" />
        </Button>
      </Pagination>
      <ButtonGroup>
        <ToolButton href={jsonURL} download="resume.json">
          <Icon type="file_download" /> Export JSON
        </ToolButton>
        <ToolButton onClick={() => print(resumeURL)}>
          <Icon type="print" /> Print
        </ToolButton>
      </ButtonGroup>
    </Div>
  )
}

export default Toolbar
