import React from 'react'
import { number, array, object } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Job } from './fragments'
import { UIActions, FormActions } from '../../actions'

function Experience({ jobCount, jobDuties, actions }) {
  return (
    <section className="form-section" id="education">
      <h1>Your Work Experience</h1>
      {Array.from({ length: jobCount }).map((_, index) => (
        <Job
          key={index}
          index={index}
          dutiesCount={jobDuties[index]}
          addDuty={actions.incrementJobDuty}
          removeDuty={actions.decrementJobDuty}
          clearDutyField={actions.clearJobDutyField}
        />
      ))}
      <div className="section-buttons">
        <button type="button" onClick={actions.addJob}>
          Add Job
        </button>
        <button
          type="button"
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
}

Experience.propTypes = {
  jobCount: number.isRequired,
  jobDuties: array.isRequired,
  actions: object.isRequired
}

const actionCreators = {
  ...UIActions,
  ...FormActions
}

function mapStateToProps(state) {
  return {
    jobCount: state.ui.jobCount,
    jobDuties: state.ui.jobDuties
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Experience)
