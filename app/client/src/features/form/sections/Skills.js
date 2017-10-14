/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Section, Button } from '../../../shared/components'
import Skill from './fragments/Skill'
import {
  addSkill,
  removeSkill,
  clearSkillField,
  addSkillKeyword,
  removeSkillKeyword,
  clearSkillKeywordField
} from '../actions'
import type { State } from '../../../shared/types'

type Props = {
  skillCount: number,
  skillKeywords: Array<number>,
  addSkill: () => void,
  removeSkill: () => void,
  addSkillKeyword: (index: number) => void,
  removeSkillKeyword: (index: number) => void,
  clearSkillKeywordField: (index: number, keywordCount: number) => void,
  clearSkillField: (skillCount: number) => void
}

function Skills({
  skillCount,
  skillKeywords,
  addSkill,
  removeSkill,
  addSkillKeyword,
  removeSkillKeyword,
  clearSkillKeywordField,
  clearSkillField
}: Props) {
  return (
    <Section heading="Your Skills">
      {Array.from({ length: skillCount }).map((_, index) => (
        <Skill
          key={index}
          index={index}
          keywordsCount={skillKeywords[index]}
          addKeyword={addSkillKeyword}
          removeKeyword={removeSkillKeyword}
          clearKeywordField={clearSkillKeywordField}
        />
      ))}
      <div>
        <Button onClick={addSkill} type="button">
          Add Skill
        </Button>
        <Button
          onClick={() => {
            removeSkill()
            clearSkillField(skillCount)
          }}
          type="button"
        >
          Remove Skill
        </Button>
      </div>
    </Section>
  )
}

function mapState(state: State) {
  return {
    skillCount: state.form.resume.skillCount,
    skillKeywords: state.form.resume.skillKeywords
  }
}

const actions = {
  addSkill,
  removeSkill,
  clearSkillField,
  addSkillKeyword,
  removeSkillKeyword,
  clearSkillKeywordField
}

export default connect(mapState, actions)(Skills)
