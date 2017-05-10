import React from 'react'
import { Link } from 'react-router-dom'
import '../../styles/components/home.styl'

function Home() {
  return (
    <div id='home'>
      <section className='hero is-fullheight is-info is-large'>
        <div className='hero-body'>
          <div className='has-text-centered container'>
            <h1><span>LaTeX</span> Resume</h1>
            <div className='buttons'>
              <Link to='/generator/templates'>
                <button>Create New Resume</button>
              </Link>
              <button>Import Existing Resume</button>
              <button>Import LinkedIn Resume</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
