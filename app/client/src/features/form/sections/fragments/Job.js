/**
* @flow
*/

import React from 'react'
import {
  Divider,
  LabeledInput,
  Label,
  Input,
  Button
} from '../../../../shared/components'

const RoundButton = Button.extend`
  margin: 0;
  border-color: silver;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: black;

  &:hover {
    background: silver;
  }
`

type Props = {
  index: number
}

const length = 3

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
      <Label>Job Responsibilities</Label>
      {Array.from({ length }).map((_, i) => (
        <div>
          <Input
            key={i}
            type="text"
            name={`jobs[${index}].duties[${i}]`}
            placeholder="Did cool stuff at company"
            component="input"
          />
          {i === length - 1 && <RoundButton inverted>+</RoundButton>}
        </div>
      ))}
    </div>
  )
}

export default Job
