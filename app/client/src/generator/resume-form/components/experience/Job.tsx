import React from 'react'
import { Card } from 'common/components/Card'
import { InputWithLabel } from 'common/components/InputWithLabel'
import { InputListWithLabel } from 'common/components/InputListWithLabel'
import { RemoveSubsectionButton } from 'common/components/RemoveSubsectionButton'
import { Job as JobType } from '../../types'

interface Props {
  job: JobType
  removeJob: () => void
  addJobHighlight: (jobIndex: number) => void
  removeJobHighlight: (jobIndex: number, highlightIndex: number) => void
  index: number
}

export function Job({
  job,
  removeJob,
  addJobHighlight,
  removeJobHighlight,
  index
}: Props) {
  return (
    <Card marginTop="1.5em">
      <InputWithLabel
        name={`work[${index}].company`}
        label="Company Name"
        placeholder="Google"
      />
      <InputWithLabel
        name={`work[${index}].position`}
        label="Job Title"
        placeholder="Software Engineer"
      />
      <InputWithLabel
        name={`work[${index}].location`}
        label="Job Location"
        placeholder="Mountain View, CA"
      />
      <InputWithLabel
        name={`work[${index}].startDate`}
        label="Start Date"
        placeholder="May 2015"
      />
      <InputWithLabel
        name={`work[${index}].endDate`}
        label="End Date"
        placeholder="May 2017 / Present / Etc."
      />
      <InputListWithLabel
        namePrefix={`work[${index}].highlights`}
        label="Job Responsibilities"
        placeholder="Did stuff at company"
        list={job.highlights}
        addItem={() => addJobHighlight(index)}
        removeItem={(highlightIndex: number) =>
          removeJobHighlight(index, highlightIndex)
        }
      />
      <RemoveSubsectionButton type="button" onClick={removeJob}>
        X
      </RemoveSubsectionButton>
    </Card>
  )
}
