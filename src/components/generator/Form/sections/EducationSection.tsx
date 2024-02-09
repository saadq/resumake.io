import { Fragment, useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'

import { FormSection } from './FormSection'
import { LabeledInput } from '../../../core/LabeledInput'
import { AddButton } from '../../../core/Button'
import { Divider } from '../../../core/Divider'

import { Education } from '../../../../types'
import { useDispatch } from 'react-redux'
import { setData } from '../../../../slice/DataSlice'

export function EducationSection(props: any) {

  const { fields, append } = useFieldArray({ name: 'education' })

  const dispatch = useDispatch()

  useEffect(() => {
    if (fields && fields.length > 0) {
      dispatch(setData(fields));
    }
  }, [fields]);
  




  const handleAdd = () => {
    const defaultEducation: Education = {
      institution: '',
      studyType: '',
      area: '',
      startDate: '',
      endDate: ''
    }

    append(defaultEducation)
  }

  return (
    <FormSection title="Your Educational Background">
      {fields.length > 0 && (
        <Fragment>
          <LabeledInput
            name="headings.education"
            label="Section Heading"
            placeholder="Education"
          />
          <Divider />
        </Fragment>
      )}
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <LabeledInput
            name={`education.${index}.institution`}
            label="School name"
            placeholder="Rutgers University"
          />
          <LabeledInput
            name={`education.${index}.studyType`}
            label="Degree"
            placeholder="Bachelor's"
          />
          <LabeledInput
            name={`education.${index}.area`}
            label="Major"
            placeholder="Computer Science"
          />
          <LabeledInput
            name={`education.${index}.startDate`}
            label="Start Date"
            placeholder="Sep 2015"
          />
          <LabeledInput
            name={`education.${index}.endDate`}
            label="End Date"
            placeholder="Jun 2019"
          />
          <Divider />
        </Fragment>
      ))}
      <AddButton type="button" onClick={handleAdd}>
        + Add School
      </AddButton>
    </FormSection>
  )
}
