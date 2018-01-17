/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { Icon } from '../../../common/components'
import { colors } from '../../../common/theme'

const Wrapper = styled.div`
  width: calc(100% - 2px);
  display: flex;
  background: ${darken(0.02, colors.background)};
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid ${colors.borders};
  border-radius: 2px;
  user-select: none;

  @media screen and (max-width: 850px) {
    flex-direction: column;
  }
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

  @media screen and (max-width: 850px) {
    width: 100%;
    justify-content: center;
    align-items: center;
    ${props => (props.hideOnMobile ? 'display: none;' : '')} &:first-child,
      last-child {
      justify-content: center;
    }
  }
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

  @media screen and (max-width: 850px) {
    border: 1px solid ${colors.borders};

    i {
      display: none;
    }
  }
`

const Pagination = styled.div`
  width: calc(100% / 3);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;

  @media screen and (max-width: 850px) {
    width: 100%;
    margin-top: 10px;
  }
`

const PageNumber = styled.span`
  font-size: 12px;
  height: 35px;
  color: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`

const PageButton = Button.extend`
  margin: 0;
  padding: 0;

  i {
    margin: 0;
    padding: 0;
  }

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
  downloadSource: () => Promise<void>,
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
    <Wrapper>
      <ButtonGroup>
        <ToolButton href={resumeURL} download="resume.pdf">
          <Icon type="file_download" /> PDF
        </ToolButton>
        <ToolButton onClick={downloadSource}>
          <Icon type="file_download" /> LaTeX
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
      <ButtonGroup hideOnMobile>
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
    </Wrapper>
  )
}

export default Toolbar
