import React from 'react'
import { bool, func } from 'prop-types'
import { NavLink } from 'react-router-dom'
import '../../styles/components/side-nav.styl'

function SideNav({ sideNavActive, hideSideNav, handlePreviewClick }) {
  return (
    <aside id="side-nav" className={sideNavActive ? '' : 'is-hidden-mobile'}>
      <p className="menu-label">Resume Sections</p>
      <hr />
      <ul onClick={hideSideNav} className="menu-list">
        <li>
          <NavLink to="/generator/templates" activeClassName="is-active">
            Templates
          </NavLink>
        </li>
        <li>
          <NavLink to="/generator/profile" activeClassName="is-active">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/generator/education" activeClassName="is-active">
            Education
          </NavLink>
        </li>
        <li>
          <NavLink to="/generator/experience" activeClassName="is-active">
            Experience
          </NavLink>
        </li>
        <li>
          <NavLink to="/generator/skills" activeClassName="is-active">
            Skills
          </NavLink>
        </li>
        <li>
          <NavLink to="/generator/projects" activeClassName="is-active">
            Projects
          </NavLink>
        </li>
        <li>
          <NavLink to="/generator/awards" activeClassName="is-active">
            Awards
          </NavLink>
        </li>
        <button onClick={handlePreviewClick} type="submit" form="resume-form">
          Preview Resume
        </button>
      </ul>
    </aside>
  )
}

SideNav.propTypes = {
  sideNavActive: bool.isRequired,
  hideSideNav: func.isRequired,
  handlePreviewClick: func.isRequired
}

export default SideNav
