/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Section, Button } from '../../../shared/components'
import Project from './fragments/Project'
import {
  addProject,
  removeProject,
  clearProjectField,
  addProjectKeyword,
  removeProjectKeyword,
  clearProjectKeywordField
} from '../actions'
import type { State } from '../../../shared/types'

type Props = {
  projectCount: number,
  projectKeywords: Array<number>,
  addProject: () => void,
  removeProject: () => void,
  addProjectKeyword: (index: number) => void,
  removeProjectKeyword: (index: number) => void,
  clearProjectKeywordField: (index: number, keywordCount: number) => void,
  clearProjectField: (projectCount: number) => void
}

function Projects({
  projectCount,
  projectKeywords,
  addProject,
  removeProject,
  addProjectKeyword,
  removeProjectKeyword,
  clearProjectKeywordField,
  clearProjectField
}: Props) {
  return (
    <Section heading="Your Projects">
      {Array.from({ length: projectCount }).map((_, index) => (
        <Project
          key={index}
          index={index}
          keywordsCount={projectKeywords[index]}
          addKeyword={addProjectKeyword}
          removeKeyword={removeProjectKeyword}
          clearKeywordField={clearProjectKeywordField}
        />
      ))}
      <div>
        <Button onClick={addProject} type="button">
          Add Project
        </Button>
        <Button
          onClick={() => {
            removeProject()
            clearProjectField(projectCount)
          }}
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
    projectCount: state.form.resume.projectCount,
    projectKeywords: state.form.resume.projectKeywords
  }
}

const actions = {
  addProject,
  removeProject,
  clearProjectField,
  addProjectKeyword,
  removeProjectKeyword,
  clearProjectKeywordField
}

export default connect(mapState, actions)(Projects)
