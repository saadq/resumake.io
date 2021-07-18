import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { ProfileSection } from './sections/ProfileSection'
import { EducationSection } from './sections/EducationSection'
import { colors, sizes } from '../../../theme'
import { FormProvider, useForm } from 'react-hook-form'
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

const defaultValues: FormValues = {
  basics: {},
  education: [{}]
}

export function Form() {
  const form = useForm<FormValues>({
    defaultValues
  })

  const dispatch = useDispatch()

  const onSubmit = form.handleSubmit(
    useCallback(
      (data: FormValues) => {
        dispatch(formActions.generateResume(data))
      },
      [dispatch]
    )
  )

  const onChange = useCallback(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <FormProvider {...form}>
      <StyledForm onSubmit={onSubmit} onChange={debounce(onChange, 500)}>
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
        <button>Submit</button>
      </StyledForm>
    </FormProvider>
  )
}
