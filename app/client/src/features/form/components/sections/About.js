/**
 * @flow
 */

import React from 'react'
import Section from './Section'
import { Divider } from '../../../../common/components'
import LabeledInput from '../fragments/LabeledInput'

function About() {
  return (
    <Section heading="Your Personal Statement">
      <LabeledInput
        name="headings.about"
        label="Section Heading"
        placeholder="About"
      />
      <Divider />
      <LabeledInput
        name="basics.summary"
        label="Summary"
        placeholder="I’m a full stack web developer who can build apps from the ground up. I've worked mostly at startups so I am use to wearing many hats. I am a very product focussed developer who priotizes user feedback first and foremost. I'm generally very flexible when investigating new roles."
      />
    </Section>
  )
}

export default About
