import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { reduxForm, InjectedFormProps } from 'redux-form'
import styled from 'styled-components'
import { previewActions } from 'generator/resume-preview/slice'
import { ProfileSection } from './default/profile/ProfileSection'
import { EducationSection } from './default/education/EducationSection'
import { ExperienceSection } from './default/experience/ExperienceSection'
import { ProjectsSection } from './default/projects/ProjectsSection'
import { SkillsSection } from './default/skills/SkillsSection'
import { AwardsSection } from './default/awards/AwardsSection'
import { CustomSection } from './custom/CustomSection'
import { useFormValues } from '../hooks/useFormValues'
import { useSections } from '../hooks/useSections'
import { Section, CustomSection as CustomSectionType } from '../types/sections'

const Form = styled.form`
  background: ${(props) => props.theme.black};
  width: 40%;
  margin-left: 10%;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  overflow-y: auto;
`

function isCustomSection(section: Section): section is CustomSectionType {
  return section.type !== 'default'
}

function ResumeFormView({ handleSubmit }: InjectedFormProps) {
  const vals = useFormValues()
  const sections = useSections()
  const dispatch = useDispatch()

  const onSubmit = () => {
    dispatch(previewActions.generateResume(vals))
  }

  const onChange = () => {}

  return (
    <Form
      id="resume-form"
      onSubmit={handleSubmit(onSubmit)}
      onChange={onChange}
    >
      <Switch>
        <Route
          exact
          path="/generator"
          render={() => <Redirect to="/generator/profile" />}
        />
        <Route path="/generator/profile" component={ProfileSection} />
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
