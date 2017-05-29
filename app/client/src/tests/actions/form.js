import test from 'ava'
import { FormActions } from '../../actions'
import {
  CLEAR_SCHOOL_FIELD,
  CLEAR_JOB_FIELD,
  CLEAR_JOB_DUTY_FIELD,
  CLEAR_PROJECT_FIELD,
  CLEAR_SKILL_FIELD,
  CLEAR_AWARD_FIELD
} from '../../constants'

const {
  clearSchoolField,
  clearJobField,
  clearJobDutyField,
  clearProjectField,
  clearSkillField,
  clearAwardField
} = FormActions

test('form actions', async t => {
  t.deepEqual(clearSchoolField(2), { type: CLEAR_SCHOOL_FIELD, schoolCount: 2 })
  t.deepEqual(clearJobField(1), { type: CLEAR_JOB_FIELD, jobCount: 1 })
  t.deepEqual(clearJobDutyField(0, 1), {
    type: CLEAR_JOB_DUTY_FIELD,
    index: 0,
    jobDutyCount: 1
  })
  t.deepEqual(clearProjectField(3), {
    type: CLEAR_PROJECT_FIELD,
    projectCount: 3
  })
  t.deepEqual(clearSkillField(4), { type: CLEAR_SKILL_FIELD, skillCount: 4 })
  t.deepEqual(clearAwardField(2), { type: CLEAR_AWARD_FIELD, awardCount: 2 })
})
