/**
 * @flow
 */

import React from 'react'
import { connect } from 'react-redux'
import { Section, Button } from '../../../shared/components'
import Award from './fragments/Award'
import { addAward, removeAward, clearAwardField } from '../actions'
import type { State } from '../../../shared/types'

type Props = {
  awardCount: number,
  addAward: () => void,
  removeAward: () => void,
  clearAwardField: (awardCount: number) => void
}

function Awards({ awardCount, addAward, removeAward, clearAwardField }: Props) {
  return (
    <Section heading="Honors & Awards">
      {Array.from({ length: awardCount }).map((_, index) => (
        <Award key={index} index={index} />
      ))}
      <div className="section-buttons">
        <Button onClick={addAward} type="button">
          Add Award
        </Button>
        <Button
          onClick={() => {
            removeAward()
            clearAwardField(awardCount)
          }}
          type="button"
        >
          Remove Award
        </Button>
      </div>
    </Section>
  )
}

function mapState(state: State) {
  return {
    awardCount: state.form.resume.awardCount
  }
}

const actions = {
  addAward,
  removeAward,
  clearAwardField
}

export default connect(mapState, actions)(Awards)
