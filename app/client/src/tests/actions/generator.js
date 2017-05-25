import test from 'ava'
import { GeneratorActions } from '../../actions'
import {
  SELECT_TEMPLATE,
  SET_PAGE_COUNT,
  SET_PAGE,
  PREV_PAGE,
  NEXT_PAGE
} from '../../constants'

const {
  selectTemplate,
  setPageCount,
  setPage,
  prevPage,
  nextPage
} = GeneratorActions

test('synchronous generator actions', async t => {
  t.deepEqual(selectTemplate(4), { type: SELECT_TEMPLATE, templateId: 4 })
  t.deepEqual(setPageCount(1), { type: SET_PAGE_COUNT, pageCount: 1 })
  t.deepEqual(setPage(2), { type: SET_PAGE, page: 2 })
  t.deepEqual(prevPage(), { type: PREV_PAGE })
  t.deepEqual(nextPage(), { type: NEXT_PAGE })
})
