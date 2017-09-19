/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import Section from '../../../shared/components/Section'
import School from './fragments/School'
import { addSchool, removeSchool } from '../actions'
import type { State } from '../../../shared/types'

type Props = {
  schoolCount: number,
  addSchool: () => void,
  removeSchool: () => void
}

function Education({ schoolCount, addSchool, removeSchool }: Props) {
  return (
    <Section heading="Your Educational Background">
      {Array.from({ length: schoolCount }).map((_, index) => (
        <School key={index} index={index} />
      ))}
      <div className="section-buttons">
        <button onClick={addSchool} type="button">
          Add School
        </button>
        <button onClick={removeSchool} type="button">
          Remove School
        </button>
      </div>
    </Section>
  )
}

function mapState(state: State) {
  return {
    schoolCount: state.form.resume.schoolCount
  }
}

const actions = {
  addSchool,
  removeSchool
}

export default connect(mapState, actions)(Education)
