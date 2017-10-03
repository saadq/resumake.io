/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Section, Button } from '../../../shared/components'
import Job from './fragments/Job'
import { addJob, removeJob, clearJobField } from '../actions'
import type { State } from '../../../shared/types'

type Props = {
  jobCount: number,
  addJob: () => void,
  removeJob: () => void,
  clearJobField: () => void
}

function Work({ jobCount, addJob, removeJob, clearJobField }: Props) {
  return (
    <Section heading="YOUR WORK EXPERIENCE">
      {Array.from({ length: jobCount }).map((_, index) => (
        <Job key={index} index={index} />
      ))}
      <div className="section-buttons">
        <Button inverted onClick={addJob} type="button">
          Add Job
        </Button>
        <Button
          inverted
          onClick={() => {
            removeJob()
            clearJobField()
          }}
          type="button"
        >
          Remove Job
        </Button>
      </div>
    </Section>
  )
}

function mapState(state: State) {
  return {
    jobCount: state.form.resume.jobCount
  }
}

const actions = {
  addJob,
  removeJob,
  clearJobField
}

export default connect(mapState, actions)(Work)
