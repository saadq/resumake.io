import React from 'react'
import { Card } from 'common/components/Card'
import { InputWithLabel } from 'common/components/InputWithLabel'
import { RemoveSubsectionButton } from 'common/components/RemoveSubsectionButton'

interface Props {
  removeAward: () => void
  index: number
}

export function Award({ removeAward, index }: Props) {
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
      <RemoveSubsectionButton type="button" onClick={removeAward}>
        X
      </RemoveSubsectionButton>
    </Card>
  )
}
