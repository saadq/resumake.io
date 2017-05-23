import React from 'react'
import { bool } from 'prop-types'
import '../../styles/components/loading-bar.styl'

function LoadingBar({ hidden }) {
  return (
    <div className={`loading-bar ${hidden ? 'hidden' : ''}`}>
      <div className="inner" />
    </div>
  )
}

LoadingBar.propTypes = {
  hidden: bool
}

export default LoadingBar
