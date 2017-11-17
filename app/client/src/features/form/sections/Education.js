/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Section, Button } from '../../../shared/components'
import School from './fragments/School'
import { addSchool, removeSchool } from '../actions'
import type { FormValues } from '../types'
import type { State } from '../../../shared/types'

type Props = {
  education: $PropertyType<FormValues, 'education'>,
  addSchool: () => void,
  removeSchool: () => void
}

function Education({ education, addSchool, removeSchool }: Props) {
  return (
    <Section heading="Your Educational Background">
      {education.map((school, i) => school && <School key={i} index={i} />)}
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
    education: state.form.resume.values.education
  }
}

const actions = {
  addSchool,
  removeSchool
}

export default connect(mapState, actions)(Education)
