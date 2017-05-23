import React from 'react'
import { Field } from 'redux-form'
import { number, func } from 'prop-types'
import { Input, Icon } from '../../bulma'

function Job({ index, dutiesCount, addJobDuty, removeJobDuty, clearJobDutyField }) {
  return (
    <div className="job">
      {(index > 0) ? <hr /> : null}
      <Input name={`jobs[${index}][name]`} title="Company Name" />
      <Input name={`jobs[${index}][title]`} title="Job Title" />
      <Input name={`jobs[${index}][location]`} title="Job Location" />
      <Input name={`jobs[${index}][startDate]`} title="Start Date" />
      <Input name={`jobs[${index}][endDate]`} title="End Date" />
      <div className="input-container job-duties">
        <label className="label">Job Responsibilities</label>
        {Array.from({ length: dutiesCount }).map((_, i) => (
          <Field component="input" className="input" key={i} name={`jobs[${index}][duties][${i}]`} />
        ))}
        <button type="button" onClick={() => addJobDuty(index)}>
          <Icon size="small" type="plus" />
        </button>
        <button
          type="button"
          disabled={dutiesCount === 1}
          onClick={() => {
            removeJobDuty(index)
            clearJobDutyField(index, dutiesCount)
          }}
        >
          <Icon size="small" type="times" />
        </button>
      </div>
    </div>
  )
}

Job.propTypes = {
  index: number.isRequired,
  dutiesCount: number.isRequired,
  addJobDuty: func.isRequired,
  removeJobDuty: func.isRequired,
  clearJobDutyField: func.isRequired
}

export default Job
