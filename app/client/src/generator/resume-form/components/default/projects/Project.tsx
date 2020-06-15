import React from 'react'
import { Card } from 'common/components/Card'
import { InputWithLabel } from 'common/components/InputWithLabel'
import { InputListWithLabel } from 'common/components/InputListWithLabel'
import { RemoveSubsectionButton } from 'common/components/RemoveSubsectionButton'
import { Project as ProjectType } from '../../../types/form'

interface Props {
  project: ProjectType
  removeProject: () => void
  addProjectKeyword: (projectIndex: number) => void
  removeProjectKeyword: (projectIndex: number, keywordIndex: number) => void
  index: number
}

export function Project({
  project,
  removeProject,
  addProjectKeyword,
  removeProjectKeyword,
  index
}: Props) {
  return (
    <Card marginTop="1.5em">
      <InputWithLabel
        name={`projects[${index}].name`}
        label="Project Name"
        placeholder="Piper Chat"
      />
      <InputWithLabel
        name={`projects[${index}].description`}
        label="Project Description"
        placeholder="A video chat app with great picture quality."
      />
      <InputWithLabel
        name={`projects[${index}].url`}
        label="Link to Project"
        placeholder="http://piperchat.com"
      />
      <InputListWithLabel
        namePrefix={`projects[${index}].keywords`}
        label="Tools Used"
        placeholder="JavaScript"
        list={project.keywords}
        addItem={() => addProjectKeyword(index)}
        removeItem={(projectKeywordIndex) =>
          removeProjectKeyword(index, projectKeywordIndex)
        }
      />
      <RemoveSubsectionButton type="button" onClick={removeProject}>
        X
      </RemoveSubsectionButton>
    </Card>
  )
}
