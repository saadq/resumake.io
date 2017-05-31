import React from 'react'
import { number } from 'prop-types'
import { Input } from '../../bulma'

function School({ index }) {
  return (
    <div className="school">
      {index > 0 ? <hr /> : null}
      <Input
        name={`schools[${index}][name]`}
        title="School Name"
        placeholder="Stanford University"
      />
      <Input
        name={`schools[${index}][location]`}
        title="School Location"
        placeholder="Stanford, CA"
      />
      <Input
        name={`schools[${index}][degree]`}
        title="Degree"
        placeholder="BS"
      />
      <Input
        name={`schools[${index}][major]`}
        title="Major"
        placeholder="Computer Science"
      />
      <Input name={`schools[${index}][gpa]`} title="GPA" placeholder="3.6" />
      <Input
        name={`schools[${index}][graduationDate]`}
        title="Graduation Date"
        placeholder="May 2017"
      />
    </div>
  )
}

School.propTypes = {
  index: number.isRequired
}

export default School
