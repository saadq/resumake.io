import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Card } from 'common/components/Card'
import { Label } from 'common/components/Label'

const ListLabel = styled(Label.withComponent('span'))`
  margin-top: 1.5em;
`

interface Props {
  label: string
  children: ReactNode
}

export function LabeledCard({ label, children }: Props) {
  return (
    <>
      <ListLabel>{label}</ListLabel>
      <Card
        flex
        flexDirection="row"
        justifyContent="space-around"
        padding="2em 1em"
      >
        {children}
      </Card>
    </>
  )
}
