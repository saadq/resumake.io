import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Header } from './Header'

const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
  margin-bottom: 2em;
  padding: 0;
  background: 0;
  display: flex;
  flex-direction: column;
`

const Legend = styled.legend`
  width: 85%;
  margin: 0 auto;
  text-transform: uppercase;
  font-family: Varela Round;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: 0.03em;
`

const SectionContent = styled.section`
  width: 85%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-family: Varela;
`

interface Props {
  title: string
  children: ReactNode
}

export function FormSection({ title, children }: Props) {
  return (
    <Fieldset>
      <Header>
        <Legend>{title}</Legend>
      </Header>
      <SectionContent>{children}</SectionContent>
    </Fieldset>
  )
}
