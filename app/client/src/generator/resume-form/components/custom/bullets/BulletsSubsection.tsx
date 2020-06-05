import React from 'react'
import { Card } from 'common/components/Card'
import { InputWithLabel } from 'common/components/InputWithLabel'
import { InputListWithLabel } from 'common/components/InputListWithLabel'
import { RemoveSubsectionButton } from 'common/components/RemoveSubsectionButton'
import { BulletsSubsection as BulletsSubsectionType } from '../../../types/form'

interface Props {
  subsection: BulletsSubsectionType
  namePrefix: string
  addBullet: (subsectionIndex: number) => void
  removeBullet: (subsectionIndex: number, bulletIndex: number) => void
  removeBulletsSubsection: () => void
  subsectionIndex: number
}

export function BulletsSubsection({
  subsection,
  namePrefix,
  addBullet,
  removeBullet,
  removeBulletsSubsection,
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
      <InputListWithLabel
        namePrefix={`${namePrefix}[${subsectionIndex}].bullets`}
        label="Bullets"
        placeholder="This is an example bullet point"
        list={subsection.bullets}
        addItem={() => addBullet(subsectionIndex)}
        removeItem={(bulletIndex: number) =>
          removeBullet(subsectionIndex, bulletIndex)
        }
      />
      <RemoveSubsectionButton type="button" onClick={removeBulletsSubsection}>
        X
      </RemoveSubsectionButton>
    </Card>
  )
}
