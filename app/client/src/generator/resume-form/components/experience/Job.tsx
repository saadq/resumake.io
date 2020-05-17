import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from 'polished'
import { Card } from 'common/components/Card'
import { InputWithLabel } from 'common/components/InputWithLabel'
import { Label } from 'common/components/Label'
import { TextInput } from 'common/components/TextInput'
import { darkTheme } from 'common/theme'
import { Job as JobType } from '../../types'

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5em;
`

const RemoveJobButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  padding: 0;
  margin: 0;
`

const AddHighlightButton = styled.button`
  background: ${darkTheme.gray};
  color: ${darkTheme.primary};
  font-size: 1.25em;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  margin-top: 0.35em;
  padding: 0;
  width: 2em;
  height: 2em;
  left: 355px;
  top: 674px;
  background: #2f3237;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${lighten(0.1, darkTheme.gray)};
    color: white;
  }
`

const RemoveHighlightButton = styled.button`
  margin: 0;
  margin-left: 1em;
  padding: 0 1em;
  background: ${darken(0.05, darkTheme.gray)};
  color: ${darkTheme.foreground};
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: ${darkTheme.gray};
    background: ${darkTheme.primary};
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`

interface RemoveHighlight {
  jobIndex: number
  highlightIndex: number
}

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
      <Label>Highlights</Label>
      {job.highlights.map((highlight, highlightIndex) => (
        <Row key={highlightIndex}>
          <TextInput
            name={`work[${index}].highlights[${highlightIndex}]`}
            component="input"
          />
          <RemoveHighlightButton
            onClick={() => removeJobHighlight(index, highlightIndex)}
          >
            X
          </RemoveHighlightButton>
        </Row>
      ))}
      <ButtonWrapper>
        <AddHighlightButton onClick={() => addJobHighlight(index)}>
          +
        </AddHighlightButton>
      </ButtonWrapper>
      <RemoveJobButton type="button" onClick={removeJob}>
        X
      </RemoveJobButton>
    </Card>
  )
}
