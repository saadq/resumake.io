/**
 * @flow
 */

import React from 'react'
import Section from '../../../../shared/components/Section'
import LabeledInput from '../../../../shared/components/LabeledInput'

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
        name="profile.location.address"
        label="Location"
        placeholder="New York, NY"
      />
      <LabeledInput
        name="profile.website"
        label="Link"
        placeholder="mycoolportfolio.com/myname"
      />
    </Section>
  )
}

export default Profile
