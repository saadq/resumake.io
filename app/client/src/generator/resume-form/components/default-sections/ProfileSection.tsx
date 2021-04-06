import { FormSection, Card, LabeledInput } from '../../../../common/components'

export function ProfileSection() {
  return (
    <FormSection name="Profile">
      <Card>
        <LabeledInput label="Full name" placeholder="John Smith" />
        <LabeledInput label="Email" placeholder="johnsmith@gmail.com" />
        <LabeledInput label="Phone number" placeholder="(555) 464-6446" />
        <LabeledInput label="Location" placeholder="Seattle, WA" />
        <LabeledInput label="Link" placeholder="https://github.com/saadq" />
      </Card>
    </FormSection>
  )
}
