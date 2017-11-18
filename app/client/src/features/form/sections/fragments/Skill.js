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

const Row = styled.div`
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
  margin-top: 0px;
  margin-bottom: 0px;
  margin-right: 5px;
  border-color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 0px;
  background: black;
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

type Props = {
  keywords: Array<?string>,
  index: number,
  addKeyword: (index: number) => void,
  removeKeyword: (index: number) => void
}

function Skill({ keywords, index, addKeyword, removeKeyword }: Props) {
  return (
    <div>
      {index > 0 ? <Divider /> : null}
      <LabeledInput
        name={`skills[${index}].name`}
        label="Skill Name"
        placeholder="Programming Languages"
      />
      <Label>Skill Details</Label>
      {keywords.map((keyword, i) => (
        <div key={i}>
          <MiniInput
            name={`skills[${index}].keywords[${i}]`}
            placeholder="Java"
            component="input"
          />
          {i === keywords.length - 1 && (
            <Row>
              <RoundButton
                inverted
                type="button"
                onClick={() => addKeyword(index)}
              >
                <Icon type="add" />
              </RoundButton>
              <RoundButton
                inverted
                type="button"
                onClick={() => removeKeyword(index)}
              >
                <Icon type="remove" />
              </RoundButton>
            </Row>
          )}
        </div>
      ))}
    </div>
  )
}

export default Skill
