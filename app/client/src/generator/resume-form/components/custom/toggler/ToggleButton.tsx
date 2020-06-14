import React, { HTMLAttributes } from 'react'
import { IconType } from 'react-icons'
import styled from 'styled-components'
import { darken } from 'polished'
import { darkTheme } from 'common/theme'

interface ButtonStyleProps {
  active?: boolean
}

const Button = styled.button<ButtonStyleProps>`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 1em 1.5em;
  background: ${darken(0.05, darkTheme.gray)};
  color: ${(props) =>
    props.active ? darkTheme.primary : darkTheme.foreground};
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  border: ${(props) =>
    props.active ? '1px solid #686ef3' : '1px solid transparent'};
  box-shadow: ${(props) =>
    props.active
      ? '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 0px 10px #686ef3'
      : 'none'};

  svg {
    margin-right: 4px;
  }

  &:hover {
    color: ${darkTheme.gray};
    background: ${darkTheme.primary};
  }
`

interface Props extends HTMLAttributes<HTMLButtonElement> {
  Icon: IconType
  active?: boolean
}

export function ToggleButton({ Icon, children, ...buttonProps }: Props) {
  return (
    <Button type="button" {...buttonProps}>
      <Icon />
      {children}
    </Button>
  )
}
