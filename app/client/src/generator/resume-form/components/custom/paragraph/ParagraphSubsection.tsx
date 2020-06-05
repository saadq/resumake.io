import React from 'react'
import { Card } from 'common/components/Card'
import { InputWithLabel } from 'common/components/InputWithLabel'
import { TextareaWithLabel } from 'common/components/TextareaWithLabel'
import { RemoveSubsectionButton } from 'common/components/RemoveSubsectionButton'

interface Props {
  namePrefix: string
  removeParagraphSubsection: () => void
  subsectionIndex: number
}

export function ParagraphSubsection({
  namePrefix,
  removeParagraphSubsection,
  subsectionIndex
}: Props) {
  return (
    <Card marginTop="1.5em">
      <InputWithLabel
        name={`${namePrefix}[${subsectionIndex}].topLeftText`}
        label="Top Left Text"
        placeholder="Top Left"
      />
      <InputWithLabel
        name={`${namePrefix}[${subsectionIndex}].topRightText`}
        label="Top Right Text"
        placeholder="Top Right"
      />
      <InputWithLabel
        name={`${namePrefix}[${subsectionIndex}].bottomLeftText`}
        label="Bottom Left Text"
        placeholder="Bottom Left"
      />
      <InputWithLabel
        name={`${namePrefix}[${subsectionIndex}].bottomRightText`}
        label="Bottom Right Text"
        placeholder="Bottom Right"
      />
      <TextareaWithLabel
        name={`${namePrefix}[${subsectionIndex}].paragraph`}
        label="Paragraph"
        placeholder="Long description of whatever you want to talk about"
      />
      <RemoveSubsectionButton type="button" onClick={removeParagraphSubsection}>
        X
      </RemoveSubsectionButton>
    </Card>
  )
}
