import React from 'react'
import { number, object } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Skill } from './fragments'
import { Icon } from '../bulma'
import { ResumeActions, FormActions } from '../../actions'

const Skills = ({ skillCount, actions }) => (
  <section id='skills'>
    {Array.from({ length: skillCount }).map((_, index) => (
      <Skill key={index} index={index} />
    ))}
    <button onClick={() => actions.addSkill()} type='button'>
      <Icon size='small' type='plus' />
    </button>
    <button
      onClick={() => {
        actions.removeSkill()
        actions.clearSkillField(skillCount)
      }}
      type='button'>
      <Icon size='small' type='times' />
    </button>
  </section>
)

Skills.propTypes = {
  skillCount: number.isRequired,
  actions: object.isRequired
}

const actionCreators = {
  ...ResumeActions,
  ...FormActions
}

const mapStateToProps = state => ({
  skillCount: state.resume.skillCount
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Skills)
