import React from 'react'
import { Card } from 'common/components/Card'
import { InputWithLabel } from 'common/components/InputWithLabel'
import { InputListWithLabel } from 'common/components/InputListWithLabel'
import { RemoveSubsectionButton } from 'common/components/RemoveSubsectionButton'
import { Skill as SkillType } from '../../types'

interface Props {
  skill: SkillType
  removeSkill: () => void
  addSkillKeyword: (skillIndex: number) => void
  removeSkillKeyword: (skillIndex: number, keywordIndex: number) => void
  index: number
}

export function Skill({
  skill,
  removeSkill,
  addSkillKeyword,
  removeSkillKeyword,
  index
}: Props) {
  return (
    <Card marginTop="1.5em">
      <InputWithLabel
        name={`skills[${index}].name`}
        label="Skill Category"
        placeholder="Programming Languages"
      />
      <InputListWithLabel
        namePrefix={`skills[${index}].keywords`}
        label="Skill Details"
        placeholder="Java"
        list={skill.keywords}
        addItem={() => addSkillKeyword(index)}
        removeItem={(keywordIndex) => removeSkillKeyword(index, keywordIndex)}
      />
      <RemoveSubsectionButton type="button" onClick={removeSkill}>
        X
      </RemoveSubsectionButton>
    </Card>
  )
}
