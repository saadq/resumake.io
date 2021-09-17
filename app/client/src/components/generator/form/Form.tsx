import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { ProfileSection } from './sections/ProfileSection'
import { EducationSection } from './sections/EducationSection'
import { colors, sizes } from '../../../theme'
import { FormValues } from '../../../types/form'
import { formActions } from '../../../state/slices/form'
import { debounce } from '../../../utils/debounce'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${sizes.formSection.width};
  background: ${colors.gray2};
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  overflow: scroll;
`

const defaultFormValues: FormValues = {
  basics: {
    fullName: '',
    email: '',
    phoneNumber: '',
    location: {
      address: ''
    },
    link: ''
  },
  work: [
    {
      name: '',
      position: '',
      startDate: '',
      endDate: '',
      summary: '',
      highlights: ['']
    }
  ],
  skills: [
    {
      name: '',
      keywords: ['']
    }
  ],
  education: [
    {
      institution: '',
      area: '',
      studyType: '',
      gpa: '',
      startDate: '',
      endDate: ''
    }
  ],
  projects: [
    {
      name: '',
      description: '',
      url: '',
      keywords: [''],
      highlights: [''],
      startDate: '',
      endDate: ''
    }
  ],
  awards: [
    {
      title: '',
      awarder: '',
      date: '',
      summary: ''
    }
  ],
  volunteer: [
    {
      organization: '',
      position: '',
      summary: '',
      highlights: [''],
      startDate: '',
      endDate: ''
    }
  ],
  publications: [
    {
      name: '',
      publisher: '',
      url: ''
    }
  ]
}

export function Form() {
  const form = useForm<FormValues>({ defaultValues: defaultFormValues })
  const dispatch = useDispatch()

  const generateResume = form.handleSubmit(
    useCallback(
      (data: FormValues) => {
        dispatch(formActions.generateResume(data))
      },
      [dispatch]
    )
  )

  return (
    <FormProvider {...form}>
      <StyledForm
        onSubmit={generateResume}
        onChange={debounce(generateResume, 500)}
      >
        <Switch>
          <Route exact path="/generator/basics" component={ProfileSection} />
          <Route
            exact
            path="/generator/education"
            component={EducationSection}
          />
          <Route exact path="/generator/awards" />
          <Route exact path="/generator/experience" />
          <Route exact path="/generator/skills" />
          <Route exact path="/generator/projects" />
          <Route path="*">
            <Redirect to="/generator/basics" />
          </Route>
        </Switch>
      </StyledForm>
    </FormProvider>
  )
}
