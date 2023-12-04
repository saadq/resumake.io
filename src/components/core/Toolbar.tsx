import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import Icon from './Icon'
import { colors } from '../../theme'

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

interface ButtonGroupProps {
  hideOnMobile?: boolean
}

const ButtonGroup = styled.div<ButtonGroupProps>`
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
    ${(props) => (props.hideOnMobile ? 'display: none;' : '')} &:first-child,
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
const ToolButton = styled(Button)`
  border-radius: 2px;
  margin: 0 2px;

  @media screen and (max-width: 850px) {
    border: 1px solid ${colors.borders};

    i {
      display: none;
    }
  }
`

type Props = {
  resumeURL: string
  jsonURL?: string
  downloadSource: () => Promise<void>
}

function Toolbar({ resumeURL, jsonURL, downloadSource }: Props) {
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
    </Wrapper>
  )
}

export default Toolbar
