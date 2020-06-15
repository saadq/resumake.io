import React from 'react'
import { useDispatch } from 'react-redux'
import { DropResult } from 'react-beautiful-dnd'
import { DraggableList } from 'common/components/DraggableList'
import { DraggableItem } from 'common/components/DraggableItem'
import { FormSection } from 'common/components/FormSection'
import { Button } from 'common/components/Button'
import { Project } from './Project'
import { formActions } from '../../../slice'
import { emptyProject } from '../../../values'
import { useFormValues } from '../../../hooks/useFormValues'
import { useSectionInfo } from '../../../hooks/useSectionInfo'
import { DefaultSectionNames } from '../../../types/sections'

export function ProjectsSection() {
  const { projects } = useFormValues()
  const [projectsSection, projectsSectionIndex] = useSectionInfo('projects')
  const dispatch = useDispatch()

  const addProject = () => {
    dispatch(
      formActions.addSubsection({
        sectionName: 'projects',
        emptyFields: { ...emptyProject }
      })
    )
  }

  const removeProject = (indexToRemove: number) => {
    return () => {
      dispatch(
        formActions.removeSubsection({
          sectionName: 'projects',
          indexToRemove
        })
      )
    }
  }

  const addProjectKeyword = (projectIndex: number) => {
    dispatch(
      formActions.addSubsectionKeyword({
        sectionName: 'projects',
        keywordsName: 'keywords',
        sectionIndex: projectIndex
      })
    )
  }

  const removeProjectKeyword = (projectIndex: number, keywordIndex: number) => {
    dispatch(
      formActions.removeSubsectionKeyword({
        sectionName: 'projects',
        keywordsName: 'keywords',
        sectionIndex: projectIndex,
        keywordIndexToRemove: keywordIndex
      })
    )
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const sectionName: DefaultSectionNames = 'projects'
    const startIndex = result.source.index
    const endIndex = result.destination.index
    dispatch(
      formActions.swapSubsectionsOrder({ sectionName, startIndex, endIndex })
    )
  }

  return (
    <FormSection
      title={projectsSection?.displayName || 'Projects'}
      inputName={`sections[${projectsSectionIndex}].displayName`}
    >
      <DraggableList onDragEnd={onDragEnd}>
        {projects.map((project, i) => (
          <DraggableItem key={`draggable-project-${i}`} index={i}>
            <Project
              project={project}
              removeProject={removeProject(i)}
              addProjectKeyword={addProjectKeyword}
              removeProjectKeyword={removeProjectKeyword}
              index={i}
              key={`project${i}`}
            />
          </DraggableItem>
        ))}
      </DraggableList>
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
