/**
 * @flow
 */

import React from 'react'
import Section from './Section'
import LabeledInput from '../fragments/LabeledInput'

function Profile() {
  return (
    <Section heading="Your Personal Info">
      <LabeledInput
        name="basics.name"
        label="Full Name"
        placeholder="John Smith"
      />
      <LabeledInput
        name="basics.email"
        label="Email"
        placeholder="johnsmith@gmail.com"
      />
      <LabeledInput
        name="basics.phone"
        label="Phone Number"
        placeholder="(555) 123-4567"
      />
      <LabeledInput
        name="basics.location.address"
        label="Location"
        placeholder="New York, NY"
      />
      <LabeledInput
        name="basics.website"
        label="Link"
        placeholder="mycoolportfolio.com/myname"
      />
    </Section>
  )
}

export default Profile
