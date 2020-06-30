import React, { HTMLAttributes } from 'react'
import { IconType } from 'react-icons'
import styled from 'styled-components'
import { darken } from 'polished'

interface ButtonStyleProps {
  hasChildren?: boolean
}

const Button = styled.button<ButtonStyleProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  margin-right: 0.4em;
  height: 3em;
  width: 5.5em;
  padding: 0;
  background: ${(props) => darken(0.05, props.theme.gray)};
  color: ${(props) => props.theme.foreground};
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.45);
  position: relative;

  &:hover {
    color: ${(props) => props.theme.gray};
    background: ${(props) => props.theme.primary};
  }

  svg {
    margin-right: ${(props) => (props.hasChildren ? '4px' : '0')};
    vertical-align: top;
  }
`

const Link = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.foreground};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.lightBlack};
  }
`

interface Props extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  Icon?: IconType
  active?: boolean
  link?: string
  downloadName?: string
}

export function ToolbarButton({
  link,
  downloadName,
  Icon,
  children,
  ...props
}: Props) {
  return (
    <Button type="button" hasChildren={children != null} {...props}>
      {link ? (
        <Link href={link} download={downloadName} {...props}>
          {Icon && <Icon />}
          {children}
        </Link>
      ) : (
        <>
          {Icon && <Icon />}
          {children}
        </>
      )}
    </Button>
  )
}
