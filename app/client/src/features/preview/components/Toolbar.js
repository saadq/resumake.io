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
  margin-bottom: 10px;
`

const Button = styled.a`
  text-decoration: none;
  font-size: 12px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  min-width: 70px;
  background: transparent;
  color: white;
  box-sizing: border-box;

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

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`

const ToolButton = Button.extend`
  border: 1px solid white;
  border-radius: 2px;
  margin: 0 2px;

  :first-of-type {
    margin-left: 0;
  }

  :last-of-type {
    margin-right: 0;
  }

  @media screen and (max-width: 768px) {
    margin: 2px 0;
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid white;
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

const PageButton = Button.extend`
  :first-of-type {
    border-right: none;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
  }
  :last-of-type {
    border-left: none;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
  }
`

type Props = {
  src: string,
  downloadSource: () => void
}

function Toolbar({ src, downloadSource }: Props) {
  return (
    <Div>
      <ButtonGroup>
        <ToolButton href={src} download="resume.pdf">
          <Icon color="white" size={14} type="picture_as_pdf" /> PDF
        </ToolButton>
        <ToolButton onClick={downloadSource} type="button">
          <Icon color="white" size={14} type="code" /> Source
        </ToolButton>
      </ButtonGroup>
      <Pagination>
        <PageButton type="button">
          <Icon color="white" size={14} type="arrow_back" />
        </PageButton>
        <PageNumber>Page 1</PageNumber>
        <PageButton type="button">
          <Icon color="white" size={14} type="arrow_forward" />
        </PageButton>
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
