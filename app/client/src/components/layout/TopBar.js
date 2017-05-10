import React from 'react'
import { bool, func } from 'prop-types'
import { Link } from 'react-router-dom'
import '../../styles/components/top-bar.styl'

function TopBar({ sideNavActive, toggleSideNav }) {
  return (
    <nav id='top-bar' className='nav'>
      <div className='nav-left' />
      <div className='nav-center'>
        <Link to='/' className='nav-item hero-brand'>
          <span>LaTeX </span>
          <strong>Resume</strong>
        </Link>
      </div>
      <div className='nav-right is-flex'>
        <span
          onClick={toggleSideNav}
          id='nav-toggle'
          className={sideNavActive ? 'is-active' : ''}
        >
          <span />
          <span />
          <span />
        </span>
      </div>
    </nav>
  )
}

TopBar.propTypes = {
  sideNavActive: bool.isRequired,
  toggleSideNav: func.isRequired
}

export default TopBar
