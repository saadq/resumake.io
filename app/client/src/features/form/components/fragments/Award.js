/**
 * @flow
 */

import React from 'react'
import { Divider, LabeledInput } from '../../../../common/components'

type Props = {
  index: number
}

function Award({ index }: Props) {
  return (
    <div>
      {index > 0 ? <Divider /> : null}
      <LabeledInput
        name={`awards[${index}].title`}
        label="Award Name"
        placeholder="Supreme Hacker"
      />
      <LabeledInput
        name={`awards[${index}].date`}
        label="Award Date"
        placeholder="May 2015"
      />
      <LabeledInput
        name={`awards[${index}].awarder`}
        label="Awarder"
        placeholder="HackNY"
      />
      <LabeledInput
        name={`awards[${index}].summary`}
        label="Summary"
        placeholder="Recognized for creating the most awesome project at a hackathon."
      />
    </div>
  )
}

export default Award
