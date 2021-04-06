import { FormSection, Card, LabeledInput } from '../../../../common/components'

export function EducationSection() {
  return (
    <FormSection name="Education">
      <Card>
        <LabeledInput label="School name" placeholder="Rutgers University" />
        <LabeledInput label="Degree" placeholder="Bachelor's" />
        <LabeledInput label="Major" placeholder="Computer Science" />
        <LabeledInput label="Start Date" placeholder="Sep 2015" />
        <LabeledInput label="End Date" placeholder="Jun 2019" />
      </Card>
    </FormSection>
  )
}
