import React from 'react'
import { bool, func, string } from 'prop-types'

function Modal({ image, active, hideModal }) {
  return (
    <div className={`modal ${active ? 'is-active' : ''}`.trim()}>
      <div onClick={() => hideModal()} className="modal-background" />
      <div className="modal-content">
        <p className="image">
          <img src={image} />
        </p>
      </div>
      <button
        type="button"
        onClick={() => hideModal()}
        className="modal-close"
      />
    </div>
  )
}

Modal.propTypes = {
  active: bool.isRequired,
  hideModal: func.isRequired,
  image: string
}

export default Modal
