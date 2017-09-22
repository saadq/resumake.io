/**
 * @flow
 */

import React from 'react'
import { Divider, LabeledInput } from '../../../../shared/components'

type Props = {
  index: number
}

function Job({ index }: Props) {
  return (
    <div>
      {index > 0 ? <Divider /> : null}
      <LabeledInput
        name={`work[${index}].company`}
        label="Company Name"
        placeholder="Google"
      />
      <LabeledInput
        name={`work[${index}].position`}
        label="Job Title"
        placeholder="Software Engineer"
      />
      <LabeledInput
        name={`work[${index}].location`}
        label="Job Location"
        placeholder="Mountain View, CA"
      />
      <LabeledInput
        name={`work[${index}].startDate`}
        label="Start Date"
        placeholder="May 2015"
      />
      <LabeledInput
        name={`work[${index}].endDate`}
        label="End Date"
        placeholder="May 2017 / Present / Etc."
      />
      <LabeledInput
        name={`work[${index}].highlights`}
        label="Job Responsibilities"
        placeholder="Created developer tools for the programmers at Google."
      />
    </div>
  )
}

export default Job
