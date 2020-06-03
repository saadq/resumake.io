import React from 'react'
import { useDispatch } from 'react-redux'
import { DropResult } from 'react-beautiful-dnd'
import { DraggableList } from 'common/components/DraggableList'
import { DraggableItem } from 'common/components/DraggableItem'
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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const startIndex = result.source.index
    const endIndex = result.destination.index
    dispatch(formActions.swapSkillsOrder({ startIndex, endIndex }))
  }

  return (
    <FormSection title="Skills">
      <DraggableList onDragEnd={onDragEnd}>
        {skills.map((skill, i) => (
          <DraggableItem key={`draggable-skill-${i}`} index={i}>
            <Skill
              skill={skill}
              removeSkill={removeSkill(i)}
              addSkillKeyword={addSkillKeyword}
              removeSkillKeyword={removeSkillKeyword}
              index={i}
              key={`skill${i}`}
            />
          </DraggableItem>
        ))}
      </DraggableList>
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
