import React from 'react'
import { Card } from 'common/components/Card'
import { InputWithLabel } from 'common/components/InputWithLabel'
import { RemoveSubsectionButton } from 'common/components/RemoveSubsectionButton'

interface Props {
  removeSchool: () => void
  index: number
}

export function School({ removeSchool, index }: Props) {
  return (
    <Card marginTop="1.5em">
      <InputWithLabel
        name={`education[${index}].institution`}
        label="School Name"
        placeholder="Stanford University"
      />
      <InputWithLabel
        name={`education[${index}].location`}
        label="School Location"
        placeholder="Stanford, CA"
      />
      <InputWithLabel
        name={`education[${index}].studyType`}
        label="Degree"
        placeholder="BS"
      />
      <InputWithLabel
        name={`education[${index}].area`}
        label="Major"
        placeholder="Computer Science"
      />
      <InputWithLabel
        name={`education[${index}].gpa`}
        label="GPA"
        placeholder="3.6"
      />
      <InputWithLabel
        name={`education[${index}].startDate`}
        label="Start Date"
        placeholder="Sep 2015"
      />
      <InputWithLabel
        name={`education[${index}].endDate`}
        label="End Date"
        placeholder="Jun 2019"
      />
      <RemoveSubsectionButton type="button" onClick={removeSchool}>
        X
      </RemoveSubsectionButton>
    </Card>
  )
}
