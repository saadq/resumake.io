import React from 'react'
import { Card } from 'common/components/Card'
import { FormSection } from 'common/components/FormSection'
import { InputWithLabel } from 'common/components/InputWithLabel'

export function ProfileSection() {
  return (
    <FormSection title="Profile" allowSectionRenaming={false}>
      <Card marginTop="1.5em">
        <InputWithLabel
          name="basics.name"
          label="Full Name"
          placeholder="John Smith"
        />
        <InputWithLabel
          name="basics.email"
          label="Email"
          placeholder="johnsmith@gmail.com"
        />
        <InputWithLabel
          name="basics.phone"
          label="Phone Number"
          placeholder="(555) 555-7782"
        />
        <InputWithLabel
          name="basics.location.address"
          label="Location"
          placeholder="New York, NY"
        />
        <InputWithLabel
          name="basics.website"
          label="Website"
          placeholder="https://github.com/saadq"
        />
      </Card>
    </FormSection>
  )
}
