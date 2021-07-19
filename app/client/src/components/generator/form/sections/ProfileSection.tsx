import { FormSection } from '../../../common/FormSection'
import { Card } from '../../../common/Card'
import { LabeledInput } from '../../../common/LabeledInput'

export function ProfileSection() {
  return (
    <FormSection>
      <Card>
        <LabeledInput
          name="basics.fullName"
          label="Full name"
          placeholder="John Smith"
        />
        <LabeledInput
          name="basics.email"
          label="Email"
          placeholder="johnsmith@gmail.com"
        />
        <LabeledInput
          name="basics.phoneNumber"
          label="Phone number"
          placeholder="(555) 464-6446"
        />
        <LabeledInput
          name="basics.location.address"
          label="Location"
          placeholder="Seattle, WA"
        />
        <LabeledInput
          name="basics.link"
          label="Link"
          placeholder="https://github.com/saadq"
        />
      </Card>
    </FormSection>
  )
}
