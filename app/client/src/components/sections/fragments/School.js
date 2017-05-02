import React from 'react'
import { number } from 'prop-types'
import { Input } from '../../bulma'

const School = ({ index }) => (
  <div className='school'>
    {(index > 0) ? <hr /> : null}
    <Input name={`schools[${index}][name]`} title='School Name' />
    <Input name={`schools[${index}][location]`} title='School Location' />
    <Input name={`schools[${index}][degree]`} title='Degree' />
    <Input name={`schools[${index}][major]`} title='Major' />
    <Input name={`schools[${index}][gpa]`} title='GPA' />
    <Input name={`schools[${index}][graduationDate]`} title='Graduation Date' />
  </div>
)

School.propTypes = {
  index: number.isRequired
}

export default School
