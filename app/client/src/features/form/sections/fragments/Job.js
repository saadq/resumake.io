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
  margin-top: 10px;
  margin-bottom: 10px;
  margin-right: 5px;
  border-color: silver;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: silver;

  &:hover {
    background: silver;
    color: white;
  }
`

type Props = {
  index: number,
  highlightsCount: number,
  addHighlight: (index: number) => void,
  removeHighlight: (index: number) => void,
  clearHighlightField: (index: number, highlightsCount: number) => void
}

function Job({ index, highlightsCount, addHighlight, removeHighlight, clearHighlightField }: Props) {
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
      {Array.from({ length: highlightsCount }).map((_, i) => (
        <div key={i}>
          <Input
            type="text"
            name={`work[${index}].highlights[${i}]`}
            placeholder="Did cool stuff at company"
            component="input"
          />
          {i === highlightsCount - 1 && (
            <div>
              <RoundButton
                inverted
                type="button"
                onClick={() => addHighlight(index)}
              >
                +
              </RoundButton>
              <RoundButton
                inverted
                type="button"
                onClick={() => {
                  removeHighlight(index)
                  clearHighlightField(index, highlightsCount)
                }}
              >
                -
              </RoundButton>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default Job
