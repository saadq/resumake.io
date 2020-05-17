import React from 'react'
import { useDispatch } from 'react-redux'
import { FormSection } from 'common/components/FormSection'
import { Button } from 'common/components/Button'
import { Project } from './Project'
import { formActions } from '../../slice'
import { useFormValues } from '../../hooks/useFormValues'

export function ProjectsSection() {
  const { projects } = useFormValues()
  const dispatch = useDispatch()

  const addProject = () => {
    dispatch(formActions.addProject())
  }

  const removeProject = (index: number) => {
    return () => {
      dispatch(formActions.removeProject(index))
    }
  }

  const addProjectKeyword = (projectIndex: number) => {
    dispatch(formActions.addProjectKeyword(projectIndex))
  }

  const removeProjectKeyword = (projectIndex: number, keywordIndex: number) => {
    dispatch(formActions.removeProjectKeyword({ projectIndex, keywordIndex }))
  }

  return (
    <FormSection title="Projects">
      {projects.map((project, i) => (
        <Project
          project={project}
          removeProject={removeProject(i)}
          addProjectKeyword={addProjectKeyword}
          removeProjectKeyword={removeProjectKeyword}
          index={i}
          key={`project${i}`}
        />
      ))}
      <Button
        type="button"
        onClick={addProject}
        marginTop="2em"
        marginLeft="auto"
        marginRight="auto"
        width="45%"
      >
        Add Project
      </Button>
    </FormSection>
  )
}
