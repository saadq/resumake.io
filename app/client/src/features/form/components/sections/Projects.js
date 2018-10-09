/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import Section from './Section'
import { Button, Divider } from '../../../../common/components'
import LabeledInput from '../fragments/LabeledInput'
import { Project } from '..'
import {
  addProject,
  removeProject,
  addProjectKeyword,
  removeProjectKeyword
} from '../../actions'
import type { FormValues } from '../../types'
import type { State } from '../../../../app/types'

type Props = {
  projects: $PropertyType<FormValues, 'projects'>,
  addProject: () => void,
  removeProject: () => void,
  addProjectKeyword: (index: number) => void,
  removeProjectKeyword: (index: number) => void
}

function Projects({
  projects,
  addProject,
  removeProject,
  addProjectKeyword,
  removeProjectKeyword
}: Props) {
  return (
    <Section heading="Your Projects">
      <LabeledInput
        name="headings.projects"
        label="Section Heading"
        placeholder="Projects"
      />
      <Divider />
      {projects.map((project, i) => (
        <Project
          key={i}
          index={i}
          keywords={project.keywords}
          addKeyword={addProjectKeyword}
          removeKeyword={removeProjectKeyword}
        />
      ))}
      <div>
        <Button onClick={addProject} type="button">
          Add Project
        </Button>
        <Button
          onClick={removeProject}
          disabled={projects.length === 1}
          type="button"
        >
          Remove Project
        </Button>
      </div>
    </Section>
  )
}

function mapState(state: State) {
  return {
    projects: state.form.resume.values.projects
  }
}

const mapActions = {
  addProject,
  removeProject,
  addProjectKeyword,
  removeProjectKeyword
}

export default connect(mapState, mapActions)(Projects)
