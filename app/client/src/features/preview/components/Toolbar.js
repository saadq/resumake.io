/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { Icon } from '../../../shared/components'
import { sizes } from '../../../shared/theme'

const Div = styled.div`
  max-width: 100%;
  width: ${sizes.preview}px;
  background: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  margin: 10px;
  border: 1px solid white;
  border-radius: 2px;
`

const Button = styled.a`
  text-decoration: none;
  font-size: 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  min-width: 65px;
  background: transparent;
  border-radius: 2px;
  color: white;
  padding: 0 2px;

  i {
    margin-right: 5px;
  }

  &:hover {
    background: white;
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
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
`

type Props = {
  url: string,
  page: number,
  downloadSource: () => void,
  prevPage: () => void,
  nextPage: () => void
}

function Toolbar({ url, page, downloadSource, prevPage, nextPage }: Props) {
  return (
    <Div>
      <ButtonGroup>
        <ToolButton href={url} download="resume.pdf">
          <Icon color="white" size={14} type="picture_as_pdf" /> PDF
        </ToolButton>
        <ToolButton onClick={downloadSource} type="button">
          <Icon color="white" size={14} type="code" /> Source
        </ToolButton>
      </ButtonGroup>
      <Pagination>
        <Button onClick={prevPage} type="button">
          <Icon color="white" size={14} type="arrow_back" />
        </Button>
        <PageNumber>Page {page}</PageNumber>
        <Button onClick={nextPage} type="button">
          <Icon color="white" size={14} type="arrow_forward" />
        </Button>
      </Pagination>
      <ButtonGroup>
        <ToolButton type="button">
          <Icon color="white" size={14} type="file_download" /> Export
        </ToolButton>
        <ToolButton type="button">
          <Icon color="white" size={14} type="print" /> Print
        </ToolButton>
      </ButtonGroup>
    </Div>
  )
}

export default Toolbar
