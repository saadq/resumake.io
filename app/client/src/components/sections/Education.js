import React from 'react'
import { number, object } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { School } from './fragments'
import { UIActions, FormActions } from '../../actions'

function Education({ schoolCount, actions }) {
  return (
    <section id='education'>
      <h1>Your Educational Background</h1>
      {Array.from({ length: schoolCount }).map((_, index) => (
        <School key={index} index={index} />
      ))}
      <div className='section-buttons'>
        <button type='button' onClick={() => actions.addSchool()}>Add School</button>
        <button
          onClick={() => {
            actions.removeSchool()
            actions.clearSchoolField(schoolCount)
          }}
          type='button'
        >
          Remove School
        </button>
      </div>
    </section>
  )
}

Education.propTypes = {
  schoolCount: number.isRequired,
  actions: object.isRequired
}

const actionCreators = {
  ...UIActions,
  ...FormActions
}

function mapStateToProps(state) {
  return {
    schoolCount: state.ui.schoolCount
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
)(Education)
