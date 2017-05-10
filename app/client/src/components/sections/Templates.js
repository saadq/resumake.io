import React from 'react'
import { number, object, bool, string } from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Column, Card, Modal } from '../bulma'
import { UIActions, ResumeActions } from '../../actions'
import '../../styles/components/templates.styl'

const ctx = require.context('../../assets/img/templates', true)
const imgs = ctx.keys().map(ctx)

const Templates = ({ actions, selectedTemplate, modalActive, modalSrc }) => (
  <section id='templates'>
    <h1>Choose a Template</h1>
    <Row multi>
      {imgs.map((src, i) =>
        <Column size='one-third' classes={selectedTemplate === (i + 1) ? 'selected' : ''} key={i}>
          <Card>
            <img src={src} onClick={() => actions.showModal(src)} />
          </Card>
          <button onClick={() => actions.selectTemplate(i + 1)} type='button'>
            Template {i + 1}
          </button>
        </Column>
      )}
      <Modal
        image={modalSrc}
        active={modalActive}
        hideModal={() => actions.hideModal()}
      />
    </Row>
  </section>
)

Templates.propTypes = {
  selectedTemplate: number.isRequired,
  actions: object.isRequired,
  modalActive: bool.isRequired,
  modalSrc: string
}

const actionCreators = {
  ...UIActions,
  ...ResumeActions
}

const mapStateToProps = state => ({
  selectedTemplate: state.resume.selectedTemplate,
  modalActive: state.ui.modal.active,
  modalSrc: state.ui.modal.src
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actionCreators, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Templates)
