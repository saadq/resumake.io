import {
  SHOW_MODAL,
  HIDE_MODAL,
  SHOW_SIDE_NAV,
  HIDE_SIDE_NAV
} from '../constants'

function showModal(modalSrc) {
  return {
    type: SHOW_MODAL,
    modalSrc
  }
}

function hideModal() {
  return {
    type: HIDE_MODAL
  }
}

function showSideNav() {
  return {
    type: SHOW_SIDE_NAV
  }
}

function hideSideNav() {
  return {
    type: HIDE_SIDE_NAV
  }
}

export {
  showModal,
  hideModal,
  showSideNav,
  hideSideNav
}
