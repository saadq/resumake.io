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
  RoundButton,
  Icon
} from '../../../../common/components'

const ButtonRow = styled.div`
  margin-left: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`

const MiniInput = Input.extend`
  width: 20%;

  @media screen and (max-width: 768px) {
    width: 60%;
  }
`

type Props = {
  keywords: Array<?string>,
  index: number,
  addKeyword: (index: number) => void,
  removeKeyword: (index: number) => void
}

function Project({ keywords, index, addKeyword, removeKeyword }: Props) {
  return (
    <div>
      {index > 0 ? <Divider /> : null}
      <LabeledInput
        name={`projects[${index}].name`}
        label="Project Name"
        placeholder="Piper Chat"
      />
      <LabeledInput
        name={`projects[${index}].description`}
        label="Project Description"
        placeholder="A video chat app with great picture quality."
      />
      <LabeledInput
        name={`projects[${index}].url`}
        label="Link to Project"
        placeholder="http://piperchat.com"
      />
      <Label>Tools Used</Label>
      {keywords.map((_, i) => (
        <div key={i}>
          <MiniInput
            name={`projects[${index}].keywords[${i}]`}
            placeholder="Java"
            component="input"
          />
          {i === keywords.length - 1 && (
            <ButtonRow>
              <RoundButton inverted onClick={() => addKeyword(index)}>
                <Icon type="add" />
              </RoundButton>
              <RoundButton inverted onClick={() => removeKeyword(index)}>
                <Icon type="remove" />
              </RoundButton>
            </ButtonRow>
          )}
        </div>
      ))}
    </div>
  )
}

export default Project
