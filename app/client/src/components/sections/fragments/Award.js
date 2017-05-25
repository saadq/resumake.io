import React from 'react'
import { number } from 'prop-types'
import { Input } from '../../bulma'

function Award({ index }) {
  return (
    <div className="award">
      {index > 0 ? <hr /> : null}
      <Input name={`awards[${index}][name]`} title="Award Name" />
      <Input name={`awards[${index}][details]`} title="Award Details" />
      <Input name={`awards[${index}][date]`} title="Award Date" />
      <Input name={`awards[${index}][location]`} title="Award Location" />
    </div>
  )
}

Award.propTypes = {
  index: number.isRequired
}

export default Award
