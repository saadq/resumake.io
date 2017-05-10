import React from 'react'
import { number } from 'prop-types'
import { Input } from '../../bulma'

function Project({ index }) {
  return (
    <div className='school'>
      {(index > 0) ? <hr /> : null}
      <Input name={`projects[${index}][name]`} title='Project Name' />
      <Input name={`projects[${index}][description]`} title='Short Description' />
      <Input name={`projects[${index}][technologies]`} title='Technologies Used' />
      <Input name={`projects[${index}][link]`} title='Link to Project' />
    </div>
  )
}

Project.propTypes = {
  index: number.isRequired
}

export default Project
