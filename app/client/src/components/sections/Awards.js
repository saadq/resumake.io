import React from 'react'
import { number, object } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Award } from './fragments'
import { UIActions, FormActions } from '../../actions'

function Awards({ awardCount, actions }) {
  return (
    <section className="form-section" id="awards">
      <h1>Your Honors & Awards</h1>
      {Array.from({ length: awardCount }).map((_, index) => (
        <Award key={index} index={index} />
      ))}
      <div className="section-buttons">
        <button type="button" onClick={() => actions.addAward()}>
          Add Award
        </button>
        <button
          onClick={() => {
            actions.removeAward()
            actions.clearAwardField(awardCount)
          }}
          type="button"
        >
          Remove Award
        </button>
      </div>
    </section>
  )
}

Awards.propTypes = {
  awardCount: number.isRequired,
  actions: object.isRequired
}

const actionCreators = {
  ...UIActions,
  ...FormActions
}

function mapStateToProps(state) {
  return {
    awardCount: state.ui.awardCount
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Awards)
