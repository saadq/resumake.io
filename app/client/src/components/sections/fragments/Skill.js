import React from 'react'
import { number } from 'prop-types'
import { Input, Row, Column } from '../../bulma'

function Skill({ index }) {
  return (
    <Row>
      <Column size="one-third">
        <Input
          name={`skills[${index}][name]`}
          title="Skill Name"
          placeholder="Ex: Programming Languages"
        />
      </Column>
      <Column size="two-thirds">
        <Input
          name={`skills[${index}][details]`}
          title="Skill Details"
          placeholder="Ex: Java, JavaScript, Ruby, Python"
        />
      </Column>
    </Row>
  )
}

Skill.propTypes = {
  index: number.isRequired
}

export default Skill
