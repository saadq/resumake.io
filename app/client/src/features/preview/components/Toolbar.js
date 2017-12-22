/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { Icon } from '../../ui/components'
import { colors } from '../../ui/theme'

const Div = styled.div`
  max-width: 100%;
  width: 85%;
  background: ${colors.background};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin-top: 0px;
  margin-right: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  border-radius: 2px;
`

const ButtonGroup = styled.div`
  width: calc(100% / 3);
  display: flex;
  justify-content: center;
  align-items: center;

  &:first-child {
    justify-content: flex-start;
  }

  &:last-child {
    justify-content: flex-end;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const Button = styled.a`
  border: 1px solid ${colors.borders};
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
    font-size: 20px;
  }

  &:hover {
    color: ${colors.primary};
    cursor: pointer;

    i {
      color: ${colors.primary};
    }
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
  width: calc(100% / 3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
`

const PageNumber = styled.span`
  font-size: 12px;
  height: 35px;
  border-top: 1px solid ${colors.borders};
  border-bottom: 1px solid ${colors.borders};
  color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 10px;
`

const PageButton = Button.extend`
  &:first-of-type {
    border-right: none;
  }

  &:last-of-type {
    border-left: none;
  }
`

type Props = {
  currPage: number,
  resumeURL: string,
  jsonURL?: string,
  downloadSource: () => void,
  prevPage: () => void,
  nextPage: () => void,
  zoomIn: () => void,
  zoomOut: () => void,
  print: (url: string) => void
}

function Toolbar({
  resumeURL,
  jsonURL,
  currPage,
  downloadSource,
  prevPage,
  nextPage,
  print,
  zoomIn,
  zoomOut
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
        <ToolButton href={jsonURL} download="resume.json">
          <Icon type="file_download" /> JSON
        </ToolButton>
      </ButtonGroup>
      <Pagination>
        <PageButton onClick={prevPage}>
          <Icon type="arrow_back" />
        </PageButton>
        <PageNumber>Page {currPage}</PageNumber>
        <PageButton onClick={nextPage}>
          <Icon type="arrow_forward" />
        </PageButton>
      </Pagination>
      <ButtonGroup>
        <ToolButton onClick={zoomOut}>
          <Icon type="zoom_out" />
        </ToolButton>
        <ToolButton onClick={zoomIn}>
          <Icon type="zoom_in" />
        </ToolButton>
        <ToolButton onClick={() => print(resumeURL)}>
          <Icon type="print" />
        </ToolButton>
      </ButtonGroup>
    </Div>
  )
}

export default Toolbar
