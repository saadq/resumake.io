import React from 'react'
import { Input } from '../bulma'

const Skills = () => (
  <section id='skills'>
    <h1>Your Educational Background</h1>
    <Input name='skills[languages]' title='Languages' />
    <Input name='skills[frameworks]' title='Frameworks/Libraries' />
    <Input name='skills[miscellaneous]' title='Miscellaneous' />
  </section>
)

export default Skills
