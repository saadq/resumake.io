/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import Section from './Section'
import { Button, LabeledInput } from '../../../../common/components'
import { School } from '..'
import { addSchool, removeSchool } from '../../actions'
import type { Education as EducationType } from '../../types'
import type { State } from '../../../../app/types'

type Props = {
  education: $PropertyType<EducationType, 'schools'>,
  addSchool: () => void,
  removeSchool: () => void
}

function Education({ education, addSchool, removeSchool }: Props) {
  return (
    <Section heading="Your Educational Background">
      <LabeledInput
        name="education.heading"
        label="Section Heading"
        placeholder="Education"
      />
      {education.map((school, i) => <School key={i} index={i} />)}
      <Button onClick={addSchool} type="button">
        Add School
      </Button>
      <Button onClick={removeSchool} type="button">
        Remove School
      </Button>
    </Section>
  )
}

function mapState(state: State) {
  return {
    education: state.form.resume.values.education.schools
  }
}

const mapActions = {
  addSchool,
  removeSchool
}

export default connect(mapState, mapActions)(Education)
