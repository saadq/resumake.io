/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import Section from './Section'
import { Button, LabeledInput, Divider } from '../../../../common/components'
import { Skill } from '..'
import {
  addSkill,
  removeSkill,
  addSkillKeyword,
  removeSkillKeyword
} from '../../actions'
import type { Skills as SkillsType } from '../../types'
import type { State } from '../../../../app/types'

type Props = {
  skills: $PropertyType<SkillsType, 'skills'>,
  addSkill: () => void,
  removeSkill: () => void,
  addSkillKeyword: (index: number) => void,
  removeSkillKeyword: (index: number) => void
}

function Skills({
  skills,
  addSkill,
  removeSkill,
  addSkillKeyword,
  removeSkillKeyword
}: Props) {
  return (
    <Section heading="Your Skills">
      <LabeledInput
        name="skills.heading"
        label="Section Heading"
        placeholder="Skills"
      />
      <Divider />
      {skills.map((skill, i) => (
        <Skill
          key={i}
          index={i}
          keywords={skill.keywords}
          addKeyword={addSkillKeyword}
          removeKeyword={removeSkillKeyword}
        />
      ))}
      <Button onClick={addSkill} type="button">
        Add Skill
      </Button>
      <Button onClick={removeSkill} type="button">
        Remove Skill
      </Button>
    </Section>
  )
}

function mapState(state: State) {
  return {
    skills: state.form.resume.values.skills.skills
  }
}

const mapActions = {
  addSkill,
  removeSkill,
  addSkillKeyword,
  removeSkillKeyword
}

export default connect(mapState, mapActions)(Skills)
