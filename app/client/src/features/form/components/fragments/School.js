/**
 * @flow
 */

import React from 'react'
import { Divider } from '../../../../common/components'
import LabeledInput from './LabeledInput'

type Props = {
  index: number
}

function School({ index }: Props) {
  return (
    <div>
      {index > 0 ? <Divider /> : null}
      <LabeledInput
        name={`education[${index}].institution`}
        label="School Name"
        placeholder="Stanford University"
      />
      <LabeledInput
        name={`education[${index}].location`}
        label="School Location"
        placeholder="Stanford, CA"
      />
      <LabeledInput
        name={`education[${index}].studyType`}
        label="Degree"
        placeholder="BS"
      />
      <LabeledInput
        name={`education[${index}].area`}
        label="Major"
        placeholder="Computer Science"
      />
      <LabeledInput
        name={`education[${index}].gpa`}
        label="GPA"
        placeholder="3.6"
      />
      <LabeledInput
        name={`education[${index}].startDate`}
        label="Start Date"
        placeholder="Sep 2015"
      />
      <LabeledInput
        name={`education[${index}].endDate`}
        label="End Date"
        placeholder="Jun 2019"
      />
    </div>
  )
}

export default School
