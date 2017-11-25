/**
 * @flow
 */

import React from 'react'
import styled from 'styled-components'
import {
  Divider,
  LabeledInput,
  Label,
  Input,
  Button,
  Icon
} from '../../../ui/components'
import { colors } from '../../../ui/theme'

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`

const Buttons = styled.div`
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: 10px;
`

const RoundButton = Button.extend`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 5px;
  border-color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 0px;
  background: ${colors.background};
  color: silver;
  transition: transform 0.6s;

  &:hover {
    background: ${colors.accent};
    color: white;
    transform: rotate(180deg);
  }

  &:focus {
    outline-color: silver;
    border-color: silver;
  }
`

const SmallInput = Input.extend`width: 85%;`

type Props = {
  highlights: Array<?string>,
  index: number,
  addHighlight: (index: number) => void,
  removeHighlight: (index: number) => void
}

function Job({ highlights, index, addHighlight, removeHighlight }: Props) {
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
      {highlights.map((highlight, i) => (
        <Row key={i}>
          <SmallInput
            type="text"
            name={`work[${index}].highlights[${i}]`}
            placeholder="Did cool stuff at company"
            component="input"
          />
          {i === highlights.length - 1 && (
            <Buttons>
              <RoundButton
                inverted
                type="button"
                onClick={() => addHighlight(index)}
              >
                <Icon type="add" />
              </RoundButton>
              <RoundButton
                inverted
                type="button"
                onClick={() => removeHighlight(index)}
              >
                <Icon type="remove" />
              </RoundButton>
            </Buttons>
          )}
        </Row>
      ))}
    </div>
  )
}

export default Job
