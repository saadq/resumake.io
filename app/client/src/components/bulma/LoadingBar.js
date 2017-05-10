import React from 'react'
import '../../styles/components/loading-bar.styl'

const LoadingBar = ({ hidden }) => (
  <div className={`loading-bar ${hidden ? 'hidden' : ''}`}>
    <div className='inner' />
  </div>
)

export default LoadingBar
