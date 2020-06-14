import React from 'react'
import { useDispatch } from 'react-redux'
import { DropResult } from 'react-beautiful-dnd'
import { DraggableList } from 'common/components/DraggableList'
import { DraggableItem } from 'common/components/DraggableItem'
import { FormSection } from 'common/components/FormSection'
import { Button } from 'common/components/Button'
import { Skill } from './Skill'
import { formActions } from '../../slice'
import { emptySkill } from '../../values'
import { useFormValues } from '../../hooks/useFormValues'
import { useSectionInfo } from '../../hooks/useSectionInfo'
import { DefaultSectionNames } from '../../types/sections'

export function SkillsSection() {
  const { skills } = useFormValues()
  const [skillsSection, skillsSectionIndex] = useSectionInfo('skills')
  const dispatch = useDispatch()

  const addSkill = () => {
    dispatch(
      formActions.addSubsection({
        sectionName: 'skills',
        emptyFields: { ...emptySkill }
      })
    )
  }

  const removeSkill = (indexToRemove: number) => {
    return () => {
      dispatch(
        formActions.removeSubsection({
          sectionName: 'skills',
          indexToRemove
        })
      )
    }
  }

  const addSkillKeyword = (skillIndex: number) => {
    dispatch(
      formActions.addSubsectionKeyword({
        sectionName: 'skills',
        keywordsName: 'keywords',
        sectionIndex: skillIndex
      })
    )
  }

  const removeSkillKeyword = (skillIndex: number, keywordIndex: number) => {
    dispatch(
      formActions.removeSubsectionKeyword({
        sectionName: 'skills',
        keywordsName: 'keywords',
        sectionIndex: skillIndex,
        keywordIndexToRemove: keywordIndex
      })
    )
  }

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    const sectionName: DefaultSectionNames = 'skills'
    const startIndex = result.source.index
    const endIndex = result.destination.index
    dispatch(
      formActions.swapSubsectionsOrder({ sectionName, startIndex, endIndex })
    )
  }

  return (
    <FormSection
      title={skillsSection?.displayName || 'Skills'}
      inputName={`sections[${skillsSectionIndex}].displayName`}
    >
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
