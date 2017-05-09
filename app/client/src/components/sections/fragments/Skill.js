import React from 'react'
import { Input, Row, Column } from '../../bulma'

const Skill = ({ index }) => (
  <Row>
    <Column size='one-third'>
      <Input
        name={`skills[${index}][name]`}
        title='Skill Name'
        placeholder='Ex: Programming Languages'
      />
    </Column>
    <Column size='two-thirds'>
      <Input
        name={`skills[${index}][details]`}
        title='Skill Details'
        placeholder='Ex: Java, JavaScript, Ruby, Python'
      />
    </Column>
  </Row>
)

export default Skill
