import React from 'react'
import styled from 'styled-components'
import { Card } from 'common/components/Card'
import { InputWithLabel } from 'common/components/InputWithLabel'
import { School as SchoolType } from '../../types'

const Button = styled.button`
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

interface Props {
  school: SchoolType
  removeSchool: () => void
  index: number
}

export function School({ school, removeSchool, index }: Props) {
  return (
    <Card marginTop="1.5em">
      <InputWithLabel
        name={`education[${index}].institution`}
        label="School Name"
        placeholder="Stanford University"
      />
      <InputWithLabel
        name={`education[${index}].location`}
        label="School Location"
        placeholder="Stanford, CA"
      />
      <InputWithLabel
        name={`education[${index}].studyType`}
        label="Degree"
        placeholder="BS"
      />
      <InputWithLabel
        name={`education[${index}].area`}
        label="Major"
        placeholder="Computer Science"
      />
      <InputWithLabel
        name={`education[${index}].gpa`}
        label="GPA"
        placeholder="3.6"
      />
      <InputWithLabel
        name={`education[${index}].startDate`}
        label="Start Date"
        placeholder="Sep 2015"
      />
      <InputWithLabel
        name={`education[${index}].endDate`}
        label="End Date"
        placeholder="Jun 2019"
      />
      <Button type="button" onClick={removeSchool}>
        X
      </Button>
    </Card>
  )
}
