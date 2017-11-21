/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Section, Button } from '../../../ui/components'
import Skill from '..'
import {
  addSkill,
  removeSkill,
  addSkillKeyword,
  removeSkillKeyword
} from '../../actions'
import type { FormValues } from '../../types'
import type { State } from '../../../../shared/types'

type Props = {
  skills: $PropertyType<FormValues, 'skills'>,
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
    skills: state.form.resume.values.skills
  }
}

const mapActions = {
  addSkill,
  removeSkill,
  addSkillKeyword,
  removeSkillKeyword
}

export default connect(mapState, mapActions)(Skills)
