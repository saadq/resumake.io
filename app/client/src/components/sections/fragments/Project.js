import React from 'react'
import { number } from 'prop-types'
import { Input } from '../../bulma'

function Project({ index }) {
  return (
    <div className="school">
      {index > 0 ? <hr /> : null}
      <Input
        name={`projects[${index}][name]`}
        title="Project Name"
        placeholder="Piper Chat"
      />
      <Input
        name={`projects[${index}][description]`}
        title="Short Description"
        placeholder="A video chat app with great picture quality."
      />
      <Input
        name={`projects[${index}][technologies]`}
        title="Technologies Used"
        placeholder="Node.js, Koa, React, Redux"
      />
      <Input
        name={`projects[${index}][link]`}
        title="Link to Project"
        placeholder="http://www.piedpiper.com/"
      />
    </div>
  )
}

Project.propTypes = {
  index: number.isRequired
}

export default Project
