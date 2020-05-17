import React from 'react'
import { useDispatch } from 'react-redux'
import { FormSection } from 'common/components/FormSection'
import { Button } from 'common/components/Button'
import { Skill } from './Skill'
import { formActions } from '../../slice'
import { useFormValues } from '../../hooks/useFormValues'

export function SkillsSection() {
  const { skills } = useFormValues()
  const dispatch = useDispatch()

  const addSkill = () => {
    dispatch(formActions.addSkill())
  }

  const removeSkill = (index: number) => {
    return () => {
      dispatch(formActions.removeSkill(index))
    }
  }

  const addSkillKeyword = (skillIndex: number) => {
    dispatch(formActions.addSkillKeyword(skillIndex))
  }

  const removeSkillKeyword = (skillIndex: number, keywordIndex: number) => {
    dispatch(formActions.removeSkillKeyword({ skillIndex, keywordIndex }))
  }

  return (
    <FormSection title="Skills">
      {skills.map((skill, i) => (
        <Skill
          skill={skill}
          removeSkill={removeSkill(i)}
          addSkillKeyword={addSkillKeyword}
          removeSkillKeyword={removeSkillKeyword}
          index={i}
          key={`skill${i}`}
        />
      ))}
      <Button
        type="button"
        onClick={addSkill}
        marginTop="2em"
        marginLeft="auto"
        marginRight="auto"
        width="45%"
      >
        Add Skill
      </Button>
    </FormSection>
  )
}
