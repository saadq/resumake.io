import React, { HTMLAttributes } from 'react'
import { IconType } from 'react-icons'
import styled from 'styled-components'
import { darken } from 'polished'

interface ButtonStyleProps {
  active?: boolean
  hasChildren?: boolean
}

const Button = styled.button<ButtonStyleProps>`
  display: flex;
  align-items: center;
  margin: 0;
  margin-right: 4px;
  padding: 1em ${(props) => (props.hasChildren ? '1.5em' : '2.75em')};
  background: ${(props) => darken(0.05, props.theme.gray)};
  color: ${(props) =>
    props.active ? props.theme.primary : props.theme.foreground};
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
      : '0px 0px 8px rgba(0, 0, 0, 0.45)'};

  &:hover {
    color: ${(props) => props.theme.gray};
    background: ${(props) => props.theme.primary};
  }

  svg {
    margin-right: ${(props) => (props.hasChildren ? '4px' : '0')};
  }
`

interface Props extends HTMLAttributes<HTMLButtonElement> {
  Icon?: IconType
  active?: boolean
}

export function ToolbarButton({ Icon, children, ...buttonProps }: Props) {
  return (
    <Button hasChildren={children != null} type="button" {...buttonProps}>
      {Icon && <Icon />}
      {children}
    </Button>
  )
}
