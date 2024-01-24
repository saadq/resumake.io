import { FormSection } from './FormSection'
import { LabeledInput } from '../../../core/LabeledInput'

export function ProfileSection() {
  return (
    <FormSection title="Your personal info">
      <LabeledInput
        name="basics.name"
        label="Full name"
        placeholder="John Smith"
      />
      <LabeledInput
        name="basics.email"
        label="Email"
        placeholder="johnsmith@gmail.com"
      />
      <LabeledInput
        name="basics.phone"
        label="Phone number"
        placeholder="(555) 464-6446"
      />
      <LabeledInput
        name="basics.location.address"
        label="Location"
        placeholder="Seattle, WA"
      />
      <LabeledInput
        name="basics.website"
        label="Website"
        placeholder="mycoolportifolio.com/myname"
      />
    </FormSection>
  )
}
