import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { number, object, bool, array } from 'prop-types'
import { Switch } from 'react-router-dom'
import { TopBar, SideNav, Content, Form } from '../layout'
import RouteWithSubRoutes from '../../routes/RouteWithSubRoutes'
import { UIActions, ResumeActions } from '../../actions'

function Generator({ actions, selectedTemplate, sideNavActive, routes, history }) {
  return (
    <section className='hero'>
      <div className='hero-head'>
        <TopBar
          sideNavActive={sideNavActive}
          toggleSideNav={() => sideNavActive ? actions.hideSideNav() : actions.showSideNav()}
        />
        <SideNav
          sideNavActive={sideNavActive}
          hideSideNav={() => actions.hideSideNav()}
          handlePreviewClick={() => history.push('/generator/preview')}
        />
        <Form setResumeURL={actions.setResumeURL} selectedTemplate={selectedTemplate}>
          <Content hideSideNav={() => actions.hideSideNav()}>
            <Switch>
              {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
            </Switch>
          </Content>
        </Form>
      </div>
    </section>
  )
}

Generator.propTypes = {
  actions: object.isRequired,
  selectedTemplate: number.isRequired,
  sideNavActive: bool.isRequired,
  routes: array.isRequired,
  history: object.isRequired
}

const actionCreators = {
  ...UIActions,
  ...ResumeActions
}

function mapStateToProps(state) {
  return {
    selectedTemplate: state.resume.selectedTemplate,
    sideNavActive: state.ui.sideNav.active
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
)(Generator)
