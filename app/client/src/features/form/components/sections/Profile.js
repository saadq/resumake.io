/**
 */

import React from 'react'
import Section from '../../../../shared/components/Section'
import LabeledInput from '../../../../shared/components/LabeledInput'

function Profile() {
  return (
    <Section heading="Your Personal Info">
      <LabeledInput label="Full Name" />
      <LabeledInput label="Email" />
      <LabeledInput label="Phone Number" />
      <LabeledInput label="Address" />
      <LabeledInput label="Link" />
    </Section>
  )
}

export default Profile
