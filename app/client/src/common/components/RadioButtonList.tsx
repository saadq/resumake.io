import React from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'
import { Card } from './Card'
import { Label } from './Label'

const Wrapper = styled.div`
  margin-top: 1.25em;
`

const RadioPair = styled.div`
  display: flex;
  align-items: center;
`

const ListLabel = Label.withComponent('span')

interface Props {
  name: string
  items: Array<{ value: string; label: string }>
}

export function RadioButtonList({ name, items }: Props) {
  return (
    <Wrapper>
      <ListLabel>Section Type</ListLabel>
      <Card
        flex
        flexDirection="row"
        justifyContent="space-around"
        background="#111314"
        padding="2em 1em"
      >
        {items.map((item, i) => (
          <RadioPair key={i}>
            <Field
              name="sex"
              component="input"
              type="radio"
              value={item.value}
              style={{ margin: 0, marginRight: 6 }}
            />
            <label>{item.label}</label>
          </RadioPair>
        ))}
      </Card>
    </Wrapper>
  )
}
