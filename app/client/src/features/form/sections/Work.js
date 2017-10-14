/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Section, Button } from '../../../shared/components'
import Job from './fragments/Job'
import {
  addJob,
  removeJob,
  addJobHighlight,
  removeJobHighlight,
  clearJobField,
  clearJobHighlightField
} from '../actions'
import type { State } from '../../../shared/types'

type Props = {
  jobCount: number,
  jobHighlights: Array<number>,
  addJob: () => void,
  removeJob: () => void,
  addJobHighlight: (index: number) => void,
  removeJobHighlight: (index: number) => void,
  clearJobHighlightField: (index: number, highlightCount: number) => void,
  clearJobField: (jobCount: number) => void
}

function Work({
  jobCount,
  jobHighlights,
  addJob,
  removeJob,
  addJobHighlight,
  removeJobHighlight,
  clearJobField,
  clearJobHighlightField
}: Props) {
  return (
    <Section heading="Your Work Experience">
      {Array.from({ length: jobCount }).map((_, index) => (
        <Job
          key={index}
          index={index}
          highlightsCount={jobHighlights[index]}
          addHighlight={addJobHighlight}
          removeHighlight={removeJobHighlight}
          clearHighlightField={clearJobHighlightField}
        />
      ))}
      <div>
        <Button onClick={addJob} type="button">
          Add Job
        </Button>
        <Button
          onClick={() => {
            removeJob()
            clearJobField(jobCount)
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
    jobCount: state.form.resume.jobCount,
    jobHighlights: state.form.resume.jobHighlights
  }
}

const actions = {
  addJob,
  removeJob,
  addJobHighlight,
  removeJobHighlight,
  clearJobField,
  clearJobHighlightField
}

export default connect(mapState, actions)(Work)
