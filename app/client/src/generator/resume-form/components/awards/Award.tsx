import React from 'react'
import styled from 'styled-components'
import { Card } from 'common/components/Card'
import { InputWithLabel } from 'common/components/InputWithLabel'
import { Award as AwardType } from '../../types'

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  padding: 0;
  margin: 0;
`

interface Props {
  award: AwardType
  removeAward: () => void
  index: number
}

export function Award({ award, removeAward, index }: Props) {
  return (
    <Card marginTop="1.5em">
      <InputWithLabel
        name={`awards[${index}].title`}
        label="Award Name"
        placeholder="Supreme Hacker"
      />
      <InputWithLabel
        name={`awards[${index}].date`}
        label="Award Date"
        placeholder="May 2015"
      />
      <InputWithLabel
        name={`awards[${index}].awarder`}
        label="Awarder"
        placeholder="HackNY"
      />
      <InputWithLabel
        name={`awards[${index}].summary`}
        label="Summary"
        placeholder="Recognized for creating the most awesome project at a hackathon."
      />
      <Button type="button" onClick={removeAward}>
        X
      </Button>
    </Card>
  )
}
