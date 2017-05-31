import React from 'react'
import { number } from 'prop-types'
import { Input } from '../../bulma'

function Award({ index }) {
  return (
    <div className="award">
      {index > 0 ? <hr /> : null}
      <Input
        name={`awards[${index}][name]`}
        title="Award Name"
        placeholder="1st Place at Hackathon"
      />
      <Input
        name={`awards[${index}][details]`}
        title="Award Details"
        placeholder="Created an awesome app that everyone loved."
      />
      <Input
        name={`awards[${index}][date]`}
        title="Award Date"
        placeholder="May 2015"
      />
      <Input
        name={`awards[${index}][location]`}
        title="Award Location"
        placeholder="New York, NY"
      />
    </div>
  )
}

Award.propTypes = {
  index: number.isRequired
}

export default Award
