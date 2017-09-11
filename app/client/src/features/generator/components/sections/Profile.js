/**
 * @flow
 */

import React from 'react'
import Section from '../layout/Section'
import LabeledInput from '../layout/LabeledInput'

function Profile() {
  return (
    <Section heading="Profile">
      <LabeledInput label="Full Name" />
      <LabeledInput label="Email" />
      <LabeledInput label="Phone Number" />
      <LabeledInput label="Address" />
      <LabeledInput label="Link" />
    </Section>
  )
}

export default Profile
