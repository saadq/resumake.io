import React from 'react'
import { number, object } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { School } from './fragments'
import { ResumeActions, FormActions } from '../../actions'

const Education = ({ schoolCount, actions }) => (
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

Education.propTypes = {
  schoolCount: number.isRequired,
  actions: object.isRequired
}

const actionCreators = {
  ...ResumeActions,
  ...FormActions
}

const mapStateToProps = state => ({
  schoolCount: state.resume.schoolCount
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Education)
