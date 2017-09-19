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
        name={`schools[${index}][name]`}
        label="School Name"
        placeholder="Stanford University"
      />
      <LabeledInput
        name={`schools[${index}][location]`}
        label="School Location"
        placeholder="Stanford, CA"
      />
      <LabeledInput
        name={`schools[${index}][degree]`}
        label="Degree"
        placeholder="BS"
      />
      <LabeledInput
        name={`schools[${index}][major]`}
        label="Major"
        placeholder="Computer Science"
      />
      <LabeledInput name={`schools[${index}][gpa]`} label="GPA" placeholder="3.6" />
      <LabeledInput
        name={`schools[${index}][graduationDate]`}
        label="Graduation Date"
        placeholder="May 2017"
      />
    </div>
  )
}

export default School
