/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import Section from './Section'
import { Button, LabeledInput, Divider } from '../../../../common/components'
import { Job } from '..'
import {
  addJob,
  removeJob,
  addJobHighlight,
  removeJobHighlight
} from '../../actions'
import type { Work as WorkType } from '../../types'
import type { State } from '../../../../app/types'

type Props = {
  work: $PropertyType<WorkType, 'jobs'>,
  jobCount: number,
  jobHighlights: Array<number>,
  addJob: () => void,
  removeJob: () => void,
  addJobHighlight: (index: number) => void,
  removeJobHighlight: (index: number) => void
}

function Work({
  work,
  addJob,
  removeJob,
  addJobHighlight,
  removeJobHighlight
}: Props) {
  return (
    <Section heading="Your Work Experience">
      <LabeledInput
        name="work.heading"
        label="Section Heading"
        placeholder="Work Experience"
      />
      <Divider />
      {work.map((job, i) => (
        <Job
          key={i}
          index={i}
          highlights={job.highlights}
          addHighlight={addJobHighlight}
          removeHighlight={removeJobHighlight}
        />
      ))}
      <Button onClick={addJob} type="button">
        Add Job
      </Button>
      <Button onClick={removeJob} type="button">
        Remove Job
      </Button>
    </Section>
  )
}

function mapState(state: State) {
  return {
    work: state.form.resume.values.work.jobs
  }
}

const mapActions = {
  addJob,
  removeJob,
  addJobHighlight,
  removeJobHighlight
}

export default connect(mapState, mapActions)(Work)
