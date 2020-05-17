import React, { HTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

const baseStyles = css`
  font-family: Varela Round;
  font-style: normal;
  font-weight: normal;
  font-size: 1em;
  line-height: 22px;
  letter-spacing: 0.03em;

  color: #c0c5ce;
  margin: 0;
  padding: 0;
`

const H1 = styled.h1`
  ${baseStyles}
  font-size: 2em;
`

const H2 = styled.h2`
  ${baseStyles}
  font-size: 1.15em;
`

const H3 = styled.h3`
  ${baseStyles}
`

const H4 = styled.h4`
  ${baseStyles}
`

const H5 = styled.h5`
  ${baseStyles}
`

const H6 = styled.h6`
  ${baseStyles}
`

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  level: 1 | 2 | 3 | 4 | 5 | 6
}

export function Heading({ level, children, ...props }: Props) {
  switch (level) {
    case 1:
      return <H1 {...props}>{children}</H1>
    case 2:
      return <H2 {...props}>{children}</H2>
    case 3:
      return <H3 {...props}>{children}</H3>
    case 4:
      return <H4 {...props}>{children}</H4>
    case 5:
      return <H5 {...props}>{children}</H5>
    case 6:
      return <H6 {...props}>{children}</H6>
    default:
      return <H1 {...props}>{children}</H1>
  }
}
