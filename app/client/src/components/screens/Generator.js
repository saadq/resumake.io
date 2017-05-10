import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { number, object, bool, array } from 'prop-types'
import { Switch } from 'react-router-dom'
import { TopBar, SideNav, Content, Form } from '../layout'
import RouteWithSubRoutes from '../../routes/RouteWithSubRoutes'
import { UIActions, GeneratorActions } from '../../actions'

function Generator({ actions, template, sideNavActive, routes, history, generateResume }) {
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
        <Form
          generateResume={generateResume}
          setResumeURL={actions.setResumeURL}
          template={template}
        >
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
  template: number.isRequired,
  sideNavActive: bool.isRequired,
  routes: array.isRequired,
  history: object.isRequired
}

const actionCreators = {
  ...UIActions,
  ...GeneratorActions
}

function mapStateToProps(state) {
  return {
    template: state.generator.template,
    sideNavActive: state.ui.sideNav.active
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actionCreators, dispatch),
    generateResume: payload => dispatch(GeneratorActions.generateResume(payload))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Generator)
