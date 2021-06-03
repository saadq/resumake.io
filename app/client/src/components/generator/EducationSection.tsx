import { FormSection } from '../common/FormSection'
import { Card } from '../common/Card'
import { LabeledInput } from '../common/LabeledInput'

export function EducationSection() {
  return (
    <FormSection>
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
