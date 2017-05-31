import React from 'react'
import { Field } from 'redux-form'
import { number, func } from 'prop-types'
import { Input, Icon } from '../../bulma'

function Job({ index, dutiesCount, addDuty, removeDuty, clearDutyField }) {
  return (
    <div className="job">
      {index > 0 ? <hr /> : null}
      <Input
        name={`jobs[${index}][name]`}
        title="Company Name"
        placeholder="Google"
      />
      <Input
        name={`jobs[${index}][title]`}
        title="Job Title"
        placeholder="Software Engineer"
      />
      <Input
        name={`jobs[${index}][location]`}
        title="Job Location"
        placeholder="Mountain View, CA"
      />
      <Input
        name={`jobs[${index}][startDate]`}
        title="Start Date"
        placeholder="May 2015"
      />
      <Input
        name={`jobs[${index}][endDate]`}
        title="End Date"
        placeholder="May 2017, Present, etc"
      />
      <div className="input-container job-duties">
        <label className="label">Job Responsibilities</label>
        {Array.from({ length: dutiesCount }).map((_, i) => (
          <Field
            component="input"
            className="input"
            key={i}
            name={`jobs[${index}][duties][${i}]`}
            placeholder="Created test case generation tool which creates random XML docs from XML Schema"
          />
        ))}
        <button type="button" onClick={() => addDuty(index)}>
          <Icon size="small" type="plus" />
        </button>
        <button
          type="button"
          disabled={dutiesCount === 1}
          onClick={() => {
            removeDuty(index)
            clearDutyField(index, dutiesCount)
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
  addDuty: func.isRequired,
  removeDuty: func.isRequired,
  clearDutyField: func.isRequired
}

export default Job
