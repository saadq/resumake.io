/**
 * @flow
 */

import React from 'react'
import { Divider, LabeledInput } from '../../../../common/components'

type Props = {
  index: number
}

function School({ index }: Props) {
  return (
    <div>
      {index > 0 ? <Divider /> : null}
      <LabeledInput
        name={`education.schools[${index}].institution`}
        label="School Name"
        placeholder="Stanford University"
      />
      <LabeledInput
        name={`education.schools[${index}].location`}
        label="School Location"
        placeholder="Stanford, CA"
      />
      <LabeledInput
        name={`education.schools[${index}].studyType`}
        label="Degree"
        placeholder="BS"
      />
      <LabeledInput
        name={`education.schools[${index}].area`}
        label="Major"
        placeholder="Computer Science"
      />
      <LabeledInput
        name={`education.schools[${index}].gpa`}
        label="GPA"
        placeholder="3.6"
      />
      <LabeledInput
        name={`education.schools[${index}].startDate`}
        label="Start Date"
        placeholder="Sep 2015"
      />
      <LabeledInput
        name={`education.schools[${index}].endDate`}
        label="End Date"
        placeholder="Jun 2019"
      />
    </div>
  )
}

export default School
