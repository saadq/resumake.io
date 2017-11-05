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

const Button = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  min-width: 60px;
  border: 1px solid white;
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

const DownloadButton = Button.withComponent('a').extend`
  text-decoration: none;
`

const Pagination = styled.div`
  display: flex;
`

type Props = {
  src: string,
  downloadSource: () => void
}

function Toolbar({ src, downloadSource }: Props) {
  return (
    <Div>
      <div>
        <DownloadButton href={src} download="resume.pdf">
          <Icon color="white" size={14} type="picture_as_pdf" /> PDF
        </DownloadButton>
        <Button onClick={downloadSource} type="button">
          <Icon color="white" size={14} type="code" /> Source
        </Button>
      </div>
      <Pagination>
        <Button type="button">
          <Icon color="white" size={14} type="arrow_back" />
        </Button>
        <span>Page 1</span>
        <Button type="button">
          <Icon color="white" size={14} type="arrow_forward" />
        </Button>
      </Pagination>
      <div>
        <Button type="button">
          <Icon color="white" size={14} type="code" /> Code
        </Button>
        <Button type="button">
          <Icon color="white" size={14} type="code" /> Code
        </Button>
      </div>
    </Div>
  )
}

export default Toolbar
