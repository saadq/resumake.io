/**
* @flow
*/

import React from 'react'
import styled from 'styled-components'
import { colors } from '../../../../shared/theme'
import {
  Divider,
  LabeledInput,
  Label,
  Input,
  Button,
  Icon
} from '../../../../shared/components'

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

const RoundButton = Button.extend`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 5px;
  border-color: silver;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 0px;
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
}
`

type Props = {
  index: number,
  keywordsCount: number,
  addKeyword: (index: number) => void,
  removeKeyword: (index: number) => void,
  clearKeywordField: (index: number, keywordsCount: number) => void
}

function Project({
  index,
  keywordsCount,
  addKeyword,
  removeKeyword,
  clearKeywordField
}: Props) {
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
      <Label>Project Details</Label>
      {Array.from({ length: keywordsCount }).map((_, i) => (
        <div key={i}>
          <MiniInput
            name={`projects[${index}].keywords[${i}]`}
            label="Tools Used"
            placeholder="Java"
            component="input"
          />
          {i === keywordsCount - 1 && (
            <ButtonRow>
              <RoundButton onClick={() => addKeyword(index)} inverted>
                <Icon type="add" />
              </RoundButton>
              <RoundButton
                onClick={() => {
                  removeKeyword(index)
                  clearKeywordField(index, keywordsCount)
                }}
                inverted
              >
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
