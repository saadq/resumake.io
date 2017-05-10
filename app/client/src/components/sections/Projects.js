import React from 'react'
import { number, object } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Project } from './fragments'
import { UIActions, FormActions } from '../../actions'

function Projects({ projectCount, actions }) {
  return (
    <section id='projects'>
      <h1>Your Projects</h1>
      {Array.from({ length: projectCount }).map((_, index) => (
        <Project key={index} index={index} />
      ))}
      <div className='section-buttons'>
        <button type='button' onClick={() => actions.addProject()}>Add Project</button>
        <button
          onClick={() => {
            actions.removeProject()
            actions.clearProjectField(projectCount)
          }}
          type='button'
        >
          Remove Project
        </button>
      </div>
    </section>
  )
}

Projects.propTypes = {
  projectCount: number.isRequired,
  actions: object.isRequired
}

const actionCreators = {
  ...UIActions,
  ...FormActions
}

function mapStateToProps(state) {
  return {
    projectCount: state.ui.projectCount
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects)
