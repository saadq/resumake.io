import React from 'react'
import { number, bool } from 'prop-types'
import '../../styles/components/loading-bar.styl'

function LoadingBar({ width, hidden }) {
  return (
    <div style={{ width }} className={`loading-bar ${hidden ? 'hidden' : ''}`}>
      <div className="inner" />
    </div>
  )
}

LoadingBar.propTypes = {
  width: number.isRequired,
  hidden: bool
}

export default LoadingBar
