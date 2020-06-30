import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
  Form as ReduxForm,
  reduxForm,
  submit,
  InjectedFormProps
} from 'redux-form'
import styled from 'styled-components'
import { FormValues } from '../types/form'
import { previewActions } from 'generator/resume-preview/slice'
import { ProfileSection } from './default/profile/ProfileSection'
import { EducationSection } from './default/education/EducationSection'
import { ExperienceSection } from './default/experience/ExperienceSection'
import { ProjectsSection } from './default/projects/ProjectsSection'
import { SkillsSection } from './default/skills/SkillsSection'
import { AwardsSection } from './default/awards/AwardsSection'
import { CustomSection } from './custom/CustomSection'
import { useSections } from '../hooks/useSections'
import { Section, CustomSection as CustomSectionType } from '../types/sections'

const Form = styled(ReduxForm)`
  background: ${(props) => props.theme.black};
  width: 40%;
  margin-left: 10%;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow-y: auto;
`

const RESUME_GENERATION_DELAY = 1000

function isCustomSection(section: Section): section is CustomSectionType {
  return section.type !== 'default'
}

function ResumeFormView({ handleSubmit }: InjectedFormProps) {
  const sections = useSections()
  const dispatch = useDispatch()
  let timeoutId: number

  const onSubmit = handleSubmit((formValues: unknown) => {
    dispatch(previewActions.generateResume(formValues as FormValues))
  })

  const onChange = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch(submit('resume'))
    }, RESUME_GENERATION_DELAY)
  }

  return (
    <Form id="resume-form" onSubmit={onSubmit} onChange={onChange}>
      <Switch>
        <Route
          exact
          path="/generator"
          render={() => <Redirect to="/generator/basics" />}
        />
        <Route path="/generator/basics" component={ProfileSection} />
        <Route path="/generator/education" component={EducationSection} />
        <Route path="/generator/work" component={ExperienceSection} />
        <Route path="/generator/skills" component={SkillsSection} />
        <Route path="/generator/projects" component={ProjectsSection} />
        <Route path="/generator/awards" component={AwardsSection} />
        {sections
          .filter(isCustomSection)
          .map((customSection: CustomSectionType, i) => (
            <Route
              key={i}
              path={`/generator/${customSection.name}`}
              render={() => <CustomSection sectionInfo={customSection} />}
            />
          ))}
        <Route path="*" render={() => <h1>404</h1>} />
      </Switch>
    </Form>
  )
}

export const ResumeForm = reduxForm({
  form: 'resume',
  destroyOnUnmount: false
})(ResumeFormView)
