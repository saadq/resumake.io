import React from 'react'
import { number, array, object } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Job } from './fragments'
import { ResumeActions, FormActions } from '../../actions'

const Experience = ({ jobCount, jobDuties, actions }) => (
  <section id='education'>
    <h1>Your Work Experience</h1>
    {Array.from({ length: jobCount }).map((_, index) => (
      <Job
        key={index}
        index={index}
        dutiesCount={jobDuties[index]}
        addJobDuty={actions.incrementJobDuty}
        removeJobDuty={actions.decrementJobDuty}
        clearJobDutyField={actions.clearJobDutyField}
      />
    ))}
    <div className='section-buttons'>
      <button type='button' onClick={actions.addJob}>
        Add Job
      </button>
      <button
        type='button'
        onClick={() => {
          actions.removeJob()
          actions.clearJobField(jobCount)
        }}
      >
        Remove Job
      </button>
    </div>
  </section>
)

Experience.propTypes = {
  jobCount: number.isRequired,
  jobDuties: array.isRequired,
  actions: object.isRequired
}

const actionCreators = {
  ...ResumeActions,
  ...FormActions
}

const mapStateToProps = state => ({
  jobCount: state.resume.jobCount,
  jobDuties: state.resume.jobDuties
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Experience)
