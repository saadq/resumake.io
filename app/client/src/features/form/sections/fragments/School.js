/**
 * @flow
 */

import React from 'react'
import LabeledInput from '../../../../shared/components/LabeledInput'

type Props = {
  index: number
}

function School({ index }: Props) {
  return (
    <div className="school">
      {index > 0 ? <hr /> : null}
      <LabeledInput
        name={`education[${index}].name`}
        label="School Name"
        placeholder="Stanford University"
      />
      <LabeledInput
        name={`education[${index}].location`}
        label="School Location"
        placeholder="Stanford, CA"
      />
      <LabeledInput
        name={`education[${index}].degree`}
        label="Degree"
        placeholder="BS"
      />
      <LabeledInput
        name={`education[${index}].major`}
        label="Major"
        placeholder="Computer Science"
      />
      <LabeledInput name={`education[${index}].gpa`} label="GPA" placeholder="3.6" />
      <LabeledInput
        name={`education[${index}].graduationDate`}
        label="Graduation Date"
        placeholder="May 2017"
      />
    </div>
  )
}

export default School
